<template>
  <section id="hero" aria-labelledby="hero-title">
    <div class="rv in">
      <h1 class="name" id="nm" :class="{ alt: isAlt }">
        <span class="n a">Vaishnavi<br /><em>Trivedi</em></span>
        <span class="n b">VIXXEN</span>
      </h1>
    </div>
    <p class="sub rv">Serving fast systems with precision.</p>
    <div class="open rv">
      <span><i></i>Open to work</span>
    </div>
    <div class="hint k" aria-hidden="true">Scroll</div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isAlt = ref(false)
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    isAlt.value = !isAlt.value
  }, 3400)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
