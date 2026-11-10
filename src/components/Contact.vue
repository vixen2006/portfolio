<template>
  <section id="contact" class="ct" aria-labelledby="contact-heading">
    <div class="k rv">06 / Contact</div>
    <h2 class="rv" id="contact-heading">Let’s build something fast.</h2>
    <div class="ln rv">
      <a
        v-for="link in contactLinks"
        :key="link.name"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ link.name }}
      </a>
    </div>
    <small class="k rv">
      Nothing lasts, yet here I am pretending…
    </small>
  </section>
</template>

<script setup>

const contactLinks = [
  { name: 'GitHub', url: 'https://github.com/vixen2006' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vaishnavi-trivedi-ab8b3434a/' },
  { name: 'X', url: 'https://x.com/nav_trivedi' },
  { name: 'LeetCode', url: 'https://leetcode.com/u/vixen2006/' },
  { name: 'Codeforces', url: 'https://codeforces.com/profile/VIXXENN' },
  { name: 'Email', url: 'mailto:vixen2006triv@gmail.com' }
]
</script>
