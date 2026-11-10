<template>
  <div class="home-intro-root" ref="introRoot">
    <!-- 2D Canvas for Particle Face & Intro Animation -->
    <canvas id="cv" ref="canvasRef" :style="{ opacity: canvasOpacity, pointerEvents: canvasOpacity < 0.1 ? 'none' : 'auto' }"></canvas>
    
    <!-- Cinematic Vignette & Film Grain -->
    <div class="vig" :style="{ opacity: canvasOpacity }"></div>
    <div class="grain" id="gr" :style="{ opacity: canvasOpacity * 0.08 }"></div>

    <!-- Intro Header Brand -->
    <header class="top intro-top" :style="{ opacity: headerOpacity }">
      <b>VIXXEN</b>
    </header>

    <!-- Scroll Spacer: gives 250vh of room for the intro animation -->
    <div class="z intro-spacer" ref="spacerRef" style="height: 250vh;"></div>

    <!-- Badge at bottom of intro -->
    <div id="intro" ref="introRef" :style="{ opacity: introBadgeOpacity }">
      <span class="dot">OPEN TO WORK</span>
      <small>SCROLL</small>
    </div>

    <!-- Figurines at bottom of intro -->
    <div id="fig" ref="figRef"></div>

    <!-- Cinematic Black Bars (slide open upon face particle load) -->
    <div class="bar t" :class="{ go: isLoaded }"></div>
    <div class="bar b" :class="{ go: isLoaded }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { FACE } from '../assets/face.js'

const emit = defineEmits(['introStateChange'])

const introRoot = ref(null)
const canvasRef = ref(null)
const spacerRef = ref(null)
const introRef = ref(null)
const figRef = ref(null)

const isLoaded = ref(false)
const canvasOpacity = ref(1)
const headerOpacity = ref(1)
const introBadgeOpacity = ref(1)

let animId = null
let resizeHandler = null
let pointerHandler = null
let scrollHandler = null

