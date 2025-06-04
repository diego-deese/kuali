import React, { useEffect, useState } from 'react'
import { Modal, View, Text, TouchableOpacity } from 'react-native'
import styles from './AcademicProgramsModal.styles'
import SelectInput from '../SelectInput'
import Button from '../Button/Button'
import academicProgramService from '../../../services/academicProgram.service'
import { AcademicProgram } from '../../../types/AcademicProgram'

export default function AcademicProgramsModal({
  visible,
  onConfirm,
  onCancel,
}: {
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

  useEffect(() => {
    const fetchPrograms = async () => {
      const response = await academicProgramService.getAcademicPrograms()
      if (response.success) {
        const formattedOptions = response.activities.map(
          (program: AcademicProgram) => ({
            id: program.program_id,
            label: program.name,
          }),
        )
        setProgramOptions(formattedOptions)
      } else {
        console.error(response.error)
      }
    }

    if (visible) {
      fetchPrograms()
    }
  }, [visible])

  return (
    <Modal transparent visible={visible} animationType='fade'>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Selecciona el programa académico</Text>
          <SelectInput
            label='Programa académico a inscribir:'
            options={programOptions}
            onSelect={(value) => setSelectedProgramId(value.id as number)}
          />
          <Button
            buttonText='Confirmar'
            onPress={() => selectedProgramId && onConfirm(selectedProgramId)}
            disabled={selectedProgramId === null}
          />
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.cancelText}>Cancelar inscripción</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
