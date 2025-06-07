import { useEffect, useState } from 'react'
import userService from '../../services/user.service'

export const useProfilePhotoCheck = (userId: number) => {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('')
  const [photoExists, setPhotoExists] = useState(true)
  const [loading, setLoading] = useState(false)

  const checkPhoto = async () => {
    setLoading(true)
    try {
      const url = userService.getProfilePhotoUrl(userId)
      setProfilePhotoUrl(url)

      // Validar que la URL no sea vacía
      if (!url || url.trim() === '') {
        setPhotoExists(false)
        return
      }

      const res = await fetch(url, { method: 'HEAD' })
      if (!res.ok || res.status === 404) {
        setPhotoExists(false)
      } else {
        setPhotoExists(true)
      }
    } catch (err) {
      setPhotoExists(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      checkPhoto()
    }
  }, [userId])

  return {
    profilePhotoUrl,
    showPlaceholder: !photoExists,
    loading,
    refetch: checkPhoto,
  }
}
