<template>
  <section id="work" aria-labelledby="work-heading">
    <div class="k rv">02 / The baseline</div>
    <h2 class="rv" id="work-heading">Things I’ve built.</h2>
    <div id="pw">
      <div
        v-for="(project, i) in projects"
        :key="project.title"
        class="row rv"
      >
        <div class="n">{{ String(i + 1).padStart(2, '0') }}</div>
        <div>
          <h3>{{ project.title }}</h3>
          <div class="st">{{ project.subtitle }}</div>
          <p>{{ project.description }}</p>
          <div class="lk">
            <a
              v-for="link in project.links"
              :key="link.name"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link.name }}
            </a>
          </div>
        </div>
        <div class="tg">
          <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    title: 'Compass',
    subtitle: 'Autonomous Recursive Creator Intelligence System',
    description: 'Autonomous recursive intelligence system for YouTube creators. Distributes strategic thinking across three cooperating agents (Creator Memory Brain, Research Monitor, Strategist) with Bayesian confidence learning, 3-tier LLM failover (NIM → Gemini → Fallback), anti-hallucination reality checks, and an omnipresent AI strategy consultant co-pilot.',
    tags: ['Python 3.11+', 'React 19', 'Multi-Agent', 'NVIDIA NIM', 'Gemini', 'Bayesian ML'],
    links: [
      { name: 'GitHub', url: 'https://github.com/vixen2006/COMPASS' }
    ]
  },
  {
    title: 'AgniDrishti',
    subtitle: 'Thermal Intelligence, SIH 2026 / NTRO',
    description: 'Satellite thermal intelligence platform classifying 5.9M+ VIIRS observations into 3,074 sources with 99.6% accuracy. Async FastAPI backend, NASA FIRMS pipeline and an AI-assisted Flutter field client with real-time alert triage.',
    tags: ['FastAPI', 'Flutter', 'Python', 'NASA FIRMS', 'GIS / OSM'],
    links: [
      { name: 'GitHub', url: 'https://github.com/vixen2006/AgniDrishti-Mobile' },
      { name: 'Demo', url: 'https://youtu.be/t2WzEcauQUo' },
      { name: 'APK', url: 'https://github.com/vixen2006/AgniDrishti-Mobile/releases/tag/v0.1.0' }
    ]
  },
  {
    title: 'CVIA Workbench',
    subtitle: 'CV Integrity Assurance, SIH 2026 / MoD',
    description: 'Air-gapped CV integrity framework for Indian Army / MoD to audit datasets, inspect ONNX/TorchScript models and verify Ed25519 provenance. Designed the UI/UX and built the async backend.',
    tags: ['FastAPI', 'Python', 'Ed25519', 'Computer Vision', 'UI/UX'],
    links: [
      { name: 'GitHub', url: 'https://github.com/vixen2006/CVIA-Workbench' },
      { name: 'Demo', url: 'https://youtu.be/c-mmrIlNcXI' }
    ]
  },
  {
    title: 'NEXUS',
    subtitle: 'FinTech trading platform',
    description: 'Live trade execution, portfolio tracking and real-time P&L across 70+ stocks, 44 mutual funds and 500+ cryptos via Binance. Async pipeline refreshes data every 3–10 seconds; Auth0 handles role-based access.',
    tags: ['FastAPI', 'SQLite', 'Auth0'],
    links: [
      { name: 'GitHub', url: 'https://github.com/vixen2006/NEXUS' },
      { name: 'Live', url: 'https://nexus-mu-rust.vercel.app/' }
    ]
  },
  {
    title: 'SecureNet',
    subtitle: 'RL-based SOC Simulator',
    description: 'Reinforcement-learning SOC simulator with a state-action-reward framework modelling incident response on a network with evolving attacks. Exposes /reset, /step and /state endpoints.',
    tags: ['FastAPI', 'Reinforcement Learning'],
    links: [
      { name: 'GitHub', url: 'https://github.com/vixen2006/SECURE-NET---RL-PROJECT' }
    ]
  },
  {
    title: 'ReliefOS',
    subtitle: 'Crisis Response Platform',
    description: 'Coordinates volunteers, resources and real-time emergency status. Normalized PostgreSQL schemas and role-based access keep admins, volunteers and beneficiaries separated at scale.',
    tags: ['React.js', 'Node.js', 'PostgreSQL'],
    links: [
      { name: 'GitHub', url: 'https://github.com/Sparsh712/ReliefOS' },
      { name: 'Live', url: 'https://relief-os.vercel.app/' }
    ]
  },
  {
    title: 'CampusBazaar',
    subtitle: 'Student marketplace platform',
    description: 'Peer-to-peer marketplace for students to buy and sell on campus, with listings, search and a clean responsive UI.',
    tags: ['React.js', 'Node.js'],
    links: [
      { name: 'GitHub', url: 'https://github.com/Sparsh712/CampusBazaar' },
      { name: 'Live', url: 'https://campus-bazaar-steel.vercel.app/' }
    ]
  }
]
</script>
