import { useState } from 'react'
import { router } from 'expo-router'

export const useEventNavigation = () => {
  const [isNavigating, setIsNavigating] = useState(false)

  const navigateToEvent = (params: {
    pathname: string
    params: Record<string, any>
  }) => {
    if (isNavigating) return

    setIsNavigating(true)

    // Cambia de pantalla
    router.push(params)

    // Ocultar el modal después de un tiempo razonable
    // (reemplazar esto con un mecanismo de detección de carga completa si es posible)
    setTimeout(() => {
      setIsNavigating(false)
    }, 1000)
  }

  return {
    isNavigating,
    navigateToEvent,
  }
}
