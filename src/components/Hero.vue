<template>
  <header class="hero-section" id="home">
    <div class="container">
      <!-- Main Cinematic Tennis Court Hero Card -->
      <div class="hero-court-card" ref="heroCardEl">
        
        <!-- Court Backdrop with Sky Gradient & Tennis Net in Perspective -->
        <div class="court-visual-stage" ref="courtStageEl">
          <!-- Sky Gradient Overlay -->
          <div class="sky-gradient-overlay" aria-hidden="true"></div>

          <!-- Tennis Court Realistic Image -->
          <img
            src="/tennis-court-hero.jpg"
            alt="Cinematic grass tennis court with net and center service line"
            class="court-bg-img"
            loading="eager"
          />

          <!-- Vignette & Atmosphere -->
          <div class="court-atmospheric-overlay" aria-hidden="true"></div>

          <!-- Tennis Ball Animation Container (aligned with center court line) -->
          <div class="tennis-ball-track" ref="ballTrackEl" aria-hidden="true">
            <!-- Ground Contact Shadow -->
            <div class="tennis-ball-shadow" ref="ballShadowEl"></div>

            <!-- The Tennis Ball with realistic felt and seams -->
            <div
              class="tennis-ball-sphere"
              ref="ballEl"
              :class="{ 'is-interactive': isAnimationComplete }"
              @mouseenter="onBallHover"
              title="Click or hover to interact"
            >
              <div class="ball-texture">
                <!-- Felt seam svg -->
                <svg viewBox="0 0 100 100" class="ball-seam-svg" xmlns="http://www.w3.org/2000/svg">
                  <!-- Tennis ball sphere shading -->
                  <defs>
                    <radialGradient id="ballShading" cx="35%" cy="30%" r="65%">
                      <stop offset="0%" stop-color="#f6ff73" />
                      <stop offset="45%" stop-color="#d4ff3d" />
                      <stop offset="80%" stop-color="#9dc600" />
                      <stop offset="100%" stop-color="#5a7700" />
                    </radialGradient>
                  </defs>
                  <circle cx="50" cy="50" r="48" fill="url(#ballShading)" />
                  <!-- Authentic tennis curved rubber seams -->
                  <path
                    d="M 20 22 C 38 34, 38 66, 20 78"
                    fill="none"
                    stroke="#ffffff"
                    stroke-width="4.5"
                    stroke-linecap="round"
                    stroke-opacity="0.88"
                  />
                  <path
                    d="M 80 22 C 62 34, 62 66, 80 78"
                    fill="none"
                    stroke="#ffffff"
                    stroke-width="4.5"
                    stroke-linecap="round"
                    stroke-opacity="0.88"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Replay Serve Pill Button -->
          <button
            class="replay-serve-btn"
            @click="replayServeAnimation"
            aria-label="Replay tennis ball entrance serve"
            title="Replay cinematic serve"
          >
            <span class="replay-icon" aria-hidden="true">↺</span>
            <span class="replay-text font-technical">Replay Serve</span>
          </button>
        </div>

        <!-- Overlaid Editorial Content (Staggered Reveal) -->
        <div class="hero-content-overlay" ref="heroContentEl">
          <!-- Prelude kicker -->
          <p class="hero-prelude font-editorial">Nothing lasts, yet here I am pretending …</p>

          <!-- Monumental Name Headline with Neon 'Trivedi' -->
          <div class="hero-name-container">
            <h1 class="hero-name font-editorial">
              <span class="name-first">Vaishnavi</span>
              <span class="name-trivedi">Trivedi</span>
            </h1>
            <p class="hero-subhead font-editorial">
              Serving Fast Systems <em class="title-accent">with</em> Precision
            </p>
          </div>

          <!-- Role + Status -->
          <div class="hero-meta-row">
            <span class="hero-role font-technical">Software Engineer</span>
            <span class="status-pill">
              <span class="status-dot" aria-hidden="true"></span>
              Open to work
            </span>
            <span class="location-pill font-technical">Delhi, India</span>
          </div>

          <!-- Tagline with Credo -->
          <p class="hero-tagline">
            <span class="hero-credo">I learn by building.</span> Crafting fast, reliable systems — from satellite thermal intelligence and air-gapped CV integrity frameworks to real-time trading engines and full-stack LLM evaluation platforms — and uncovering where they break before anyone else does.
          </p>

          <!-- Social Links as Editorial Pills -->
          <div class="hero-socials" role="list" aria-label="Social and coding profiles">
            <a
              v-for="link in socialLinks"
              :key="link.label"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-pill"
              :aria-label="link.label"
              role="listitem"
            >
              <span v-html="link.icon" class="social-icon" aria-hidden="true"></span>
              <span class="social-label">{{ link.label }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Scoreboard Component (Nested in Vertical Proportions) -->
      <div class="scoreboard-section-wrapper">
        <Scoreboard />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import Scoreboard from './Scoreboard.vue'

defineProps({ isDark: Boolean })

const heroCardEl = ref(null)
const courtStageEl = ref(null)
const ballTrackEl = ref(null)
const ballEl = ref(null)
const ballShadowEl = ref(null)
const heroContentEl = ref(null)

const isAnimationComplete = ref(false)

const socialLinks = [
  {
    label: 'GitHub',
    url: 'https://github.com/vixen2006',
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/></svg>`
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/vaishnavi-trivedi-ab8b3434a/',
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z"/></svg>`
  },
  {
    label: 'X',
    url: 'https://x.com/nav_trivedi',
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/></svg>`
  },
  {
    label: 'LeetCode',
    url: 'https://leetcode.com/u/vixen2006/',
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0Zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382H10.617Z"/></svg>`
  },
  {
    label: 'Codeforces',
    url: 'https://codeforces.com/profile/VIXXENN',
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3Zm9-4.5c.828 0 1.5.672 1.5 1.5V19.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V4.5C9 3.672 9.672 3 10.5 3h3Zm9 7.5c.828 0 1.5.672 1.5 1.5v9c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-9c0-.828.672-1.5 1.5-1.5h3Z"/></svg>`
  },
  {
    label: 'Email',
    url: 'mailto:vixen2006triv@gmail.com',
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`
  }
]

function runCinematicServeAnimation(isForced = false) {
  if (!ballEl.value || !ballShadowEl.value) return

  // Check prefers-reduced-motion
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    setSettledState()
    return
  }

  // Check if session has already seen the entrance animation (run once per session unless forced)
  const hasSeen = sessionStorage.getItem('vt_tennis_ball_intro_seen')
  if (hasSeen && !isForced) {
    setSettledState()
    return
  }

  isAnimationComplete.value = false

  // Master Timeline
  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    onComplete: () => {
      isAnimationComplete.value = true
      sessionStorage.setItem('vt_tennis_ball_intro_seen', 'true')
    }
  })

  // Initial states: Ball starts far at the net
  gsap.set(ballEl.value, {
    y: -190,
    scale: 0.18,
    rotation: -180,
    filter: 'blur(3px)',
    opacity: 0.8
  })
  gsap.set(ballShadowEl.value, {
    scaleX: 0.2,
    scaleY: 0.2,
    opacity: 0.25
  })
  gsap.set(heroContentEl.value, {
    opacity: 0,
    y: 20
  })

  // BOUNCE 1: Drop from net towards middle court
  tl.to(ballEl.value, {
    y: -70,
    scale: 0.44,
    rotation: 60,
    duration: 0.65,
    ease: 'power2.in',
    filter: 'blur(1.5px)'
  }, 0)
  .to(ballShadowEl.value, {
    scaleX: 0.45,
    scaleY: 0.35,
    opacity: 0.8,
    duration: 0.65,
    ease: 'power2.in'
  }, 0)

  // BOUNCE 1 IMPACT: Squash on ground
  .to(ballEl.value, {
    scaleY: 0.36,
    scaleX: 0.5,
    duration: 0.08,
    ease: 'power1.out'
  }, '+=0')

  // BOUNCE 1 REBOUND: Apex
  .to(ballEl.value, {
    y: -120,
    scale: 0.62,
    scaleY: 0.68,
    scaleX: 0.58,
    rotation: 260,
    duration: 0.48,
    ease: 'power1.out',
    filter: 'blur(2px)'
  })
  .to(ballShadowEl.value, {
    scaleX: 0.48,
    scaleY: 0.28,
    opacity: 0.35,
    duration: 0.48,
    ease: 'power1.out'
  }, '-=0.48')

  // BOUNCE 2: Descent toward near court
  .to(ballEl.value, {
    y: 10,
    scale: 0.82,
    scaleY: 0.82,
    scaleX: 0.82,
    rotation: 460,
    duration: 0.42,
    ease: 'power2.in',
    filter: 'blur(1px)'
  })
  .to(ballShadowEl.value, {
    scaleX: 0.85,
    scaleY: 0.6,
    opacity: 0.85,
    duration: 0.42,
    ease: 'power2.in'
  }, '-=0.42')

  // BOUNCE 2 IMPACT: Squash
  .to(ballEl.value, {
    scaleY: 0.72,
    scaleX: 0.9,
    duration: 0.07,
    ease: 'power1.out'
  })

  // FINAL GLIDE & SETTLE: Rolls gently into resting hero position
  .to(ballEl.value, {
    y: 45,
    scale: 1.0,
    scaleY: 1.0,
    scaleX: 1.0,
    rotation: 720,
    filter: 'blur(0px)',
    duration: 0.6,
    ease: 'power3.out'
  })
  .to(ballShadowEl.value, {
    scaleX: 1.0,
    scaleY: 0.75,
    opacity: 0.7,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.6')

  // SMOOTH TRANSITION: Fade in editorial typography
  .to(heroContentEl.value, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.4')
}

function setSettledState() {
  isAnimationComplete.value = true
  if (ballEl.value && ballShadowEl.value) {
    gsap.set(ballEl.value, {
      y: 45,
      scale: 1.0,
      rotation: 0,
      filter: 'blur(0px)',
      opacity: 1
    })
    gsap.set(ballShadowEl.value, {
      scaleX: 1.0,
      scaleY: 0.75,
      opacity: 0.7
    })
  }
  if (heroContentEl.value) {
    gsap.set(heroContentEl.value, {
      opacity: 1,
      y: 0
    })
  }
}

function replayServeAnimation() {
  runCinematicServeAnimation(true)
}

function onBallHover() {
  if (!isAnimationComplete.value || !ballEl.value) return
  gsap.to(ballEl.value, {
    rotation: '+=90',
    scale: 1.08,
    y: 36,
    duration: 0.25,
    ease: 'power2.out',
    yoyo: true,
    repeat: 1
  })
}

onMounted(() => {
  // Let page layout initialize before triggering serve
  setTimeout(() => {
    runCinematicServeAnimation()
  }, 100)
})
</script>

<style scoped>
.hero-section {
  padding-top: calc(var(--nav-height) + 24px);
  padding-bottom: 72px;
}

/* Main Rounded Court Frame */
.hero-court-card {
  position: relative;
  background-color: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
}

/* Court Visual Stage (Top Perspective Scene) */
.court-visual-stage {
  position: relative;
  width: 100%;
  height: clamp(340px, 46vw, 500px);
  overflow: hidden;
  background: linear-gradient(180deg, #f7f2dc 0%, #ece3c3 40%, #567b3b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

[data-theme="dark"] .court-visual-stage {
  background: linear-gradient(180deg, #182214 0%, #111a0e 45%, #25391c 100%);
}

.sky-gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 48%;
  background: linear-gradient(180deg, rgba(247, 242, 220, 0.95) 0%, rgba(245, 238, 214, 0.4) 100%);
  z-index: 2;
  pointer-events: none;
}

[data-theme="dark"] .sky-gradient-overlay {
  background: linear-gradient(180deg, rgba(24, 34, 20, 0.92) 0%, rgba(17, 26, 14, 0.4) 100%);
}

.court-bg-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  z-index: 1;
  filter: contrast(1.02) saturate(1.04);
}

.court-atmospheric-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 40%, transparent 45%, rgba(0, 0, 0, 0.18) 100%);
  z-index: 2;
  pointer-events: none;
}

/* Tennis Ball Track in Center Perspective */
.tennis-ball-track {
  position: absolute;
  bottom: 22%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tennis-ball-shadow {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 20px;
  background: radial-gradient(ellipse at center, rgba(10, 18, 8, 0.75) 0%, rgba(10, 18, 8, 0.25) 55%, transparent 80%);
  border-radius: 50%;
  pointer-events: none;
}

.tennis-ball-sphere {
  position: absolute;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  cursor: grab;
  transition: transform 0.1s ease;
  will-change: transform, filter;
  filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.35));
}

.tennis-ball-sphere.is-interactive:hover {
  cursor: pointer;
}

.ball-texture {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: inset -4px -6px 12px rgba(45, 65, 10, 0.6), inset 3px 3px 6px rgba(255, 255, 255, 0.5);
}

.ball-seam-svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* Replay Serve Button */
.replay-serve-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--radius-pill);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #1a2216;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  cursor: pointer;
}

[data-theme="dark"] .replay-serve-btn {
  background-color: rgba(20, 28, 17, 0.85);
  border-color: rgba(255, 255, 255, 0.12);
  color: #f0f3eb;
}

.replay-serve-btn:hover {
  transform: translateY(-1px);
  background-color: var(--accent);
  color: #0c120a;
}

.replay-icon {
  font-size: 13px;
  line-height: 1;
}

/* Editorial Overlaid Content */
.hero-content-overlay {
  padding: clamp(36px, 5vw, 64px) clamp(24px, 5vw, 56px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  z-index: 10;
}

.hero-prelude {
  font-size: 14px;
  font-style: italic;
  font-weight: 400;
  color: var(--clay);
  margin-bottom: 24px;
  letter-spacing: 0.02em;
}

/* Monumental Name Block */
.hero-name-container {
  margin-bottom: 24px;
}

.hero-name {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  flex-wrap: wrap;
  gap: clamp(10px, 1.8vw, 22px);
  margin-bottom: 12px;
}

.name-first {
  font-size: clamp(44px, 7.5vw, 92px);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1;
  color: var(--text);
  display: inline-block;
}

/* 'Trivedi' in High-Contrast Display Serif on the same line in pure flat Neon (no glow) */
.name-trivedi {
  font-family: 'Fraunces', Georgia, serif;
  font-variation-settings: 'opsz' 144, 'wght' 800;
  font-size: clamp(44px, 7.5vw, 92px);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1;
  display: inline-block;
  color: #729602;
  text-shadow: none;
  transition: color 0.2s ease;
}

[data-theme="dark"] .name-trivedi {
  color: #d4ff3d;
  text-shadow: none;
}

.hero-subhead {
  font-size: clamp(18px, 2.5vw, 28px);
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: var(--text-muted);
  margin-top: 14px;
}

.title-accent {
  font-style: italic;
  color: var(--text);
}

/* Meta Row */
.hero-meta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.hero-role {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--text);
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 5px 12px;
  background-color: var(--pill-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  color: var(--text-muted);
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--accent);
  box-shadow: 0 0 8px var(--accent);
  animation: pulse-dot 2.4s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

.location-pill {
  font-size: 12px;
  color: var(--text-subtle);
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  background-color: rgba(0, 0, 0, 0.03);
}

[data-theme="dark"] .location-pill {
  background-color: rgba(255, 255, 255, 0.05);
}

/* Hero Tagline */
.hero-tagline {
  font-size: clamp(16px, 1.9vw, 19px);
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-muted);
  max-width: 720px;
  margin-bottom: 32px;
}

.hero-credo {
  font-family: 'Fraunces', Georgia, serif;
  font-style: italic;
  font-weight: 700;
  color: var(--clay);
  margin-right: 4px;
}

[data-theme="dark"] .hero-credo {
  color: var(--accent);
}

/* Hero Actions Row */
.hero-actions-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 32px;
}

.btn-arrow {
  font-size: 14px;
  transition: transform 0.2s ease;
}

.btn-primary:hover .btn-arrow {
  transform: translate(2px, -2px);
}

.btn-outline:hover .btn-arrow {
  transform: translateY(2px);
}

/* Social Pills */
.hero-socials {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.social-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 6px 14px;
  background-color: var(--pill-bg);
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
}

.social-pill:hover {
  color: var(--text);
  border-color: var(--accent);
  transform: translateY(-1px);
}

.social-icon {
  display: flex;
  align-items: center;
}

/* Scoreboard Wrapper */
.scoreboard-section-wrapper {
  margin-top: 36px;
}

@media (max-width: 600px) {
  .hero-section {
    padding-top: calc(var(--nav-height) + 16px);
    padding-bottom: 48px;
  }
  .court-visual-stage {
    height: 280px;
  }
  .tennis-ball-track {
    width: 70px;
    height: 70px;
    bottom: 24%;
  }
  .tennis-ball-sphere {
    width: 56px;
    height: 56px;
  }
  .hero-content-overlay {
    padding: 28px 20px;
  }
}
</style>
