<template>
  <div class="scoreboard" role="region" aria-label="Stats scoreboard">
    <div class="scoreboard-cell">
      <span class="cell-value font-editorial">3</span>
      <span class="cell-label">Sets Won</span>
    </div>
    <div class="scoreboard-cell">
      <span class="cell-value font-editorial">4</span>
      <span class="cell-label">Aces (Achievements)</span>
    </div>
    <div class="scoreboard-cell">
      <span class="cell-value font-editorial">1<span class="cell-sup">st</span></span>
      <span class="cell-label">Rank</span>
      <span class="cell-sub">Cryptoforge</span>
    </div>
    <div class="scoreboard-cell timer-cell">
      <span class="cell-value font-technical timer-value" aria-live="polite" aria-label="Time on court">{{ formattedTime }}</span>
      <span class="cell-label">On Court Since</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const seconds = ref(0)
let intervalId = null

const formattedTime = computed(() => {
  const m = Math.floor(seconds.value / 60).toString().padStart(2, '0')
  const s = (seconds.value % 60).toString().padStart(2, '0')
  return `${m}:${s}`
})

onMounted(() => {
  intervalId = setInterval(() => {
    seconds.value++
  }, 1000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
.scoreboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--border);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 48px;
  background-color: var(--scoreboard-bg);
}

.scoreboard-cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 28px;
  border-right: 1px solid var(--border);
  position: relative;
}

.scoreboard-cell:last-child {
  border-right: none;
}

.cell-value {
  font-size: clamp(36px, 4vw, 52px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--text);
  margin-bottom: 8px;
}

.cell-sup {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 18px;
  font-weight: 600;
  vertical-align: super;
  letter-spacing: 0;
  color: var(--accent);
}

.cell-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-subtle);
}

.cell-sub {
  font-size: 11px;
  font-weight: 500;
  color: var(--accent);
  margin-top: 4px;
  letter-spacing: 0.04em;
}

.timer-cell .cell-value {
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
  font-size: clamp(28px, 3.5vw, 44px);
  color: var(--accent);
  font-weight: 600;
}

/* Accent bar at top */
.scoreboard-cell::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: transparent;
  transition: background-color 0.3s ease;
}

.timer-cell::before {
  background-color: var(--accent);
}

@media (max-width: 768px) {
  .scoreboard {
    grid-template-columns: repeat(2, 1fr);
  }
  .scoreboard-cell:nth-child(2) {
    border-right: none;
  }
  .scoreboard-cell:nth-child(3),
  .scoreboard-cell:nth-child(4) {
    border-top: 1px solid var(--border);
  }
  .scoreboard-cell:nth-child(4) {
    border-right: none;
  }
  .scoreboard-cell {
    padding: 20px 20px;
  }
}

@media (max-width: 480px) {
  .scoreboard {
    grid-template-columns: repeat(2, 1fr);
  }
  .scoreboard-cell {
    padding: 16px;
  }
  .cell-value {
    font-size: 32px;
  }
}
</style>
