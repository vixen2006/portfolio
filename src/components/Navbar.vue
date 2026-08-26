<template>
  <nav class="navbar" :class="{ 'nav-scrolled': isScrolled }" role="navigation" aria-label="Main navigation">
    <div class="nav-inner">
      <!-- Brand -->
      <a href="#" class="nav-brand font-editorial" aria-label="Vaishnavi Trivedi — Home">
        VIXEN<span class="brand-dot">.</span>
      </a>

      <!-- Desktop Links -->
      <ul class="nav-links" role="list">
        <li><a href="#projects" class="nav-link" @click="closeMenu">Projects</a></li>
        <li><a href="#experience" class="nav-link" @click="closeMenu">Experience</a></li>
        <li><a href="#skills" class="nav-link" @click="closeMenu">The team</a></li>
        <li><a href="#trophy" class="nav-link" @click="closeMenu">Trophy cabinet</a></li>
      </ul>

      <div class="nav-right">
        <!-- Theme Toggle -->
        <button
          class="theme-toggle"
          @click="$emit('toggle-theme')"
          :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          :aria-pressed="isDark"
        >
          <span class="theme-icon">
            <svg v-if="!isDark" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="3.5" stroke="currentColor" stroke-width="1.3"/>
              <line x1="8" y1="1" x2="8" y2="2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <line x1="8" y1="13.5" x2="8" y2="15" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <line x1="1" y1="8" x2="2.5" y2="8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <line x1="13.5" y1="8" x2="15" y2="8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <line x1="3.05" y1="3.05" x2="4.11" y2="4.11" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <line x1="11.89" y1="11.89" x2="12.95" y2="12.95" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <line x1="12.95" y1="3.05" x2="11.89" y2="4.11" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <line x1="4.11" y1="11.89" x2="3.05" y2="12.95" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M13.5 8.5A5.5 5.5 0 1 1 7.5 2.5a4.5 4.5 0 0 0 6 6Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="theme-label">{{ isDark ? 'Light' : 'Dark' }}</span>
        </button>

        <!-- Mobile Hamburger -->
        <button
          class="hamburger"
          @click="toggleMenu"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <span class="ham-line" :class="{ open: menuOpen }"></span>
          <span class="ham-line" :class="{ open: menuOpen }"></span>
          <span class="ham-line" :class="{ open: menuOpen }"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="mobile-menu" :class="{ 'menu-open': menuOpen }" role="dialog" aria-label="Navigation menu">
      <ul role="list">
        <li><a href="#projects" class="mobile-nav-link" @click="closeMenu">Projects</a></li>
        <li><a href="#experience" class="mobile-nav-link" @click="closeMenu">Experience</a></li>
        <li><a href="#skills" class="mobile-nav-link" @click="closeMenu">The team</a></li>
        <li><a href="#trophy" class="mobile-nav-link" @click="closeMenu">Trophy cabinet</a></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isDark: Boolean
})

const emit = defineEmits(['toggle-theme'])

const isScrolled = ref(false)
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function onScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: var(--bg-nav);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.navbar.nav-scrolled {
  border-bottom-color: var(--border);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  height: var(--nav-height);
}

.nav-brand {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text);
  line-height: 1;
  transition: opacity 0.2s ease;
}

.nav-brand:hover {
  opacity: 0.75;
}

.brand-dot {
  color: var(--accent);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 36px;
  list-style: none;
}

.nav-link {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--text-muted);
  transition: color 0.2s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--accent);
  transition: width 0.2s ease;
}

.nav-link:hover {
  color: var(--text);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 2px;
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  color: var(--text);
  border-color: var(--accent);
}

.theme-icon {
  display: flex;
  align-items: center;
}

.theme-label {
  text-transform: uppercase;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  width: 32px;
  padding: 4px;
  background: transparent;
  border: none;
}

.ham-line {
  display: block;
  width: 22px;
  height: 1.5px;
  background-color: var(--text);
  transition: transform 0.25s ease, opacity 0.25s ease;
  transform-origin: center;
}

.ham-line.open:nth-child(1) {
  transform: translateY(6.5px) rotate(45deg);
}

.ham-line.open:nth-child(2) {
  opacity: 0;
}

.ham-line.open:nth-child(3) {
  transform: translateY(-6.5px) rotate(-45deg);
}

/* Mobile Menu */
.mobile-menu {
  display: none;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.35s ease;
  border-top: 1px solid transparent;
}

.mobile-menu.menu-open {
  max-height: 300px;
  border-top-color: var(--border);
}

.mobile-menu ul {
  list-style: none;
  padding: 16px 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-nav-link {
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-muted);
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
  transition: color 0.2s ease;
}

.mobile-nav-link:hover {
  color: var(--text);
}

@media (max-width: 768px) {
  .nav-inner {
    padding: 0 20px;
  }

  .nav-links {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .mobile-menu {
    display: block;
  }
}

@media (max-width: 480px) {
  .nav-inner {
    padding: 0 16px;
  }

  .theme-label {
    display: none;
  }
}
</style>
