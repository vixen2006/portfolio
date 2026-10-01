<template>
  <div class="court-divider" aria-hidden="true">
    <div class="divider-track">
      <div class="divider-line"></div>
      <div class="divider-ball" :class="{ animated: !prefersReducedMotion }">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5.5" fill="var(--accent)" stroke="var(--bg)" stroke-width="0.5"/>
          <path d="M2.5 3.5 Q6 2 9.5 3.5 Q11 6 9.5 8.5 Q6 10 2.5 8.5 Q1 6 2.5 3.5Z" fill="none" stroke="var(--bg)" stroke-width="0.8" stroke-opacity="0.4"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const prefersReducedMotion = ref(false)

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})
</script>

<style scoped>
.court-divider {
  padding: 0;
  overflow: hidden;
}

.divider-track {
  position: relative;
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 clamp(20px, 4vw, 48px);
  height: 40px;
  display: flex;
  align-items: center;
}

.divider-line {
  width: 100%;
  height: 1px;
  background-image: repeating-linear-gradient(
    to right,
    var(--border) 0,
    var(--border) 8px,
    transparent 8px,
    transparent 16px
  );
}

.divider-ball {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.divider-ball.animated {
  animation: ball-travel 8s linear infinite;
}

@keyframes ball-travel {
  0% {
    left: 40px;
    transform: translateY(-50%) rotate(0deg);
  }
  100% {
    left: calc(100% - 40px);
    transform: translateY(-50%) rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .divider-ball {
    animation: none !important;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

@media (max-width: 768px) {
  .divider-track {
    padding: 0 20px;
  }
}

@media (max-width: 480px) {
  .divider-track {
    padding: 0 16px;
  }
}
</style>
