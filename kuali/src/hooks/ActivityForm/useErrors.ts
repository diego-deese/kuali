import { useState } from 'react'
import { ActivityErrors, InputError } from '../../types/Error'
import { Option } from '../../components/shared/SelectInput/interfaces'

export const useErrors = () => {
  const [errors, setErrors] = useState<ActivityErrors>({
    title: {
      error: false,
      errorMessage: '',
    },
    description: {
      error: false,
      errorMessage: '',
    },
    location: {
      error: false,
      errorMessage: '',
    },
    posterImage: {
      error: false,
      errorMessage: '',
    },
    dates: {
      error: false,
      errorMessage: '',
    },
  })

  const updateErrors = (newErrors: Partial<ActivityErrors>) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors,
    }))
  }

  const validateTitle = (title: string) => {
    if (title === '' || !title) {
      return {
        error: true,
        errorMessage: 'El título de la actividad es requerido',
      }
    }

    const letterRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/
    if (!letterRegex.test(title)) {
      return {
        error: true,
        errorMessage: 'Solo se permiten letras y números',
      }
    }

    return {
      error: false,
      errorMessage: '',
    }
  }

  const validateDescription = (description: string) => {
    if (description === '' || !description) {
      return {
        error: true,
        errorMessage: 'La descripción de la actividad es requerida',
      }
    }

    return {
      error: false,
      errorMessage: '',
    }
  }

  const validatePosterImage = (posterImgUri: string): InputError => {
    if (posterImgUri === null) {
      return {
        error: true,
        errorMessage: 'El poster de la actividad es requerido',
      }
    }

    return {
      error: false,
      errorMessage: '',
    }
  }

  const validateLocation = (location: Option | null): InputError => {
    if (location === null) {
      return {
        error: true,
        errorMessage: 'La ubicación de la actividad es requerida',
      }
    }

    return {
      error: false,
      errorMessage: '',
    }
  }

  const validateDates = (activityDate: Date, limitDate: Date): InputError => {
    if (limitDate > activityDate) {
      return {
        error: true,
        errorMessage: 'La fecha límite debe ser anterior al evento',
      }
    }

    return {
      error: false,
      errorMessage: '',
    }
  }

  const validateAllFields = (
    title: string,
    description: string,
    posterImg: string | null,
    location: Option,
    activityDate: Date,
    limitDate: Date,
  ): boolean => {
    const newErrors: ActivityErrors = {
      title: validateTitle(title),
      description: validateDescription(description),
      posterImage: validatePosterImage(posterImg),
      location: validateLocation(location),
      dates: validateDates(activityDate, limitDate),
    }

    setErrors(newErrors)

    return !(
      newErrors.title.error ||
      newErrors.description.error ||
      newErrors.location.error ||
      newErrors.posterImage.error ||
      newErrors.dates.error
    )
  }

  return {
    errors,
    validateTitle,
    validateDescription,
    validatePosterImage,
    validateLocation,
    validateDates,
    validateAllFields,
    updateErrors,
  }
}
