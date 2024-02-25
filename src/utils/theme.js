const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
const $body = document.body

const classTheme = {
  dark: 'dark',
  light: 'light'
}

function toggleThemeMedia () {
  if (prefersDarkScheme.matches) {
    $body.classList.remove(classTheme.light)
    return null
  }
  $body.classList.add(classTheme.light)
}

const bodyClassToggle = (theme) => {
  if (theme === classTheme.dark) {
    $body.classList.remove(classTheme.light)
  } else {
    $body.classList.add(classTheme.light)
  }
}

const changeTheme = (theme = classTheme.dark) => {
  const root = document.documentElement
  bodyClassToggle(theme)
  root.style.setProperty('--schema', theme)
}

export const toggleTheme = () => {
  window.electronAPI.onUpdateTheme((event, theme) => {
    changeTheme(theme)
  })
}

toggleThemeMedia()

prefersDarkScheme.addListener(toggleThemeMedia)
