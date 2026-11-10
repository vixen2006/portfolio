<template>
  <div class="portfolio-root">
    <!-- Home Intro (Face particles, cinematic bars, and scroll reveal) -->
    <HomeIntro @intro-state-change="onIntroStateChange" />

    <!-- Liquid Pearl Orb Three.js Canvas -->
    <LiquidOrb />

    <!-- Top Fixed Nav (Fades in when scrolling past intro) -->
    <Navbar :style="{ opacity: isPastIntro ? 1 : 0, pointerEvents: isPastIntro ? 'auto' : 'none', transition: 'opacity 0.4s ease' }" />

    <!-- Main Content -->
    <main>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Stack />
      <Recognition />
      <Contact />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HomeIntro from './components/HomeIntro.vue'
import LiquidOrb from './components/LiquidOrb.vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Experience from './components/Experience.vue'
import Stack from './components/Stack.vue'
import Recognition from './components/Recognition.vue'
import Contact from './components/Contact.vue'

const isPastIntro = ref(false)

function onIntroStateChange(state) {
  isPastIntro.value = state.isPastIntro
}

onMounted(() => {
  // Set up reveal animation observer immediately
  const isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const elements = document.querySelectorAll('.rv')

  if (isReducedMotion) {
    elements.forEach(el => el.classList.add('in'))
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.08
    })

    elements.forEach(el => observer.observe(el))
  }
})
</script>

<style>
/* App wrapper styling */
.portfolio-root {
  position: relative;
  width: 100%;
}
</style>
