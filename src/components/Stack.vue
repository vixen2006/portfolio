<template>
  <section id="stack" aria-labelledby="stack-heading">
    <div class="k rv">04 / The roster</div>
    <h2 class="rv" id="stack-heading">Tools I reach for.</h2>
    <div id="sk">
      <div
        v-for="(skills, group) in stackData"
        :key="group"
        class="grp rv"
      >
        <h4>{{ group }}</h4>
        <div class="chips">
          <span v-for="skill in skills" :key="skill">{{ skill }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stackData = {
  'Languages': ['Python', 'Java', 'JavaScript', 'TypeScript', 'C/C++', 'SQL'],
  'Frontend': ['Next.js', 'React.js', 'Vue.js', 'Nuxt', 'MapLibre GL JS', 'HTML5', 'Tailwind CSS', 'Pinia'],
  'Backend & APIs': ['FastAPI', 'Node.js', 'Flask', 'REST APIs', 'OAuth 2.0', 'Auth0'],
  'GenAI & ML': ['LLM APIs', 'Prompt pipelines', 'PyTorch', 'XGBoost', 'scikit-learn', 'Hugging Face', 'Pandas', 'NumPy', 'Reinforcement Learning'],
  'Databases': ['MySQL', 'SQLite', 'Firestore', 'PostgreSQL'],
  'Cloud & Tools': ['GCP', 'Docker', 'Render', 'Vercel', 'Git', 'Postman', 'Vite'],
  'Design': ['Blender', 'Figma', 'Wireframing', 'Prototyping', 'Design Systems'],
  'Core CS': ['DSA', 'OOP', 'DBMS', 'OS', 'Networks', 'Probability & Stats']
}
</script>
