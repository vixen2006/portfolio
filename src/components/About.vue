<template>
  <section id="about" aria-labelledby="about-heading">
    <div class="k rv">01 / About</div>
    <h2 class="rv" id="about-heading">I learn by building.</h2>
    <p class="lead rv">
      Crafting fast, reliable systems, from satellite thermal intelligence and air-gapped CV integrity frameworks to real-time trading engines and full-stack LLM evaluation platforms, and uncovering where they break before anyone else does.
    </p>
    <div class="stats rv">
      <div>
        <b>4</b>
        <span>Sets won</span>
      </div>
      <div>
        <b>4</b>
        <span>Achievements</span>
      </div>
      <div>
        <b>1st</b>
        <span>SIH &amp; Cryptoforge</span>
      </div>
      <div>
        <b>{{ formattedTime }}</b>
        <span>On court since</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Starts at 191 seconds (03:11) and counts up gracefully
const totalSeconds = ref(191)
const formattedTime = ref('03:11')
let interval = null

function updateDisplay() {
  const m = Math.floor(totalSeconds.value / 60).toString().padStart(2, '0')
  const s = (totalSeconds.value % 60).toString().padStart(2, '0')
  formattedTime.value = `${m}:${s}`
}

onMounted(() => {
  updateDisplay()
  interval = setInterval(() => {
    totalSeconds.value++
    updateDisplay()
  }, 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>
