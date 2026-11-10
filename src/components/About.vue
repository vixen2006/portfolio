<template>
  <section id="about" aria-labelledby="about-heading">
    <div class="k rv">01 / About</div>
    <h2 class="rv" id="about-heading">I learn by building.</h2>
    <p class="lead rv">
      Hi, I’m Vaishnavi, a full-stack developer and designer who learns mostly by building things and then finding out exactly how they break. So far that’s a satellite thermal intelligence platform, an air-gapped framework that checks whether computer vision models can be trusted, a live trading engine, and an RL agent that defends a network from hackers.
    </p>
    <p class="lead rv">
      I love designing as much as I love building. A system that works but looks like an afterthought isn’t finished for me, so I care about how things feel as well as how fast they run. Lately I’ve been exploring agentic AI workflows, trying to get AI to do useful work on its own instead of just sounding smart. I’ve interned at DRDO and Acolyte Living, I win the occasional hackathon, and I’m always somewhere between “it works” and “it should look better.”
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
