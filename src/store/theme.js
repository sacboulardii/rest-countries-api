import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  /* -------------------- STATE -------------------- */
  const theme = ref('light')

  /* -------------------- ACTIONS -------------------- */
  function setTheme(newTheme) {
    theme.value = newTheme
  }

  function switchTheme() {
    // Remove current theme class
    document.documentElement.classList.remove(theme.value)
    setTheme(
      (theme.value === 'light' && 'dark') ||
        (theme.value === 'dark' && 'wolf') ||
        'light'
    )
    // Add new theme class
    document.documentElement.classList.add(theme.value)
  }

  /* -------------------- GETTERS -------------------- */
  const getCurrentTheme = computed(() => theme.value)

  return { switchTheme, getCurrentTheme }
})
