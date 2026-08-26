<template>
  <section class="section" id="experience" aria-labelledby="experience-heading">
    <div class="container">
      <div class="section-header">
        <span class="section-kicker">The match</span>
        <h2 class="section-title" id="experience-heading">Experience</h2>
      </div>

      <div class="experience-list">
        <ExperienceCard
          v-for="exp in experiences"
          :key="exp.id"
          :exp="exp"
          :default-open="exp.defaultOpen"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import ExperienceCard from './ExperienceCard.vue'

const experiences = [
  {
    id: 'drdo',
    gameLabel: 'Game 2',
    company: 'DRDO',
    role: 'Student Researcher / Software Developer',
    location: 'Delhi, India',
    date: 'Jun 2026 – Jul 2026',
    paragraphs: [
      'Built ARSI, an LLM reliability benchmarking platform (Vue.js + FastAPI) evaluating 8 frontier LLMs across 5 reliability dimensions, with a deployment veto rule — basis of a paper titled "Autopsy of a Confident Machine: When Frontier LLMs Stop Performing and Start Failing."',
      'Co-authored a paper on institutional transport-demand analytics, applying periodogram and autocorrelation analysis to 2,900+ DRDO vehicle-requisition records to surface weekly demand cycles and schedule-disruption cascades.'
    ],
    tags: ['Vue.js', 'FastAPI', 'Data Analysis'],
    defaultOpen: true
  },
  {
    id: 'acolyte',
    gameLabel: 'Game 1',
    company: 'Acolyte Living',
    role: 'Tech Intern',
    location: null,
    date: 'Apr 2026 – Jun 2026',
    paragraphs: [
      'Developed a map-based property discovery platform with location-aware search, geospatial querying, and responsive landing pages for multiple country-specific markets.',
      'Engineered concurrent data-fetching pipelines for property search, eliminating sequential API bottlenecks and cutting response latency.'
    ],
    tags: ['Geospatial Search', 'Concurrency'],
    defaultOpen: false
  }
]
</script>

<style scoped>
.experience-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
