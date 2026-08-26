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
  border-radius: 3px;
  overflow: hidden;
  background-color: var(--card-bg);
  transition: border-color 0.2s ease;
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
  max-height: 600px;
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
