import React, { useEffect, useState, useMemo } from 'react'
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
import { useAcademicPrograms } from '../../../hooks/UsersManagement/useAcademicPrograms'

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
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(
    null,
  )

  const {
    academicPrograms,
    getAcademicPrograms,
    updateAcademicProgram,
    deleteAcademicProgram,
    createAcademicProgram,
    loading,
  } = useAcademicPrograms()

  useEffect(() => {
    if (visible) {
      setSelectedProgramId(null)
      getAcademicPrograms(available)
    }
  }, [visible])

  const programOptions = useMemo(() => {
    return (
      academicPrograms?.map((program) => ({
        id: program.program_id,
        label: program.name,
      })) || []
    )
  }, [academicPrograms])

  return (
    <Modal transparent visible={visible} animationType='fade'>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Selecciona el programa académico</Text>

          {loading ? (
            <ActivityIndicator size='large' color='#000' />
          ) : programOptions.length === 0 ? (
            <Text style={styles.infoText}>
              No hay programas académicos disponibles.
            </Text>
          ) : (
            <>
              <SelectInput
                label='Programa académico a inscribir:'
                options={programOptions}
                headerInputPlaceholder='Nuevo programa académico'
                editable
                onSelect={(value) => setSelectedProgramId(value.id as number)}
                onEditOption={updateAcademicProgram}
                onDeleteOption={deleteAcademicProgram}
                onAddOption={createAcademicProgram}
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
