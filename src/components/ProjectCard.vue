<template>
  <article
    class="project-card"
    :class="{ 'card-hovered': isHovered }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="card-inner">
      <!-- Header -->
      <div class="card-header">
        <div>
          <h3 class="card-title font-editorial">{{ project.title }}</h3>
          <p class="card-subtitle">{{ project.subtitle }}</p>
        </div>
        <div class="card-index font-technical" aria-hidden="true">{{ index }}</div>
      </div>

      <!-- Description -->
      <p class="card-description">{{ project.description }}</p>

      <!-- Tags -->
      <div class="card-tags" role="list" aria-label="Technologies used">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="tag"
          role="listitem"
        >{{ tag }}</span>
      </div>

      <!-- Actions -->
      <div class="card-actions">
        <a
          :href="project.githubUrl"
          class="btn-outline"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`View ${project.title} source code on GitHub`"
        >
          GitHub ↗
        </a>
        <a
          :href="project.liveUrl"
          class="btn-outline"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`View ${project.title} live demo`"
        >
          Live ↗
        </a>
      </div>
    </div>

    <!-- Accent corner -->
    <div class="card-accent-line" aria-hidden="true"></div>
  </article>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  project: {
    type: Object,
    required: true
  },
  index: {
    type: String,
    default: '01'
  }
})

const isHovered = ref(false)
</script>

<style scoped>
.project-card {
  position: relative;
  background-color: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 3px;
  overflow: hidden;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
  cursor: none;
}

.project-card.card-hovered {
  transform: translateY(-4px);
  border-color: var(--border-hover);
  box-shadow: var(--shadow-hover);
  background-color: var(--card-hover-bg);
}

.card-inner {
  padding: 32px 28px 28px;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.card-title {
  font-size: 26px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text);
  margin-bottom: 6px;
}

.card-subtitle {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-subtle);
}

.card-index {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--accent);
  flex-shrink: 0;
  margin-top: 4px;
}

.card-description {
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-muted);
  flex: 1;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.card-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

/* Accent line that glows on hover */
.card-accent-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.project-card.card-hovered .card-accent-line {
  transform: scaleX(1);
}
</style>
