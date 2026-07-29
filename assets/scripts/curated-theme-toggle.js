const storageKey = 'curated:theme'

const themes = Object.freeze({
  light: 'light',
  dark: 'dark',
})

const nextTheme = Object.freeze({
  light: themes.dark,
  dark: themes.light
})

function getThemeFromStorage () {
  return themes[localStorage.getItem(storageKey)] || nextTheme['dark']
}

class CuratedThemeToggle extends HTMLElement {

  connectedCallback () {
    if (this.button) {
      return
    }

    this.button = document.createElement('button')
    this.button.type = 'button'
    this.button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16"/></svg>`
    this.button.setAttribute('aria-label', 'Toggle color theme')
    this.append(this.button)
    this.button.addEventListener('click', this.toggle)
  }

  disconnectedCallback () {
    if (!this.button) {
      return
    }

    this.button.removeEventListener('click', this.toggle)
  }

  toggle = () => {
    const next = nextTheme[getThemeFromStorage()]
    localStorage.setItem(storageKey, next)
    document.documentElement.style.colorScheme = next
  }

}

customElements.define('curated-theme-toggle', CuratedThemeToggle)