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
          v-if="project.githubUrl && project.githubUrl !== '#'"
          :href="project.githubUrl"
          class="btn-outline"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`View ${project.title} source code on GitHub`"
        >
          GitHub ↗
        </a>
        <a
          v-if="project.demoUrl"
          :href="project.demoUrl"
          class="btn-outline btn-demo"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Watch ${project.title} demo video`"
        >
          <span class="play-icon" aria-hidden="true">▶</span> Demo Video
        </a>
        <a
          v-if="project.apkUrl"
          :href="project.apkUrl"
          class="btn-outline btn-apk"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Download ${project.title} APK`"
        >
          APK v0.1.0 ↗
        </a>
        <a
          v-if="project.liveUrl && project.liveUrl !== '#'"
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
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
  cursor: none;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.project-card.card-hovered {
  transform: translateY(-4px);
  border-color: var(--border-hover);
  box-shadow: var(--shadow-hover);
  background-color: var(--card-hover-bg);
}

.card-inner {
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  gap: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.card-title {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--text);
  margin-bottom: 4px;
}

.card-subtitle {
  font-size: 11px;
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
  margin-top: 2px;
}

.card-description {
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--text-muted);
  flex: 1;
  min-height: 68px;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.card-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding-top: 4px;
}

.btn-demo {
  background-color: var(--text);
  color: var(--bg);
  border-color: var(--text);
}

.btn-demo:hover {
  background-color: var(--accent);
  border-color: var(--accent);
  color: #0c120a;
}

.btn-apk {
  border-color: var(--accent);
  color: var(--text);
}

.btn-apk:hover {
  background-color: var(--tag-bg);
  border-color: var(--accent);
}

.play-icon {
  font-size: 10px;
  margin-right: 2px;
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