onMounted(() => {
  const cv = canvasRef.value
  if (!cv) return
  const ctx = cv.getContext('2d')
  const R = document.documentElement.style

  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
  const sm = x => { x = clamp(x); return x * x * (3 - 2 * x) }
  const eo = x => 1 - Math.pow(1 - clamp(x), 3)
  const ei = x => { x = clamp(x); return x * x }
  const RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t))

  const BR = [[210, 188, 172], [184, 157, 143], [43, 33, 31]]
  const PAL = [
    BR,
    [[122, 92, 96], [84, 60, 68], [250, 240, 232]],
    [[24, 19, 32], [10, 8, 16], [245, 238, 232]],
    [[14, 36, 38], [6, 18, 20], [238, 248, 244]],
    [[34, 46, 62], [18, 24, 34], [238, 244, 250]],
    [[32, 66, 46], [16, 36, 26], [246, 248, 228]],
    BR
  ]
  const HUE = [18, 340, 300, 150, 190, 60]
  const WORDS = ["About", "Projects", "Experience", "Skills", "Wins"]

  let W = window.innerWidth
  let H = window.innerHeight
  let dpr = Math.min(2, window.devicePixelRatio || 1)
  let cut = null
  let P = []
  let Zs = []
  let WT = []
  let cA = [W * 0.5, H * 0.5]
  let cB = [W * 0.74, H * 0.52]
  let sA = 1
  let sB = 1
  let t0 = performance.now()

  // Figurines
  const fg = figRef.value
  const pup = []
  const C = ["#f8f2ea", "#e6c7bf", "#d2b8a8", "#f5a04a", "#d9b8ad", "#b9a496", "#fbe0c0"]
  const K = [1, 1.35, 0.9, 1.2, 1.05, 1.3, 0.85]
  if (fg) {
    fg.innerHTML = ''
    const figCount = window.innerWidth < 700 ? 5 : 7
    for (let i = 0; i < figCount; i++) {
      const f = document.createElement('div')
      f.className = 'fig'
      f.style.cssText = `--c:${C[i]};--k:${K[i]};animation-delay:${-i * 0.45}s`
      f.innerHTML = '<div class="h"><div class="e"><i></i></div><div class="e"><i></i></div></div><div class="b"></div>'
      fg.appendChild(f)
    }
    fg.querySelectorAll('.e').forEach(e => pup.push({ e, i: e.firstChild }))
  }

  let mx = window.innerWidth / 2
  let my = window.innerHeight / 2

  function eyes() {
    pup.forEach(p => {
      const r = p.e.getBoundingClientRect()
      p.x = r.left + r.width / 2
      p.y = r.top + r.height / 2
      p.r = r.width * 0.27
    })
  }

  function look() {
    pup.forEach(p => {
      const dx = mx - p.x
      const dy = my - p.y
      const d = Math.hypot(dx, dy) || 1
      const m = Math.min(p.r, d / 14)
      if (p.i) {
        p.i.style.transform = `translate(${(dx / d) * m}px,${(dy / d) * m}px)`
      }
    })
  }

  pointerHandler = e => {
    mx = e.clientX
    my = e.clientY
    look()
  }
  window.addEventListener('pointermove', pointerHandler)

  function build() {
    if (!P.length || !W) return
    const mob = W < 700
    sA = Math.min(H * 0.8, W * 0.92) / 640
    sB = (mob ? Math.min(H * 0.34, W * 0.7) : Math.min(H * 0.56, W * 0.42)) / 640
    cA = [W * 0.5, H * 0.5]
    cB = mob ? [W * 0.5, H * 0.66] : [W * 0.74, H * 0.52]

    for (const p of P) {
      p.ax = cA[0] + p.lx * sA
      p.ay = cA[1] + p.ly * sA
      p.sx = cA[0] + p.lx * sA * 1.08
      p.sy = cA[1] + p.ly * sA * 1.08
      p.qx = cB[0] + p.lx * sB
      p.qy = cB[1] + p.ly * sB

      const a = Math.atan2(p.ly, p.lx) + (p.d - 0.5) * 0.9
      const m = (0.35 + p.m * 0.9) * H * 0.9
      p.bx = p.sx + Math.cos(a) * m
      p.by = p.sy + Math.sin(a) * m - H * 0.2 * p.m
      p.px = p.pxr * W
      p.py = H * (0.94 + p.m * 0.1)
    }

    const o = document.createElement('canvas')
    const w = Math.ceil(W / 2)
    const h = Math.ceil(H / 2)
    o.width = w
    o.height = h
    const c = o.getContext('2d')
    WT = WORDS.map(wd => {
      c.clearRect(0, 0, w, h)
      const f = n => `600 ${n}px "Bricolage Grotesque",system-ui,sans-serif`
      let fs = Math.min(w * 0.3, h * 0.5)
      c.font = f(fs)
      const m = c.measureText(wd).width
      if (m > w * 0.86) {
        fs *= (w * 0.86) / m
        c.font = f(fs)
      }
      c.textAlign = 'center'
      c.textBaseline = 'middle'
      c.fillStyle = '#000'
      c.fillText(wd, w / 2, h * 0.46)
      const a = c.getImageData(0, 0, w, h).data
      const pts = []
      for (let y = 0; y < h; y += 3) {
        for (let x = 0; x < w; x += 3) {
          if (a[(y * w + x) * 4 + 3] > 128) pts.push(x * 2, y * 2)
        }
      }
      return pts
    })
  }

  function size() {
    dpr = Math.min(2, window.devicePixelRatio || 1)
    W = window.innerWidth
    H = window.innerHeight
    if (cv) {
      cv.width = W * dpr
      cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const zEls = [...document.querySelectorAll('.z')]
    Zs = zEls.map(z => ({ top: z.offsetTop, h: Math.max(1, z.offsetHeight - H) }))
    build()
    eyes()
  }

  resizeHandler = () => size()
  window.addEventListener('resize', resizeHandler)
  size()

  if (document.fonts) {
    document.fonts.ready.then(build)
  }

  // Face image -> keyed cutout -> particles
  const img = new Image()
  img.onload = () => {
    const o = document.createElement('canvas')
    o.width = o.height = 640
    const c = o.getContext('2d')
    c.drawImage(img, 0, 0, 640, 640)
    const d = c.getImageData(0, 0, 640, 640)
    const a = d.data

    for (let i = 0; i < a.length; i += 4) {
      const r = a[i], g = a[i + 1], b = a[i + 2], bl = b - Math.max(r, g)
      if (bl > 38) a[i + 3] = 0
      else if (bl > 14) {
        a[i + 3] = 255 * (1 - (bl - 14) / 24)
        a[i + 2] = Math.max(r, g)
      }
    }
    c.putImageData(d, 0, 0)
    cut = o

    for (let y = 0; y < 640; y += 6) {
      for (let x = 0; x < 640; x += 6) {
        const k = (y * 640 + x) * 4
        if (a[k + 3] > 200) {
          P.push({
            i: P.length,
            lx: x - 320,
            ly: y - 320,
            fc: `rgb(${a[k]},${a[k + 1]},${a[k + 2]})`,
            d: Math.random(),
            m: Math.random(),
            pxr: Math.random(),
            sw: Math.random() - 0.5,
            hi: (Math.random() * 24) | 0,
            jx: Math.random() - 0.5,
            jy: Math.random() - 0.5
          })
        }
      }
    }
    build()
    t0 = performance.now()
    document.body.classList.add('go')
    isLoaded.value = true
  }
  img.src = FACE

  function pal(y) {
    return PAL[0].map(v => v.slice())
  }

  function place(p, c, u) {
    if (c === 0 && u < 0.56) {
      const r = clamp(((u - 0.05) / 0.45) * 1.5 - p.d * 0.5)
      const f = ei(r)
      return [p.ax + p.sw * 50 * f, p.ay + (p.py - p.ay) * f, 1, 0, 0]
    }
    const a = c === 0 ? 0.56 : 0
    const b = c === 0 ? 0.84 : c === 5 ? 0.6 : 0.5
    const r = sm(((u - a) / (b - a)) * 1.5 - p.d * 0.5)
    let tx, ty
    if (c === 5) {
      tx = p.qx
      ty = p.qy
    } else {
      const wt = WT[c]
      const n = (wt && wt.length / 2) || 0
      if (n) {
        const j = (p.i % n) * 2
        tx = wt[j] + p.jx * 5
        ty = wt[j + 1] + p.jy * 5
      } else {
        tx = p.ax
        ty = p.ay
      }
    }
    let x = p.px + (tx - p.px) * r + Math.sin(r * 3.14) * p.sw * 80
    let y = p.py + (ty - p.py) * r
    let al = 1
    if (c === 5) return [x, y, 1, 1 - r, r > 0.9 ? 0 : 1]
    const dq = c === 0 ? 0.88 : 0.72
    if (u > dq) {
      const q = clamp((u - dq) / (1 - dq))
      y -= q * q * H * 0.55 * (0.3 + p.m)
      al = 1 - q
    }
    return [x, y, al, c === 0 ? r : 1, c === 0 ? (r > 0.12 ? 1 : 0) : 1]
  }

  function frame(now) {
    animId = requestAnimationFrame(frame)
    if (!W || !Zs.length) return
    const T = (now - t0) / 1000
    const y = window.scrollY
    const [c1, c2, ink] = pal(y)
    const dk = ink[0] > 150

    // Calculate how far through the intro spacer we are
    const z0 = Zs[0]
    const introTotalHeight = z0 ? z0.h : H * 2.5
    
    // As user scrolls towards the end of the intro, smoothly fade out the intro canvas
    let currentAlpha = 1
    if (y > introTotalHeight * 0.72) {
      currentAlpha = clamp(1 - (y - introTotalHeight * 0.72) / (introTotalHeight * 0.24))
    }
    canvasOpacity.value = currentAlpha
    headerOpacity.value = currentAlpha
    
    // Notify parent if we have transitioned into the main website
    const isPast = y >= introTotalHeight * 0.65
    emit('introStateChange', { isPastIntro: isPast, progress: clamp(y / introTotalHeight) })

    R.setProperty('--ink', `rgb(${ink})`)
    R.setProperty('--mut', `rgba(${ink},.7)`)
    R.setProperty('--line', `rgba(${ink},.24)`)

    const g = ctx.createRadialGradient(W * 0.5, H * 0.42, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.85)
    g.addColorStop(0, `rgb(${c1})`)
    g.addColorStop(1, `rgb(${c2})`)
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)

    let c = 0
    for (let i = 0; i < Zs.length; i++) {
      if (y >= Zs[i].top) c = i
    }
    const z = Zs[c] || Zs[0]
    const u = clamp((y - z.top) / (1.5 * H))
    const intro = clamp(T / (RM ? 1.2 : 4.5))
    const face = c === 0 && u < 0.05

    if (cut && cA) {
      ctx.save()
      if (c === 0) {
        const gg = sm((u - 0.14) / 0.13), amp = 0
        ctx.translate(Math.sin(T * 83) * amp, Math.cos(T * 71) * amp)
      }
      if (face) {
        const fs = Math.min(W * 0.14, H * 0.27)
        ctx.save()
        ctx.globalAlpha = (1 - sm((u - 0.14) / 0.13) * 0.7) * sm(intro * 2 - 0.6)
        ctx.fillStyle = `rgb(${ink})`
        ctx.textAlign = 'center'
        ctx.font = `500 ${fs}px "Bricolage Grotesque",system-ui,sans-serif`
        ctx.restore()

        const gg = sm((u - 0.14) / 0.13)
        const s = sA * (1 + 0.08 * gg) * (1 + 0.004 * Math.sin(T * 1.6))
        ctx.globalAlpha = intro < 1 ? clamp((intro - 0.9) * 10) : 1
        ctx.drawImage(cut, cA[0] - 320 * s, cA[1] - 320 * s, 640 * s, 640 * s)
        ctx.globalAlpha = 1
      }
      const ia5 = c === 5 ? sm((u - 0.8) / 0.18) : 0
      if ((face && intro < 1) || (!face && u < 0.56)) {
        const wc = []
        const sp = c === 1 ? 12 : 5
        const L = dk ? 66 : 46
        const fsz = (c === 5 ? 6 * sB : 6 * sA) * 1.08
        for (let i = 0; i < 24; i++) {
          wc.push(`hsl(${(HUE[Math.min(c, 5)] + i * sp + T * 14) % 360} 88% ${L}%)`)
        }
        if (dk && c > 0 && c < 5) ctx.globalCompositeOperation = 'lighter'
        for (const p of P) {
          let x, yy, al = 1, w = 0, k = 0
          if (face) {
            const r = sm(intro * 1.5 - p.d * 0.5)
            x = p.px + (p.ax - p.px) * r
            yy = p.py + (p.ay - p.py) * r
          } else {
            ;[x, yy, al, w, k] = place(p, c, u)
          }
          const sz = fsz + (3.4 - fsz) * w
          ctx.globalAlpha = al * (1 - ia5)
          ctx.fillStyle = k ? wc[p.hi] : p.fc
          ctx.fillRect(x - sz / 2, yy - sz / 2, sz, sz)
        }
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 1
      }
      if (ia5 > 0) {
        ctx.globalAlpha = ia5
        ctx.drawImage(cut, cB[0] - 320 * sB, cB[1] - 320 * sB, 640 * sB, 640 * sB)
        ctx.globalAlpha = 1
      }
      ctx.restore()
    }

    // Serving fast systems with precision
    const sh = sm((u - 0.3) / 0.22)
    const q = sm((u - 0.58) / 0.15)
    if (sh > 0.003) {
      ctx.save()
      ctx.globalAlpha = sh
      ctx.fillStyle = '#0b0807'
      ctx.fillRect(0, 0, W, H)
      if (sh > 0.5) {
        R.setProperty('--ink', '#f5ece4')
        R.setProperty('--mut', 'rgba(245,236,228,.7)')
        R.setProperty('--line', 'rgba(245,236,228,.24)')
      }
      const px = Math.min(W * 0.08, H * 0.15)
      const dy = (1 - q) * px * 0.25
      ctx.font = `600 ${px}px "Bricolage Grotesque",system-ui,sans-serif`
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
      ctx.globalAlpha = q
      ctx.fillStyle = '#f5ece4'
      ctx.fillText('Serving fast systems', W / 2, H / 2 - px * 0.6 + dy)
      const w1 = ctx.measureText('with ').width
      const w2 = ctx.measureText('precision.').width
      const x0 = W / 2 - (w1 + w2) / 2
      ctx.textAlign = 'left'
      ctx.fillText('with ', x0, H / 2 + px * 0.6 + dy)
      ctx.fillStyle = '#ff9d2e'
      ctx.fillText('precision.', x0 + w1, H / 2 + px * 0.6 + dy)
      ctx.restore()
    }

    introBadgeOpacity.value = clamp(1 - y / (H * 0.2)) * clamp(intro * 2 - 1)

    const z5 = Zs[5]
    const fo = z5 ? sm((y - (z5.top + z5.h * 0.8)) / (H * 0.3)) : 0
    if (fg) {
      fg.style.opacity = fo
      fg.style.transform = `translateY(${(1 - fo) * 40}%)`
      if (fo > 0 && fo < 1) eyes()
    }
  }

  animId = requestAnimationFrame(frame)
})

