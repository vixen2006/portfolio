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
    skills: ['Java', 'C', 'C++', 'Python', 'JavaScript', 'SQL']
  },
  {
    label: 'Frontend',
    skills: ['React.js', 'Vue.js', 'Nuxt', 'Vue Router', 'Pinia', 'HTML', 'Tailwind CSS']
  },
  {
    label: 'Backend',
    skills: ['Node.js (Express)', 'FastAPI', 'REST APIs']
  },
  {
    label: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'SQLite']
  },
  {
    label: 'Tools',
    skills: ['Git', 'GitHub', 'Docker', 'Postman', 'Render']
  },
  {
    label: 'Core Competencies',
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
  border-radius: 3px;
  overflow: hidden;
  background-color: var(--border);
}

.skill-group {
  background-color: var(--card-bg);
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.group-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-subtle);
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
  transition: border-color 0.2s ease, color 0.2s ease;
}

.pill:hover {
  border-color: var(--accent);
  color: var(--text);
}

@media (max-width: 960px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
  .skill-group {
    padding: 20px 16px;
  }
}
</style>
