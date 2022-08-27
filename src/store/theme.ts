import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getNextTheme } from '@/helpers'

export const useThemeStore = defineStore('theme', () => {
  /* ---------------------------------------------------------------- */
  //                              STATE
  /* ---------------------------------------------------------------- */

  const theme = ref(localStorage.getItem('theme') || '') || ref('light')

  /* ---------------------------------------------------------------- */
  //                              ACTIONS
  /* ---------------------------------------------------------------- */

  function setTheme(newTheme: string): void {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
  }

  /**
   * It removes the current theme from the document element, sets the next theme, and then adds the new
   * theme to the document element
   */
  function switchTheme(): void {
    document.documentElement.classList.remove(getCurrentTheme.value)
    setTheme(getNextTheme(getCurrentTheme.value))
    document.documentElement.classList.add(getCurrentTheme.value)
  }

  /* ---------------------------------------------------------------- */
  //                              GETTERS
  /* ---------------------------------------------------------------- */

  /* A computed property that returns the value of `theme`. */
  const getCurrentTheme = computed<string>(() => theme.value)

  return { switchTheme, getCurrentTheme }
})
