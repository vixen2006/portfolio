<template>
  <div>
    <!-- Custom Cursor -->
    <div id="custom-cursor" ref="cursorEl" aria-hidden="true" v-if="!isTouchDevice">
      <svg v-if="!isPointerCursor" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11" :fill="isDark ? '#d4ff3d' : '#a8c400'" stroke="var(--bg)" stroke-width="1"/>
        <path d="M5 8 Q12 4.5 19 8 Q21.5 12 19 16 Q12 19.5 5 16 Q2.5 12 5 8Z" fill="none" stroke="var(--bg)" stroke-width="1.2" stroke-opacity="0.5"/>
      </svg>
      <svg v-else width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Racket head (oval) -->
        <ellipse cx="14" cy="11" rx="8" ry="9" fill="none" :stroke="isDark ? '#d4ff3d' : '#a8c400'" stroke-width="1.5"/>
        <!-- Racket strings horizontal -->
        <line x1="6.5" y1="8" x2="21.5" y2="8" stroke="var(--text)" stroke-width="0.7" stroke-opacity="0.4"/>
        <line x1="6.2" y1="11" x2="21.8" y2="11" stroke="var(--text)" stroke-width="0.7" stroke-opacity="0.4"/>
        <line x1="6.5" y1="14" x2="21.5" y2="14" stroke="var(--text)" stroke-width="0.7" stroke-opacity="0.4"/>
        <!-- Racket strings vertical -->
        <line x1="11" y1="3" x2="11" y2="20" stroke="var(--text)" stroke-width="0.7" stroke-opacity="0.4"/>
        <line x1="14" y1="2.1" x2="14" y2="20" stroke="var(--text)" stroke-width="0.7" stroke-opacity="0.4"/>
        <line x1="17" y1="3" x2="17" y2="20" stroke="var(--text)" stroke-width="0.7" stroke-opacity="0.4"/>
        <!-- Handle -->
        <rect x="12.5" y="19.5" width="3" height="7" rx="1.5" :fill="isDark ? '#d4ff3d' : '#a8c400'"/>
      </svg>
    </div>

    <div :data-theme="isDark ? 'dark' : 'light'" :class="{ 'touch-device': isTouchDevice }">
      <Navbar :is-dark="isDark" @toggle-theme="toggleTheme" />
      <main>
        <Hero :is-dark="isDark" />
        <CourtDivider />
        <Projects />
        <CourtDivider />
        <Experience />
        <CourtDivider />
        <Skills />
        <CourtDivider />
        <TrophyCabinet />
        <ClosingQuote />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import CourtDivider from './components/CourtDivider.vue'
import Projects from './components/Projects.vue'
import Experience from './components/Experience.vue'
import Skills from './components/Skills.vue'
import TrophyCabinet from './components/TrophyCabinet.vue'
import ClosingQuote from './components/ClosingQuote.vue'
import Footer from './components/Footer.vue'

// ---- THEME ----
const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('vt-theme', isDark.value ? 'dark' : 'light')
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}

// ---- CURSOR ----
const cursorEl = ref(null)
const isPointerCursor = ref(false)
const isTouchDevice = ref(false)

const POINTER_SELECTORS = 'a, button, [role="button"], .project-card, .experience-card, label'

function onMouseMove(e) {
  if (!cursorEl.value) return
  cursorEl.value.style.left = `${e.clientX}px`
  cursorEl.value.style.top = `${e.clientY}px`
}

function onMouseOver(e) {
  const target = e.target.closest(POINTER_SELECTORS)
  isPointerCursor.value = !!target
}

const prefersReducedMotion = computed(() => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

onMounted(() => {
  // Detect touch device
  isTouchDevice.value = window.matchMedia('(hover: none)').matches || 'ontouchstart' in window

  // Theme from localStorage
  const saved = localStorage.getItem('vt-theme')
  if (saved) {
    isDark.value = saved === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')

  if (!isTouchDevice.value && !prefersReducedMotion.value) {
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseover', onMouseOver, { passive: true })
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseover', onMouseOver)
})
</script>

<style>
[data-theme] {
  background-color: var(--bg);
  color: var(--text);
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
}

#custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.15s ease, height 0.15s ease;
  will-change: left, top;
}
</style>
