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
      'Architected and engineered a full-stack LLM evaluation platform for systematic assessment of frontier AI models across dimensions of reasoning, reliability, robustness, and safety.',
      'Built an asynchronous FastAPI + SQLAlchemy backend featuring multi-provider LLM integrations, automated LLM-as-a-judge evaluation pipelines, configurable scoring frameworks, persistent evaluation schemas, and human evaluation support.',
      'Developed a high-performance Vue 3 / Vite frontend enabling benchmark configuration, side-by-side model comparison, dynamic rankings, and comprehensive visualization of evaluation diagnostics.',
      'Conducted quantitative research on organizational resource-demand patterns using time-series analysis, applying Lomb–Scargle periodograms, autocorrelation analysis, deseasonalization, stratified statistical modeling, and Welch’s t-tests to longitudinal institutional data.',
      'Co-authored research manuscripts combining organizational entrainment theory and statistical time-series methods to investigate recurring temporal patterns and disruption carryover cascades in a government R&D environment (written and submitted for publication).'
    ],
    papersLabel: 'Authored Research Papers · Submitted for Publication',
    papers: [
      {
        title: 'Paper 1: Full-Stack LLM Evaluation Platform & Reliability Benchmarking',
        filename: 'paper_1_drdo.pdf',
        url: 'https://drive.google.com/file/d/1z2JnUOZIsa_W7SPbIV2T27sVzT4L7qrZ/view',
        repoUrl: 'https://github.com/vixen2006/ARSI-'
      },
      {
        title: 'Paper 2: Institutional Transport-Demand Analytics & Temporal Entrainment',
        filename: 'transport_paper_drdo.pdf',
        url: 'https://drive.google.com/file/d/11_XTmjDaoejK80t4pZAutCUjO4wMG17a/view'
      }
    ],
    tags: ['Vue 3', 'FastAPI', 'SQLAlchemy', 'LLM Evaluation', 'Time-Series Analysis', 'Statistical Modeling'],
    defaultOpen: false
  },
  {
    id: 'acolyte',
    gameLabel: 'Game 1',
    company: 'Acolyte Living',
    role: 'Frontend / Software Engineering Intern',
    location: null,
    date: 'Apr 2026 – Jun 2026',
    liveUrl: 'https://acolyte-living-interactive-map.vercel.app/',
    liveLabel: 'Live 3D Explorer',
    paragraphs: [
      'Architected and engineered the AcolyteLiving Interactive 3D Student Housing Explorer (Next.js 16 App Router, React 19, MapLibre GL JS), enabling global-to-local exploration from an interactive 2D world view down to 3D extruded building models across university markets.',
      'Developed high-performance React + TypeScript accommodation explorer web applications with Vite, structuring primary TypeScript data layers, raw JSON schemas, and smooth initial loading screen fade-out transitions.',
      'Engineered student housing discovery landing pages and geospatial data pipelines across international markets with concurrent data-fetching pipelines, eliminating sequential API bottlenecks.'
    ],
    tags: ['Next.js', 'React 19', 'TypeScript', 'Vite', 'MapLibre GL JS', 'Tailwind CSS', 'Geospatial Search'],
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