onUnmounted(() => {
  if (animId) cancelAnimationFrame(animId)
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  if (pointerHandler) window.removeEventListener('pointermove', pointerHandler)
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})
</script>

<style>
/* Home Intro container & elements matching home-intro.html */
.home-intro-root {
  position: relative;
  width: 100%;
}

#cv {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
  transition: opacity 0.5s ease;
}

.vig, .grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 6;
  transition: opacity 0.5s ease;
}

.vig {
  background: radial-gradient(ellipse at 50% 45%, transparent 60%, rgba(50, 28, 22, 0.2));
}

.grain {
  opacity: 0.08;
  mix-blend-mode: multiply;
  animation: introGrain 0.8s steps(4) infinite;
}

@keyframes introGrain {
  25% { transform: translate(-3%, 2%); }
  50% { transform: translate(2%, -3%); }
  75% { transform: translate(-2%, -1%); }
}

.bar {
  position: fixed;
  left: 0;
  right: 0;
  height: 10vh;
  background: #000;
  z-index: 99;
  transition: transform 1.6s cubic-bezier(0.7, 0, 0.2, 1) 0.5s;
}

.bar.t {
  top: 0;
}

.bar.b {
  bottom: 0;
}

body.go .t, .bar.t.go {
  transform: translateY(-100%);
}

