import { ref, onMounted } from 'vue'

const storageKey = 'appTheme'

const themes = Object.freeze({
  light: 'light',
  dark: 'dark',
})

const nextTheme = Object.freeze({
  light: themes.dark,
  dark: themes.light,
  'light dark': themes.light
})

/**
 *
 */
function getThemeFromStorage () {
  return themes[localStorage.getItem(storageKey)] || themes['light dark']
}

export function useTheme () {

  const theme = ref(getThemeFromStorage())

  /**
   * 
   * @param {light|dark} val 
   */
  function setTheme (val) {
    if (!val) {
      theme.value = nextTheme[theme.value];
    } else {
      theme.value = val
    }

    localStorage.setItem(storageKey, theme.value)
    document.documentElement.style.colorScheme = theme.value
  }

  onMounted(() => {
    if (!window) {
      return
    }

    setTheme(getThemeFromStorage())
  })

  return { theme, setTheme }
}