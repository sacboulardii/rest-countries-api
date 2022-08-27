import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  /* ---------------------------------------------------------------- */
  //                              STATE
  /* ---------------------------------------------------------------- */

  const theme = ref(localStorage.getItem('theme') || 'light')

  /* ---------------------------------------------------------------- */
  //                              ACTIONS
  /* ---------------------------------------------------------------- */

  function setTheme(newTheme: string): void {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
  }

  /**
   * It removes the current theme from the document element, sets the next theme, and then adds the
   * current theme to the document element
   */
  function switchTheme(): void {
    document.documentElement.classList.remove(getCurrentTheme.value)
    setTheme(getNextTheme.value)
    document.documentElement.classList.add(getCurrentTheme.value)
  }

  /* ---------------------------------------------------------------- */
  //                              GETTERS
  /* ---------------------------------------------------------------- */

  const getCurrentTheme = computed<string>(() => theme.value)

  const getNextTheme = computed<string>(() => {
    return (
      (getCurrentTheme.value === 'light' && 'dark') ||
      (getCurrentTheme.value === 'dark' && 'wolf') ||
      'light'
    )
  })

  return { switchTheme, getCurrentTheme, getNextTheme }
})
