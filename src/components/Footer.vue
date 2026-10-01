<template>
  <footer class="footer" role="contentinfo">
    <div class="footer-inner">
      <p class="footer-credit">
        Built by <span class="credit-name font-editorial">Vaishnavi Trivedi</span>
        <span class="footer-separator" aria-hidden="true">—</span>
        <span class="footer-credo font-editorial">I learn by building.</span>
      </p>
      <nav class="footer-nav" aria-label="Footer social links">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
          :aria-label="link.label"
        >{{ link.label }}</a>
      </nav>
    </div>
  </footer>
</template>

<script setup>
const links = [
  { label: 'GitHub', url: 'https://github.com/vixen2006' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/vaishnavi-trivedi-ab8b3434a/' },
  { label: 'X', url: 'https://x.com/nav_trivedi' }
]
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding: 28px 0;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.footer-credit {
  font-size: 13px;
  color: var(--text-muted);
}

.credit-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
}

.footer-separator {
  margin: 0 8px;
  color: var(--text-subtle);
}

.footer-credo {
  font-style: italic;
  font-size: 13px;
  color: var(--text-muted);
}

.footer-nav {
  display: flex;
  align-items: center;
  gap: 24px;
}

.footer-link {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--text);
}

@media (max-width: 480px) {
  .footer-inner {
    padding: 0 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .footer-nav {
    gap: 16px;
  }
}
</style>
