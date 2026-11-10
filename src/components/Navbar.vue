<template>
  <nav aria-label="Primary navigation">
    <a href="#hero" class="nav-brand"><b>VIXXEN</b></a>

    <div class="nav-right">
      <!-- Minimalist Connect Dropdown -->
      <div class="nav-dropdown" ref="dropdownRef">
        <button
          class="dropdown-trigger"
          @click="isOpen = !isOpen"
          :aria-expanded="isOpen"
          aria-haspopup="true"
        >
          <span>Connect</span>
        </button>

        <transition name="drop">
          <div v-if="isOpen" class="dropdown-menu" role="menu">
            <a
              v-for="link in socialLinks"
              :key="link.name"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="dropdown-item"
              role="menuitem"
              @click="isOpen = false"
            >
              {{ link.name }}
            </a>
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const dropdownRef = ref(null)

const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vaishnavi-trivedi-ab8b3434a/' },
  { name: 'X', url: 'https://x.com/nav_trivedi' },
  { name: 'LeetCode', url: 'https://leetcode.com/u/vixen2006/' },
  { name: 'GitHub', url: 'https://github.com/vixen2006' },
  { name: 'Codeforces', url: 'https://codeforces.com/profile/VIXXENN' },
  { name: 'Email', url: 'mailto:vixen2006triv@gmail.com' }
]

function handleOutsideClick(e) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  window.removeEventListener('click', handleOutsideClick)
})
</script>

<style scoped>
.nav-brand {
  color: inherit;
  text-decoration: none;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.4rem;
}

.nav-dropdown {
  position: relative;
}

.dropdown-trigger {
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 99px;
  padding: 0.35rem 0.85rem;
  font: 400 0.7rem 'JetBrains Mono', monospace;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink);
  cursor: pointer;
  transition: all 0.25s ease;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.dropdown-trigger:hover,
.dropdown-trigger[aria-expanded="true"] {
  border-color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.05);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 170px;
  background: rgba(10, 12, 18, 0.94);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 0.4rem 0;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 100;
  display: flex;
  flex-direction: column;
}

.dropdown-item {
  padding: 0.65rem 1.1rem;
  font: 400 0.7rem 'JetBrains Mono', monospace;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #c4c2bc;
  text-decoration: none;
  transition: background 0.2s, color 0.2s, padding-left 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  white-space: nowrap;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  padding-left: 1.35rem;
}

/* Dropdown Animation */
.drop-enter-active,
.drop-leave-active {
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}
</style>
