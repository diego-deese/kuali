import React, { useEffect, useState } from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import styles from './AcademicProgramsModal.styles'
import SelectInput from '../SelectInput'
import Button from '../Button/Button'
import academicProgramService from '../../../services/academicProgram.service'
import { AcademicProgram } from '../../../types/AcademicProgram'

export default function AcademicProgramsModal({
  available,
  visible,
  onConfirm,
  onCancel,
}: {
  available: boolean
  visible: boolean
  onConfirm: (programId: number) => void
  onCancel: () => void
}) {
  const [programOptions, setProgramOptions] = useState<
    { id: number; label: string }[]
  >([])
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(
    null,
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true)
      setError(null)
      const response =
        await academicProgramService.getAcademicPrograms(available)
      if (response.success) {
        const formattedOptions = response.activities.map(
          (program: AcademicProgram) => ({
            id: program.program_id,
            label: program.name,
          }),
        )
        setProgramOptions(formattedOptions)
      } else {
        setError('Ocurrió un error al obtener los programas académicos.')
        console.error(response.error)
      }
      setLoading(false)
    }

    if (visible) {
      setSelectedProgramId(null)
      fetchPrograms()
    }
  }, [visible])

  return (
    <Modal transparent visible={visible} animationType='fade'>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Selecciona el programa académico</Text>

          {loading ? (
            <ActivityIndicator size='large' color='#000' />
          ) : error ? (
            <Text>{error}</Text>
          ) : programOptions.length === 0 ? (
            <Text style={styles.infoText}>
              No hay programas académicos disponibles.
            </Text>
          ) : (
            <>
              <SelectInput
                label='Programa académico a inscribir:'
                options={programOptions}
                onSelect={(value) => setSelectedProgramId(value.id as number)}
              />
              <Button
                buttonText='Confirmar'
                onPress={() =>
                  selectedProgramId && onConfirm(selectedProgramId)
                }
                disabled={selectedProgramId === null}
              />
            </>
          )}

          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.cancelText}>Cancelar inscripción</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
