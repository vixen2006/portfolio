<template>
  <header class="nav-container" :class="{ 'scrolled': isScrolled }">
    <nav class="navbar" role="navigation" aria-label="Main navigation">
      <!-- Left Pill: Brand (matching Reference Image 2 'the Grid') -->
      <a href="#" class="pill-badge brand-badge" aria-label="Vaishnavi Trivedi — Home">
        <span class="brand-logo font-editorial">VIXEN</span>
        <span class="brand-dot"></span>
      </a>

      <!-- Center Pill: Frosted Navigation Island -->
      <div class="pill-island nav-island">
        <ul class="nav-links" role="list">
          <li><a href="#projects" class="nav-link" :class="{ active: activeSection === 'projects' }" @click="closeMenu">Projects</a></li>
          <li><a href="#experience" class="nav-link" :class="{ active: activeSection === 'experience' }" @click="closeMenu">Experience</a></li>
          <li><a href="#skills" class="nav-link" :class="{ active: activeSection === 'skills' }" @click="closeMenu">The Team</a></li>
          <li><a href="#trophy" class="nav-link" :class="{ active: activeSection === 'trophy' }" @click="closeMenu">Trophies</a></li>
        </ul>
      </div>

      <!-- Right Pill: Action & Theme -->
      <div class="nav-actions">
        <a
          href="mailto:vixen2006triv@gmail.com"
          class="pill-badge action-badge font-technical"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Get in touch</span>
          <span class="action-arrow">↗</span>
        </a>

        <!-- Theme Toggle Pill -->
        <button
          class="pill-badge theme-badge"
          @click="$emit('toggle-theme')"
          :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          :aria-pressed="isDark"
        >
          <svg v-if="!isDark" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
          <svg v-else width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13.5 8.5A5.5 5.5 0 1 1 7.5 2.5a4.5 4.5 0 0 0 6 6Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
          </svg>
          <span class="sr-only">{{ isDark ? 'Light mode' : 'Dark mode' }}</span>
        </button>

        <!-- Mobile Menu Trigger -->
        <button
          class="hamburger-btn"
          @click="toggleMenu"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
        >
          <span class="ham-bar" :class="{ open: menuOpen }"></span>
          <span class="ham-bar" :class="{ open: menuOpen }"></span>
        </button>
      </div>
    </nav>

    <!-- Mobile Drawer -->
    <transition name="drawer-fade">
      <div v-if="menuOpen" id="mobile-nav" class="mobile-drawer" role="dialog" aria-label="Mobile Navigation">
        <div class="mobile-drawer-inner">
          <ul class="mobile-links" role="list">
            <li><a href="#projects" class="mobile-link" @click="closeMenu">Projects</a></li>
            <li><a href="#experience" class="mobile-link" @click="closeMenu">Experience</a></li>
            <li><a href="#skills" class="mobile-link" @click="closeMenu">The Team</a></li>
            <li><a href="#trophy" class="mobile-link" @click="closeMenu">Trophy Cabinet</a></li>
          </ul>
          <div class="mobile-footer">
            <a href="mailto:vixen2006triv@gmail.com" class="btn-primary" style="width: 100%; justify-content: center;">
              Get in touch ↗
            </a>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  isDark: Boolean
})

defineEmits(['toggle-theme'])

const isScrolled = ref(false)
const menuOpen = ref(false)
const activeSection = ref('')

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function onScroll() {
  isScrolled.value = window.scrollY > 30

  // Track active section for indicator
  const sections = ['projects', 'experience', 'skills', 'trophy']
  const scrollPos = window.scrollY + 180

  for (const secId of sections) {
    const el = document.getElementById(secId)
    if (el) {
      const top = el.offsetTop
      const height = el.offsetHeight
      if (scrollPos >= top && scrollPos < top + height) {
        activeSection.value = secId
        return
      }
    }
  }
  activeSection.value = ''
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 900;
  padding: 20px clamp(16px, 4vw, 48px);
  pointer-events: none;
  transition: transform 0.3s ease, padding 0.3s ease;
}

.nav-container.scrolled {
  padding-top: 12px;
  padding-bottom: 12px;
}

.navbar {
  max-width: 1040px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  pointer-events: auto;
}

/* Pill Badges */
.pill-badge {
  display: inline-flex;
  align-items: center;
  background-color: var(--pill-bg);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  text-decoration: none;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.brand-badge {
  padding: 10px 20px;
  gap: 4px;
}

.brand-badge:hover {
  transform: translateY(-1px);
  border-color: var(--accent);
}

.brand-logo {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text);
}

.brand-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--accent);
  margin-top: 2px;
}

/* Center Navigation Island */
.pill-island {
  background-color: rgba(255, 255, 255, 0.75);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 5px 6px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 6px 24px rgba(35, 45, 28, 0.06);
}

[data-theme="dark"] .pill-island {
  background-color: rgba(20, 28, 17, 0.75);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  padding: 7px 16px;
  border-radius: var(--radius-pill);
  transition: all 0.2s ease;
  display: block;
}

.nav-link:hover {
  color: var(--text);
  background-color: rgba(0, 0, 0, 0.05);
}

[data-theme="dark"] .nav-link:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.nav-link.active {
  background-color: var(--text);
  color: var(--bg);
  font-weight: 600;
}

/* Right Nav Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-badge {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 10px 18px;
  gap: 6px;
}

.action-badge:hover {
  background-color: var(--text);
  color: var(--bg);
  border-color: var(--text);
  transform: translateY(-1px);
}

.action-arrow {
  font-size: 14px;
  transition: transform 0.2s ease;
}

.action-badge:hover .action-arrow {
  transform: translate(2px, -2px);
}

.theme-badge {
  padding: 10px;
  cursor: none;
  color: var(--text);
}

.theme-badge:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-1px);
}

/* Mobile Hamburger Button */
.hamburger-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background-color: var(--pill-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  cursor: pointer;
}

.ham-bar {
  width: 18px;
  height: 1.5px;
  background-color: var(--text);
  transition: transform 0.25s ease, opacity 0.25s ease;
  transform-origin: center;
}

.ham-bar.open:nth-child(1) {
  transform: translateY(3.25px) rotate(45deg);
}

.ham-bar.open:nth-child(2) {
  transform: translateY(-3.25px) rotate(-45deg);
}

/* Mobile Drawer */
.mobile-drawer {
  pointer-events: auto;
  position: absolute;
  top: calc(100% + 8px);
  left: clamp(16px, 4vw, 48px);
  right: clamp(16px, 4vw, 48px);
  max-width: 480px;
  margin: 0 auto;
  background-color: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.15);
}

.mobile-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.mobile-link {
  font-family: 'Fraunces', serif;
  font-size: 20px;
  font-weight: 600;
  color: var(--text);
  display: block;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
}

.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 860px) {
  .nav-island {
    display: none;
  }
  .hamburger-btn {
    display: flex;
  }
}

@media (max-width: 520px) {
  .action-badge {
    display: none;
  }
}
</style>