body.go .b, .bar.b.go {
  transform: translateY(100%);
}

.intro-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: calc(20px + env(safe-area-inset-top, 0px)) 4vw 0;
  font: 500 12px/1 "JetBrains Mono", monospace;
  letter-spacing: 0.18em;
  color: var(--ink, #2b211f);
  transition: opacity 0.4s ease;
  pointer-events: none;
}

#intro {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(6vh + env(safe-area-inset-bottom, 0px));
  z-index: 7;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  pointer-events: none;
  transition: opacity 0.4s ease;
}

#intro p {
  margin: 0;
  font-size: clamp(17px, 1.7vw, 24px);
  font-weight: 500;
}

#intro .dot {
  border: 1px solid var(--line, rgba(84, 58, 52, 0.28));
  border-radius: 99px;
  padding: 9px 16px;
  font: 500 12px "JetBrains Mono", monospace;
  letter-spacing: 0.14em;
  color: var(--ink, #2b211f);
}

#intro .dot:before {
  content: "";
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #35b36b;
  margin-right: 10px;
}

#intro small {
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--mut, #65544f);
  font-family: "JetBrains Mono", monospace;
}

#fig {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 22vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: min(2.4vw, 26px);
  z-index: 3;
  pointer-events: none;
  opacity: 0;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.fig {
  --u: min(1.9vh, 2.8vw);
  position: relative;
  width: calc(var(--u) * 7 * var(--k));
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: figBob 3.2s ease-in-out infinite;
}

.fig .h {
  width: calc(var(--u) * 6 * var(--k));
  height: calc(var(--u) * 6 * var(--k));
  border-radius: 50%;
  background: var(--c);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: calc(var(--u) * 0.7 * var(--k));
}

.fig .b {
  width: calc(var(--u) * 7 * var(--k));
  height: calc(var(--u) * 5 * var(--k));
  margin-top: calc(var(--u) * -0.6 * var(--k));
  border-radius: 50% 50% 12% 12%/70% 70% 12% 12%;
  background: var(--c);
  filter: brightness(0.94);
}

.fig .e {
  width: calc(var(--u) * 2.3 * var(--k));
  height: calc(var(--u) * 2.3 * var(--k));
  border-radius: 50%;
  background: #fffaf4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fig .e i {
  width: 46%;
  height: 46%;
  border-radius: 50%;
  background: #2b211f;
  display: block;
  transition: transform 0.08s linear;
}

@keyframes figBob {
  50% { transform: translateY(calc(var(--u) * -0.5)); }
}

@media (prefers-reduced-motion: reduce) {
  .grain, .fig { animation: none; }
  .bar { transition: none; }
}
</style>

