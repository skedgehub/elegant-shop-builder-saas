
import React, { createContext, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement
    const currentPath = window.location.pathname

    // Verificar se está em uma rota admin
    const isAdminRoute = currentPath.startsWith('/admin') || 
                        currentPath.startsWith('/profile') ||
                        currentPath.startsWith('/orders') ||
                        currentPath.startsWith('/products') ||
                        currentPath.startsWith('/categories') ||
                        currentPath.startsWith('/reports') ||
                        currentPath.startsWith('/subscribers') ||
                        currentPath.startsWith('/appearance') ||
                        currentPath.startsWith('/catalog-config') ||
                        currentPath.startsWith('/system-config')

    // Só aplicar tema se for rota admin
    if (isAdminRoute) {
      root.classList.remove("light", "dark")

      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light"

        root.classList.add(systemTheme)
        return
      }

      root.classList.add(theme)
    } else {
      // Forçar light theme para outras páginas (catálogo, home, etc)
      root.classList.remove("dark")
      root.classList.add("light")
    }
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
