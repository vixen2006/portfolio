<template>
  <header class="hero" id="home">
    <div class="container">
      <!-- Editorial opening line -->
      <p class="hero-prelude font-editorial">Nothing lasts, yet here I am pretending …</p>

      <!-- Name -->
      <h1 class="hero-name font-editorial">
        <span class="hero-name-line">Vaishnavi</span>
        <span class="hero-name-line">Trivedi</span>
      </h1>

      <!-- Role + Status -->
      <div class="hero-role-row">
        <span class="hero-role font-technical">Software Engineer</span>
        <span class="status-badge">
          <span class="status-dot" aria-hidden="true"></span>
          Open to work
        </span>
      </div>

      <!-- Tagline -->
      <p class="hero-tagline">
        Building fast, reliable systems — from real-time trading engines to reinforcement-learning simulators — and figuring out where they'll break before anyone else does.
      </p>

      <!-- Scoreboard -->
      <Scoreboard />

      <!-- CTA + Socials -->
      <div class="hero-actions">
        <a
          href="mailto:vixen2006triv@gmail.com"
          class="btn-primary"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Send email to Vaishnavi Trivedi"
        >
          Get in touch ↗
        </a>
      </div>

      <!-- Social Links -->
      <div class="hero-socials" role="list" aria-label="Social and coding profiles">
        <a
          v-for="link in socialLinks"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
          :aria-label="link.label"
          role="listitem"
        >
          <span v-html="link.icon" class="social-icon" aria-hidden="true"></span>
          <span class="social-label">{{ link.label }}</span>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import Scoreboard from './Scoreboard.vue'

defineProps({ isDark: Boolean })

const socialLinks = [
  {
    label: 'GitHub',
    url: 'https://github.com/vixen2006',
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/></svg>`
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/vaishnavi-trivedi-ab8b3434a/',
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z"/></svg>`
  },
  {
    label: 'X',
    url: 'https://x.com/nav_trivedi',
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/></svg>`
  },
  {
    label: 'LeetCode',
    url: 'https://leetcode.com/u/vixen2006/',
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0Zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382H10.617Z"/></svg>`
  },
  {
    label: 'Codeforces',
    url: 'https://codeforces.com/profile/VIXXENN',
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3Zm9-4.5c.828 0 1.5.672 1.5 1.5V19.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V4.5C9 3.672 9.672 3 10.5 3h3Zm9 7.5c.828 0 1.5.672 1.5 1.5v9c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-9c0-.828.672-1.5 1.5-1.5h3Z"/></svg>`
  },
  {
    label: 'CodeChef',
    url: 'https://www.codechef.com/users/vixenn',
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.257.004C5.57.272.694 4.887.05 10.55c-.535 4.758 1.949 9.232 6.09 11.637a12.15 12.15 0 0 0 11.718.002c4.141-2.405 6.625-6.879 6.09-11.637C23.304 4.887 18.428.272 12.741.004a13.255 13.255 0 0 0-1.484 0zM12 3.5c2.21 0 4 1.903 4 4.25S14.21 12 12 12 8 10.097 8 7.75 9.79 3.5 12 3.5zm0 10c3.867 0 7 1.567 7 3.5v1c0 1.933-3.133 3.5-7 3.5s-7-1.567-7-3.5v-1c0-1.933 3.133-3.5 7-3.5z"/></svg>`
  },
  {
    label: 'Email',
    url: 'mailto:vixen2006triv@gmail.com',
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`
  }
]
</script>

<style scoped>
.hero {
  padding-top: calc(var(--nav-height) + 80px);
  padding-bottom: 80px;
}

.hero-prelude {
  font-size: 15px;
  font-style: italic;
  font-weight: 400;
  color: var(--clay);
  margin-bottom: 28px;
  letter-spacing: 0.01em;
}

.hero-name {
  font-size: clamp(72px, 12vw, 160px);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.04em;
  color: var(--text);
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
}

.hero-name-line {
  display: block;
}

.hero-role-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.hero-role {
  font-size: 18px;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.01em;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 5px 12px;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--text-muted);
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--accent);
  flex-shrink: 0;
  animation: pulse-dot 2.5s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.8); }
}

@media (prefers-reduced-motion: reduce) {
  .status-dot { animation: none; }
}

.hero-tagline {
  font-size: clamp(17px, 2.2vw, 22px);
  font-weight: 400;
  line-height: 1.55;
  color: var(--text);
  max-width: 680px;
  margin-bottom: 20px;
  letter-spacing: -0.01em;
}

.hero-meta {
  font-size: 13px;
  font-weight: 400;
  color: var(--text-subtle);
  letter-spacing: 0.02em;
  margin-bottom: 48px;
}

.hero-actions {
  margin-bottom: 40px;
}

/* Social Links */
.hero-socials {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 6px 12px;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: 2px;
  transition: all 0.2s ease;
}

.social-link:hover {
  color: var(--text);
  border-color: var(--accent);
}

.social-icon {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .hero {
    padding-top: calc(var(--nav-height) + 48px);
    padding-bottom: 56px;
  }
  .hero-name {
    font-size: clamp(56px, 14vw, 120px);
    margin-bottom: 24px;
  }
  .hero-tagline {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .hero-name {
    font-size: clamp(48px, 16vw, 96px);
  }
  .hero-meta {
    font-size: 12px;
  }
}
</style>
