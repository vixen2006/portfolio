<template>
  <canvas id="gl" ref="canvasRef" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvasRef = ref(null)

let renderer = null
let scene = null
let camera = null
let animationFrameId = null

// Disposables tracking
const disposables = []

function trackDisposable(obj) {
  if (obj) disposables.push(obj)
  return obj
}

onMounted(() => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8))

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 50)
  camera.position.z = 7

  // --- Lighting for standard materials (tennis ball) ---
  const ambientLight = trackDisposable(new THREE.AmbientLight(0xffffff, 0.9))
  const dirLight = trackDisposable(new THREE.DirectionalLight(0xffffff, 1.2))
  dirLight.position.set(-3, 4, 5)
  scene.add(ambientLight, dirLight)

  // --- Shader Uniforms ---
  const U = {
    uTime: { value: 0 },
    uAmp: { value: 0.26 },
    uHue: { value: 0 },
    uM: { value: new THREE.Vector2() }
  }

  const mat = trackDisposable(new THREE.ShaderMaterial({
    uniforms: U,
    extensions: { derivatives: true },
    vertexShader: `
      uniform float uTime, uAmp;
      uniform vec2 uM;
      varying vec3 vP;
      void main() {
        vec3 p = position;
        float t = uTime * .6;
        float n = sin(p.x * 1.6 + t) * sin(p.y * 1.9 - t * 1.1) * sin(p.z * 1.7 + t * .8)
                + .5 * sin(p.x * 3.1 - t * 1.3 + p.y * 2.7) * sin(p.z * 2.9 + t);
        float m = max(dot(normalize(p), normalize(vec3(uM, .9))), 0.);
        p += normal * (n * uAmp + pow(m, 5.) * .2);
        vec4 mv = modelViewMatrix * vec4(p, 1.);
        vP = mv.xyz;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform float uTime, uHue;
      varying vec3 vP;
      vec3 pal(float t) {
        return .5 + .5 * cos(6.28318 * (t + vec3(0., .33, .67)));
      }
      void main() {
        vec3 n = normalize(cross(dFdx(vP), dFdy(vP)));
        vec3 v = normalize(-vP);
        if (dot(n, v) < 0.) n = -n;
        float f = pow(1. - max(dot(n, v), 0.), 2.2);
        float t = f * .85 + n.y * .3 + n.x * .15 + uHue + uTime * .025;
        vec3 irid = mix(vec3(.9), pal(t), .6);
        vec3 L = normalize(vec3(-.5, .8, .6));
        float sp = pow(max(dot(reflect(-L, n), v), 0.), 60.);
        vec3 col = mix(vec3(.015, .02, .045), irid, clamp(f * 1.35 + .1, 0., 1.));
        col += sp * .85 + f * f * .2;
        gl_FragColor = vec4(col, 1.);
      }
    `
  }))

  const orb = new THREE.Group()
  const sphereGeo = trackDisposable(new THREE.SphereGeometry(1.5, 200, 200))
  const mesh = new THREE.Mesh(sphereGeo, mat)
  orb.add(mesh)

  // Two thin decorative rings
  const rm = trackDisposable(new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.28
  }))

  const r1Geo = trackDisposable(new THREE.TorusGeometry(2.35, 0.004, 6, 260))
  const r2Geo = trackDisposable(new THREE.TorusGeometry(2.8, 0.004, 6, 260))
  const r1 = new THREE.Mesh(r1Geo, rm)
  const r2 = new THREE.Mesh(r2Geo, rm)
  r1.rotation.x = 1.2
  r2.rotation.set(0.5, 0.8, 0)
  orb.add(r1, r2)

  // 900-particle dust field
  const N = 900
  const pa = new Float32Array(N * 3)
  for (let i = 0; i < N; i++) {
    const u = Math.random() * 6.283
    const w = Math.acos(2 * Math.random() - 1)
    const r = 3.1 + Math.random() * 1.4
    pa[i * 3] = r * Math.sin(w) * Math.cos(u)
    pa[i * 3 + 1] = r * Math.sin(w) * Math.sin(u)
    pa[i * 3 + 2] = r * Math.cos(w)
  }

  const pg = trackDisposable(new THREE.BufferGeometry())
  pg.setAttribute('position', new THREE.BufferAttribute(pa, 3))
  const dustMat = trackDisposable(new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.018,
    transparent: true,
    opacity: 0.55
  }))
  const dust = new THREE.Points(pg, dustMat)
  orb.add(dust)

  // --- ORBITING TENNIS BALL SETUP ---
  // Orbit pivot matches ring 1 (rotation x = 1.2)
  const orbitGroup = new THREE.Group()
  orbitGroup.rotation.x = 1.2
  orb.add(orbitGroup)

  // Tennis Ball Geometry with fuzzy vertex displacement
  const ballGeo = trackDisposable(new THREE.SphereGeometry(0.13, 48, 48))
  const posAttr = ballGeo.attributes.position
  for (let i = 0; i < posAttr.count; i++) {
    const bx = posAttr.getX(i)
    const by = posAttr.getY(i)
    const bz = posAttr.getZ(i)
    const noise = Math.sin(bx * 60) * Math.sin(by * 60) * Math.sin(bz * 60)
    const disp = 1 + noise * 0.006
    posAttr.setXYZ(i, bx * disp, by * disp, bz * disp)
  }
  ballGeo.computeVertexNormals()

  const ballMat = trackDisposable(new THREE.MeshStandardMaterial({
    color: 0xd4ff2a,
    roughness: 1,
    emissive: 0x3a4a00
  }))
  const ballMesh = new THREE.Mesh(ballGeo, ballMat)

  // White curved seams
  const seamMat = trackDisposable(new THREE.MeshBasicMaterial({ color: 0xf3f1ec }))
  const seam1Geo = trackDisposable(new THREE.TorusGeometry(0.13, 0.007, 8, 60))
  const seam2Geo = trackDisposable(new THREE.TorusGeometry(0.13, 0.007, 8, 60))
  const seam1 = new THREE.Mesh(seam1Geo, seamMat)
  const seam2 = new THREE.Mesh(seam2Geo, seamMat)
  seam1.rotation.set(Math.PI / 4, 0, 0)
  seam2.rotation.set(-Math.PI / 4, Math.PI / 2, 0)
  ballMesh.add(seam1, seam2)
  orbitGroup.add(ballMesh)

  // Trail: 14 tiny points fading from opacity .5 to 0
  const TRAIL_MAX = 14
  const trailGeo = trackDisposable(new THREE.SphereGeometry(0.038, 8, 8))
  const trailMeshes = []
  for (let i = 0; i < TRAIL_MAX; i++) {
    const tMat = trackDisposable(new THREE.MeshBasicMaterial({
      color: 0xd4ff2a,
      transparent: true,
      opacity: 0
    }))
    const tMesh = new THREE.Mesh(trailGeo, tMat)
    tMesh.visible = false
    orbitGroup.add(tMesh)
    trailMeshes.push(tMesh)
  }
  const trailHistory = []

  scene.add(orb)

  // Mouse tracking
  const mouse = { x: 0, y: 0 }
  let mouseVelocity = 0
  let prevMouse = { x: 0, y: 0 }

  const onPointerMove = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -((e.clientY / window.innerHeight) * 2 - 1)
    const dx = mouse.x - prevMouse.x
    const dy = mouse.y - prevMouse.y
    mouseVelocity += Math.sqrt(dx * dx + dy * dy) * 4
    prevMouse.x = mouse.x
    prevMouse.y = mouse.y
  }
  window.addEventListener('pointermove', onPointerMove, { passive: true })

  const isMobile = () => window.innerWidth < 800

  // 7 Sections: Hero, About, Baseline (Work), Match (Experience), Roster (Stack), Match point (Recognition), Contact
  const L = [
    [0, 0, 1.3],       // 0: hero
    [3.2, 0, 1],       // 1: about
    [4.4, 1.8, 0.55],  // 2: baseline (work)
    [3.4, 0, 0.85],    // 3: the match (experience)
    [4.4, 1.8, 0.55],  // 4: the roster (stack)
    [3.2, 0, 0.8],     // 5: match point (recognition)
    [0, 0, 1.4]        // 6: contact
  ]

  function onResize() {
    if (!renderer || !camera) return
    renderer.setSize(window.innerWidth, window.innerHeight, false)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', onResize)
  onResize()

  function sIdx() {
    const secs = [...document.querySelectorAll('main section')]
    if (!secs.length) return 0
    const y = window.scrollY + window.innerHeight * 0.5
    const c = secs.map(e => e.offsetTop + e.offsetHeight / 2)
    if (y <= c[0]) return 0
    for (let k = 0; k < c.length - 1; k++) {
      if (y < c[k + 1]) {
        let f = (y - c[k]) / (c[k + 1] - c[k])
        f = f * f * (3 - 2 * f)
        return k + f
      }
    }
    return c.length - 1
  }

  let sm = 0
  let last = 0
  let amp = 0.26
  let intro = 0
  let orbitAngle = 0
  let lastFrameTime = performance.now()
  const startTime = performance.now()
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function loop() {
    const now = performance.now()
    const dt = Math.min((now - lastFrameTime) * 0.001, 0.1)
    lastFrameTime = now
    const t = (now - startTime) * 0.001

    const s = sIdx()
    sm += (s - sm) * 0.06
    const v = Math.abs(sm - last)
    last = sm

    amp += ((0.26 + Math.min(v * 14, 0.3)) - amp) * 0.08
    U.uAmp.value = prefersReduced ? 0.12 : amp
    U.uTime.value = t
    U.uHue.value = sm * 0.11

    U.uM.value.x += (mouse.x * 1.2 - U.uM.value.x) * 0.06
    U.uM.value.y += (mouse.y * 1.2 - U.uM.value.y) * 0.06

    // Linear interpolation between neighbor sections
    const k = Math.min(Math.floor(sm), L.length - 2)
    const f = sm - k
    const a = L[k]
    const b = L[Math.min(k + 1, L.length - 1)]

    let x = a[0] + (b[0] - a[0]) * f
    let y = a[1] + (b[1] - a[1]) * f
    let sc2 = a[2] + (b[2] - a[2]) * f

    if (isMobile()) {
      x = 0
      y = sm < 0.5 ? 0.6 : 2.4
      sc2 *= 0.62
    }

    intro = Math.min(1, intro + 0.012)
    const ie = 1 - Math.pow(1 - intro, 4)

    orb.position.set(x, y + Math.sin(t * 0.8) * 0.08, 0)
    orb.scale.setScalar(sc2 * ie)

    mesh.rotation.y = t * 0.12 + mouse.x * 0.3
    mesh.rotation.x = -mouse.y * 0.2
    r1.rotation.z = t * 0.15
    r2.rotation.y = -t * 0.1
    dust.rotation.y = t * 0.03

    // --- TENNIS BALL MOTION ---
    mouseVelocity *= 0.94 // ease back
    const scrollVelocityBoost = Math.min(v * 18, 2.5)
    const angularSpeed = prefersReduced
      ? 0.3
      : 0.5 + Math.min(mouseVelocity, 2.0) + scrollVelocityBoost

    orbitAngle += angularSpeed * dt

    // Ball coordinates in orbitGroup (radius 2.35, gentle bob normal to plane)
    const orbitRadius = 2.35
    const bx = Math.cos(orbitAngle) * orbitRadius
    const by = Math.sin(orbitAngle) * orbitRadius
    const bz = Math.sin(t * 2.8) * 0.05
    ballMesh.position.set(bx, by, bz)

    // Self-spin on axis
    ballMesh.rotation.x += dt * 3.5
    ballMesh.rotation.y += dt * 4.5

    // Update trail
    trailHistory.unshift(ballMesh.position.clone())
    const trailLimit = isMobile() ? 8 : TRAIL_MAX
    while (trailHistory.length > trailLimit) {
      trailHistory.pop()
    }

    for (let i = 0; i < TRAIL_MAX; i++) {
      if (i < trailHistory.length) {
        trailMeshes[i].visible = true
        trailMeshes[i].position.copy(trailHistory[i])
        const progress = 1 - i / trailLimit
        trailMeshes[i].scale.setScalar(Math.max(0.08, progress * 0.9))
        trailMeshes[i].material.opacity = progress * 0.5
      } else {
        trailMeshes[i].visible = false
      }
    }

    renderer.render(scene, camera)
    animationFrameId = requestAnimationFrame(loop)
  }

  loop()
  setTimeout(() => {
    document.body.classList.add('on')
  }, 100)

  // Clean-up hook stored
  canvasRef.value.__cleanup = () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('resize', onResize)
    disposables.forEach(d => {
      if (typeof d.dispose === 'function') d.dispose()
    })
    if (renderer) renderer.dispose()
    document.body.classList.remove('on')
  }
})

onUnmounted(() => {
  if (canvasRef.value && canvasRef.value.__cleanup) {
    canvasRef.value.__cleanup()
  }
})
</script>
