<template>
  <section class="section" id="trophy" aria-labelledby="trophy-heading">
    <div class="container">
      <div class="section-header">
        <span class="section-kicker">Match point</span>
        <h2 class="section-title" id="trophy-heading">Trophy cabinet</h2>
      </div>

      <ol class="trophy-list" aria-label="Achievements and awards">
        <li
          v-for="(item, index) in trophies"
          :key="index"
          class="trophy-item"
        >
          <div class="trophy-rank font-editorial" aria-hidden="true">
            {{ String(index + 1).padStart(2, '0') }}
          </div>
          <div class="trophy-body">
            <h3 class="trophy-title">{{ item.title }}</h3>
            <p class="trophy-sub">{{ item.subtitle }}</p>
          </div>
          <div class="trophy-badge">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 2l2.09 4.26L17 7.27l-3.5 3.41L14.18 16 10 13.77 5.82 16l1.68-5.32L4 7.27l4.91-.71L10 2z" fill="var(--accent)" stroke="var(--accent)" stroke-width="0.5" stroke-linejoin="round"/>
            </svg>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
const trophies = [
  {
    title: 'Winners — SIH 2026 Internal College Round',
    subtitle: 'Selected for National Final Submissions'
  },
  {
    title: '1st place — DTU Cryptoforge Invictus 2026',
    subtitle: 'Championship'
  },
  {
    title: '3rd place — IIT Roorkee MarketSphere',
    subtitle: 'Out of 800+ teams'
  },
  {
    title: 'Top 20 finalist — IIT Roorkee Ideastorm & PRODUCATHON',
    subtitle: 'Out of 800+ teams'
  },
  {
    title: 'Junior Tech Team Member — Namespace BPIT',
    subtitle: 'Led problem-solving sessions for 100+ students'
  }
]
</script>

<style scoped>
.trophy-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.trophy-item {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 28px 32px;
  border-bottom: 1px solid var(--border);
  background-color: var(--card-bg);
  transition: background-color 0.2s ease;
  position: relative;
}

.trophy-item:last-child {
  border-bottom: none;
}

.trophy-item:hover {
  background-color: var(--card-hover-bg);
}

/* Accent line on left on hover */
.trophy-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--accent);
  transform: scaleY(0);
  transform-origin: center;
  transition: transform 0.25s ease;
}

.trophy-item:hover::before {
  transform: scaleY(1);
}

.trophy-rank {
  font-size: 42px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--border);
  flex-shrink: 0;
  width: 60px;
  transition: color 0.2s ease;
}

.trophy-item:hover .trophy-rank {
  color: var(--text-subtle);
}

.trophy-body {
  flex: 1;
}

.trophy-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
  line-height: 1.3;
  margin-bottom: 4px;
}

.trophy-sub {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-subtle);
}

.trophy-badge {
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.trophy-item:hover .trophy-badge {
  opacity: 1;
}

@media (max-width: 768px) {
  .trophy-item {
    padding: 20px;
    gap: 16px;
  }
  .trophy-rank {
    font-size: 28px;
    width: 40px;
  }
  .trophy-title {
    font-size: 15px;
  }
  .trophy-badge {
    display: none;
  }
}

@media (max-width: 480px) {
  .trophy-item {
    padding: 16px;
    gap: 12px;
  }
  .trophy-rank {
    display: none;
  }
}
</style>
