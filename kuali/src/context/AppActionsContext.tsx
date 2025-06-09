import { router } from 'expo-router'
import { createContext, useContext, useState } from 'react'

interface AppActionsProps {
  navigation?: {
    isNavigating: boolean
    navigate: (path: string) => void
    goBack: () => void
    replace: (path: string) => void
  }
}

const AppActionsContext = createContext<AppActionsProps>({})

export const AppActionsProvider = ({ children }) => {
  const [isNavigating, setIsNavigating] = useState(false)

  const navigate = (path: string): void => {
    setIsNavigating(true)
    router.navigate(path)
    setTimeout(() => {
      setIsNavigating(false)
    }, 1000)
  }

  const goBack = (): void => {
    setIsNavigating(true)
    router.back()
    setTimeout(() => {
      setIsNavigating(false)
    }, 1000)
  }

  const replace = (path: string): void => {
    setIsNavigating(true)
    router.replace(path)
    setTimeout(() => {
      setIsNavigating(false)
    }, 1000)
  }

  const value = {
    navigation: {
      isNavigating,
      navigate,
      goBack,
      replace,
    },
  }

  return (
    <AppActionsContext.Provider value={value}>
      {children}
    </AppActionsContext.Provider>
  )
}

export const useAppActions = () => {
  const context = useContext(AppActionsContext)

  if (context === undefined) {
    throw new Error('useAppActions must be used inside AppActionsProvider')
  }

  return context
}
