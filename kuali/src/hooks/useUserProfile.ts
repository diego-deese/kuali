import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import userService from '../services/user.service'
import Toast from 'react-native-toast-message'

export function useUserProfile() {
  const [userProfile, setUserProfile] = useState(null)
  const [imgUrl, setImgUrl] = useState('../../../assets/cicataLogo.png')
  const [loading, setLoading] = useState(true)
  const [imageLoading, setImageLoading] = useState(false)

  const { user } = useAuth()

  // Función para obtener el perfil del usuario
  const fetchUserProfile = async (userId) => {
    if (!userId) {
      console.log('No hay ID de usuario disponible')
      setLoading(false)
      return
    }

    console.log('Intentando cargar el perfil del usuario con ID:', userId)

    try {
      const result = await userService.getUserProfile(userId)

      if ('success' in result && !result.success) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2:
            result.message || 'No se pudo cargar la información del perfil',
        })
      } else {
        setUserProfile(result)
        console.log('Perfil de usuario establecido:', result)
      }
    } catch (error) {
      console.error('Error al cargar el perfil:', error)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo cargar la información del perfil',
      })
    } finally {
      setLoading(false)
    }
  }

  // Función para cargar la URL de la imagen
  const loadProfilePhoto = (userId) => {
    if (userId) {
      const photoUrl = userService.getProfilePhotoUrl(userId)
      setImgUrl(photoUrl)
    }
  }

  // Obtener el programa académico del usuario
  const getProgramName = () => {
    // Verificar si hay programas como estudiante
    if (userProfile?.academic_programs_as_student?.length > 0) {
      const studentProgram = userProfile.academic_programs_as_student[0].program
      if (studentProgram && studentProgram.name) {
        return studentProgram.name
      }
    }

    // Verificar si hay programas como investigador
    if (userProfile?.academic_programs_as_researcher?.length > 0) {
      const researcherProgram = userProfile.academic_programs_as_researcher[0]
      if (researcherProgram && researcherProgram.name) {
        return researcherProgram.name
      }
    }

    return 'Sin programa asignado'
  }

  // Efecto para cargar los datos cuando cambia el usuario
  useEffect(() => {
    if (user?.user_id) {
      fetchUserProfile(user.user_id)
      loadProfilePhoto(user.user_id)
    }
  }, [user?.user_id])

  return {
    userProfile,
    imgUrl,
    loading,
    imageLoading,
    setImageLoading,
    getProgramName,
    refreshProfile: () => {
      if (user?.user_id) {
        setLoading(true)
        fetchUserProfile(user.user_id)
        loadProfilePhoto(user.user_id)
      }
    },
  }
}
