import { useState, useEffect } from 'react'

type ThemeOverride = 'dark' | 'light' | null

interface UseThemeReturn {
  isDark: boolean
  override: ThemeOverride
  toggleTheme: () => void
}

const systemPrefersDark = (): boolean =>
  window.matchMedia('(prefers-color-scheme: dark)').matches

export function useTheme(): UseThemeReturn {
  const [override, setOverride] = useState<ThemeOverride>(
    () => (localStorage.getItem('theme') as ThemeOverride) ?? null
  )

  const applyTheme = (isDark: boolean): void => {
    document.documentElement.classList.toggle('dark', isDark)
  }

  useEffect(() => {
    if (override !== null) {
      applyTheme(override === 'dark')
      return
    }

    applyTheme(systemPrefersDark())

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent): void => applyTheme(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [override])

  const isDark: boolean =
    override !== null ? override === 'dark' : systemPrefersDark()

  const toggleTheme = (): void => {
    const next: ThemeOverride =
      override === null ? (isDark ? 'light' : 'dark') : null

    setOverride(next)

    if (next === null) {
      localStorage.removeItem('theme')
    } else {
      localStorage.setItem('theme', next)
    }
  }

  return { isDark, override, toggleTheme }
}