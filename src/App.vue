<template>
  <div class="portfolio-root">
    <!-- Liquid Pearl Orb Three.js Canvas -->
    <LiquidOrb />

    <!-- Top Fixed Nav -->
    <Navbar :visitor-formatted="visitorFormatted" />

    <!-- Main Content -->
    <main>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Stack />
      <Recognition />
      <Contact :visitor-formatted="visitorFormatted" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import LiquidOrb from './components/LiquidOrb.vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Experience from './components/Experience.vue'
import Stack from './components/Stack.vue'
import Recognition from './components/Recognition.vue'
import Contact from './components/Contact.vue'
import { getVisitorNumber } from './utils/visitor.js'

const visitorFormatted = ref('0001')

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

  // Fetch visitor number in background
  getVisitorNumber().then(num => {
    if (num) visitorFormatted.value = num
  }).catch(() => {
    visitorFormatted.value = '0001'
  })
})
</script>

<style>
/* App wrapper styling */
.portfolio-root {
  position: relative;
  width: 100%;
}
</style>
