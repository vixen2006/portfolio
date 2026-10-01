<template>
  <article
    class="experience-card"
    :class="{ 'is-open': isOpen }"
  >
    <!-- Card Header (always visible, clickable) -->
    <button
      class="card-header"
      @click="isOpen = !isOpen"
      :aria-expanded="isOpen"
      :aria-controls="`exp-content-${exp.id}`"
      :id="`exp-btn-${exp.id}`"
    >
      <div class="header-left">
        <span class="game-label font-technical">{{ exp.gameLabel }}</span>
        <div class="header-main">
          <h3 class="company font-editorial">{{ exp.company }}</h3>
          <p class="role">{{ exp.role }}</p>
        </div>
      </div>

      <div class="header-right">
        <div class="header-meta">
          <span class="date">{{ exp.date }}</span>
          <span v-if="exp.location" class="location">{{ exp.location }}</span>
        </div>
        <div class="expand-icon" :class="{ rotated: isOpen }" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 6l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </button>

    <!-- Expandable Content -->
    <div
      :id="`exp-content-${exp.id}`"
      class="card-content"
      :class="{ 'content-open': isOpen }"
      role="region"
      :aria-labelledby="`exp-btn-${exp.id}`"
    >
      <div class="content-inner">
        <!-- Paragraphs -->
        <p
          v-for="(para, i) in exp.paragraphs"
          :key="i"
          class="content-para"
        >{{ para }}</p>

        <!-- Research Papers / Manuscripts -->
        <div v-if="exp.papers && exp.papers.length" class="content-papers">
          <div class="papers-label font-technical">{{ exp.papersLabel || 'Authored Research Papers · Submitted for Publication' }}</div>
          <div class="papers-grid" role="list">
            <div
              v-for="paper in exp.papers"
              :key="paper.title"
              class="paper-card"
              role="listitem"
            >
              <div class="paper-header-row">
                <div class="paper-pdf-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <div class="paper-info">
                  <span class="paper-title">{{ paper.title }}</span>
                  <span class="paper-filename font-technical">{{ paper.filename }}</span>
                </div>
              </div>

              <div class="paper-actions-row">
                <a
                  :href="paper.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="paper-btn"
                  :aria-label="`Read ${paper.title} PDF`"
                >
                  <span>PDF ↗</span>
                </a>
                <a
                  v-if="paper.repoUrl"
                  :href="paper.repoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="paper-btn paper-repo-btn"
                  :aria-label="`View source code repository for ${paper.title}`"
                >
                  <span>GitHub (ARSI) ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Link (e.g. Live 3D Explorer) -->
        <div v-if="exp.liveUrl" class="content-actions">
          <a
            :href="exp.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="exp-live-btn"
          >
            <span>{{ exp.liveLabel || 'Live Explorer' }} ↗</span>
          </a>
        </div>

        <!-- Tags -->
        <div class="content-tags" role="list" aria-label="Technologies used">
          <span
            v-for="tag in exp.tags"
            :key="tag"
            class="tag"
            role="listitem"
          >{{ tag }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  exp: {
    type: Object,
    required: true
  },
  defaultOpen: {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(props.defaultOpen)
</script>

<style scoped>
.experience-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background-color: var(--card-bg);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
}

.experience-card.is-open {
  border-color: var(--border-hover);
}

.card-header {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 28px 32px;
  gap: 20px;
  text-align: left;
  background: transparent;
  border: none;
  cursor: none;
  transition: background-color 0.2s ease;
}

.card-header:hover {
  background-color: var(--card-hover-bg);
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.game-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
}

.header-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.company {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.05;
  color: var(--text);
}

.role {
  font-size: 14px;
  font-weight: 400;
  color: var(--text-muted);
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  flex-shrink: 0;
}

.header-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.date {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-subtle);
  letter-spacing: 0.03em;
  white-space: nowrap;
}

.location {
  font-size: 11px;
  font-weight: 400;
  color: var(--text-subtle);
}

.expand-icon {
  color: var(--text-muted);
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
}

.expand-icon.rotated {
  transform: rotate(180deg);
}

/* Expandable content */
.card-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-content.content-open {
  max-height: 1200px;
}

.content-inner {
  padding: 0 32px 28px;
  border-top: 1px solid var(--border);
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.content-para {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-muted);
}

.content-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

/* Paper Link Cards */
.content-papers {
  margin: 6px 0 10px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.papers-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}

.papers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
}

.paper-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  background-color: var(--pill-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.paper-card:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
  box-shadow: 0 8px 24px rgba(85, 124, 54, 0.12);
}

.paper-header-row {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.paper-pdf-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: var(--tag-bg);
  color: var(--accent);
  border-radius: var(--radius-pill);
  flex-shrink: 0;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.paper-card:hover .paper-pdf-icon {
  background-color: var(--accent);
  color: #0c120a;
}

.paper-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.paper-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.35;
}

.paper-filename {
  font-size: 11px;
  color: var(--text-subtle);
  letter-spacing: 0.02em;
}

.paper-actions-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 50px;
}

.paper-btn {
  display: inline-flex;
  align-items: center;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border);
  background-color: var(--card-bg);
  color: var(--text);
  text-decoration: none;
  transition: all 0.2s ease;
}

.paper-btn:hover {
  border-color: var(--accent);
  color: var(--text);
  background-color: var(--tag-bg);
}

.paper-repo-btn {
  border-color: var(--accent);
  color: var(--accent);
}

.paper-repo-btn:hover {
  background-color: var(--accent);
  color: #0c120a;
}

.content-actions {
  display: flex;
  margin-top: 4px;
}

.exp-live-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 8px 18px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--accent);
  color: var(--text);
  background-color: var(--pill-bg);
  transition: all 0.2s ease;
  cursor: pointer;
}

.exp-live-btn:hover {
  background-color: var(--accent);
  color: #0c120a;
}

@media (max-width: 768px) {
  .card-header {
    padding: 20px;
    flex-wrap: wrap;
  }
  .company {
    font-size: 22px;
  }
  .header-right {
    align-items: flex-start;
  }
  .header-meta {
    align-items: flex-start;
  }
  .content-inner {
    padding: 0 20px 20px;
    padding-top: 20px;
  }
}
</style>
