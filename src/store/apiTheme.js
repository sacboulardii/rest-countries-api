import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  /* -------------------- STATE -------------------- */
  const currentTheme = ref('light')

  /* -------------------- ACTIONS -------------------- */
  function switchTheme() {
    currentTheme.value =
      (currentTheme.value === 'light' && 'dark') ||
      (currentTheme.value === 'dark' && 'wolf') ||
      'light' // Default theme
  }

  /* -------------------- GETTERS -------------------- */
  const getCurrentTheme = computed(() => currentTheme.value)

  return { switchTheme, getCurrentTheme }
})
