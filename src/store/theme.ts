import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getNextTheme } from '@/helpers'
import { DesignTheme } from '@/types/DesignTheme'

export const useThemeStore = defineStore('theme', () => {
  /* ---------------------------------------------------------------- */
  //                              STATE
  /* ---------------------------------------------------------------- */

  /* Creating a theme reactive object with the default of `light`. */
  const theme = ref<DesignTheme>('light')

  /* ---------------------------------------------------------------- */
  //                              ACTIONS
  /* ---------------------------------------------------------------- */

  /**
   * Sets the value of the theme object to the value of `newTheme`.
   * @param newTheme - The new theme to set.
   */

  function setTheme(newTheme: DesignTheme): void {
    theme.value = newTheme
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
  const getCurrentTheme = computed<DesignTheme>(() => theme.value)

  return { switchTheme, getCurrentTheme }
})
