<template>
  <section class="section" id="skills" aria-labelledby="skills-heading">
    <div class="container">
      <div class="section-header">
        <span class="section-kicker">The roster</span>
        <h2 class="section-title" id="skills-heading">The team</h2>
      </div>

      <div class="skills-grid">
        <div
          v-for="group in skillGroups"
          :key="group.label"
          class="skill-group"
        >
          <h3 class="group-label">{{ group.label }}</h3>
          <div class="group-pills" role="list" :aria-label="`${group.label} skills`">
            <span
              v-for="skill in group.skills"
              :key="skill"
              class="pill"
              role="listitem"
            >{{ skill }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const skillGroups = [
  {
    label: 'Languages',
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C/C++', 'SQL']
  },
  {
    label: 'Frontend',
    skills: ['Next.js', 'React.js', 'Vue.js', 'Nuxt', 'MapLibre GL JS', 'HTML5', 'Tailwind CSS', 'Vue Router', 'Pinia']
  },
  {
    label: 'Backend & APIs',
    skills: ['FastAPI', 'Node.js', 'Flask', 'REST APIs', 'JSON / Structured Outputs', 'OAuth 2.0', 'Auth0']
  },
  {
    label: 'Generative AI & ML',
    skills: [
      'LLM APIs (Gemini, OpenAI-compatible)',
      'Prompt-driven pipelines',
      'PyTorch',
      'XGBoost',
      'scikit-learn',
      'Hugging Face',
      'Pandas',
      'NumPy',
      'Reinforcement Learning'
    ]
  },
  {
    label: 'Databases',
    skills: ['MySQL', 'SQLite', 'Firebase Firestore', 'PostgreSQL']
  },
  {
    label: 'Cloud & Infrastructure',
    skills: ['Google Cloud Platform', 'Docker', 'Render', 'Vercel']
  },
  {
    label: 'Developer Tools',
    skills: ['Git', 'GitHub', 'Postman', 'Vite']
  },
  {
    label: 'UI/UX Designing',
    skills: ['Blender', 'UI/UX Design', 'Figma', 'Wireframing', 'Prototyping', 'Design Systems']
  },
  {
    label: 'Core CS',
    skills: ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'Probability & Statistics']
  }
]
</script>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  background-color: var(--border);
  box-shadow: var(--shadow);
}

.skill-group {
  background-color: var(--card-bg);
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: background-color 0.2s ease;
}

.skill-group:hover {
  background-color: var(--card-hover-bg);
}

.group-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-subtle);
  transition: color 0.2s ease;
}

.skill-group:hover .group-label {
  color: var(--accent);
}

.group-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.pill {
  font-size: 13px;
  font-weight: 400;
  padding: 5px 12px;
  background-color: var(--pill-bg);
  color: var(--pill-text);
  border: 1px solid var(--border);
  border-radius: 2px;
  transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
}

.pill:hover {
  border-color: var(--accent);
  color: var(--text);
  background-color: var(--tag-bg);
}

@media (max-width: 960px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .skill-group:last-child:nth-child(odd) {
    grid-column: span 2;
  }
}

@media (max-width: 600px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
  .skill-group:last-child:nth-child(odd) {
    grid-column: span 1;
  }
  .skill-group {
    padding: 20px 16px;
  }
}
</style>
