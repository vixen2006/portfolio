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
    githubUrl: '#',
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
  gap: 20px;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
