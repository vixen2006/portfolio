<template>
  <section class="section" id="projects" aria-labelledby="projects-heading">
    <div class="container">
      <div class="section-header">
        <span class="section-kicker">The baseline</span>
        <h2 class="section-title" id="projects-heading">Projects</h2>
      </div>

      <div class="projects-grid">
        <ProjectCard
          v-for="(project, i) in projects"
          :key="project.title"
          :project="project"
          :index="String(i + 1).padStart(2, '0')"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import ProjectCard from './ProjectCard.vue'

const projects = [
  {
    title: 'AgniDrishti',
    subtitle: 'Thermal Intelligence (SIH 2026 / NTRO)',
    description: 'Satellite thermal intelligence platform classifying 5.9M+ VIIRS observations into 3,074 sources with 99.6% accuracy. Engineered the asynchronous FastAPI backend, NASA FIRMS data pipeline, and real-time alert triage with OSM GIS layers.',
    tags: ['FastAPI', 'Python', 'NASA FIRMS', 'Machine Learning', 'GIS / OSM'],
    githubUrl: 'https://github.com/vixen2006/AgniDrishti',
    demoUrl: 'https://youtu.be/t2WzEcauQUo',
    liveUrl: '#'
  },
  {
    title: 'CVIA Workbench',
    subtitle: 'CV Integrity Assurance (SIH 2026 / MoD)',
    description: 'Air-gapped CV integrity assurance framework for Indian Army / MoD to audit datasets, inspect ONNX/TorchScript models, and verify Ed25519 provenance. Architected the UI/UX design and built the asynchronous FastAPI backend.',
    tags: ['FastAPI', 'Python', 'Ed25519', 'Computer Vision', 'UI/UX Design'],
    githubUrl: 'https://github.com/vixen2006/CVIA-Workbench',
    demoUrl: 'https://youtu.be/c-mmrIlNcXI',
    liveUrl: '#'
  },
  {
    title: 'NEXUS',
    subtitle: 'FinTech trading platform',
    description: 'A FinTech trading platform with RESTful APIs for live trade execution, portfolio tracking, and real-time P&L across 70+ stocks, 44 mutual funds, and 500+ cryptocurrencies via Binance. An async event-driven pipeline refreshes market data every 3–10 seconds, and Auth0 handles role-based access.',
    tags: ['FastAPI', 'SQLite', 'Auth0'],
    githubUrl: 'https://github.com/vixen2006/NEXUS',
    liveUrl: 'https://nexus-mu-rust.vercel.app/'
  },
  {
    title: 'SecureNet',
    subtitle: 'RL-based SOC Simulator',
    description: 'A reinforcement-learning SOC simulator built around a state-action-reward framework, modeling real incident-response workflows on a simulated network with evolving attack vectors. Exposes /reset, /step and /state endpoints for step-by-step agent testing.',
    tags: ['FastAPI', 'Reinforcement Learning'],
    githubUrl: 'https://github.com/vixen2006/SECURE-NET---RL-PROJECT',
    liveUrl: '#'
  },
  {
    title: 'ReliefOS',
    subtitle: 'Crisis Response Platform',
    description: 'A crisis-response platform coordinating volunteers, resources, and real-time emergency status. Normalized PostgreSQL schemas and role-based access keep admins, volunteers, and beneficiaries cleanly separated at scale.',
    tags: ['React.js', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/Sparsh712/ReliefOS',
    liveUrl: 'https://relief-os.vercel.app/'
  },
  {
    title: 'CampusBazaar',
    subtitle: 'Student marketplace platform',
    description: 'A peer-to-peer marketplace built for students to buy and sell within their campus community. Features product listings, search, and a clean responsive UI optimized for the college ecosystem.',
    tags: ['React.js', 'Node.js'],
    githubUrl: 'https://github.com/Sparsh712/CampusBazaar',
    liveUrl: 'https://campus-bazaar-steel.vercel.app/'
  }
]
</script>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

@media (max-width: 860px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
