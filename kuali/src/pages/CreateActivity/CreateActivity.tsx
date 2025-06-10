import React, { useState } from 'react'
import { FlatList, KeyboardAvoidingView, View, Platform } from 'react-native'
import { styles } from './styles'
import colors from '../../constants/colors'
import { router } from 'expo-router'

import ButtonsHeader from '../../components/shared/ButtonsHeader/ButtonsHeader'
import IconButton from '../../components/shared/IconButton/IconButton'
import CreateActivityForm from '../../components/CreateActivity/CreateActivityForm/CreateActivityForm'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import ConfirmationModal from '../../components/shared/ConfirmationModal/ConfirmationModal'

import { CheckIcon, CloseIcon } from '../../components/shared/Icons/Icons'

import { useActivityFormContext } from '../../context/ActivityFormContext/ActivityFormContext'
import { useAppActions } from '../../context/AppActionsContext'

const CreateActivity = () => {
  const {
    mode,
    loading,
    loadingAction,
    createActivity,
    posterImg,
    title,
    description,
    location,
    errors,
  } = useActivityFormContext()

  const [showModal, setShowModal] = useState(false)

  const { requests } = useAppActions()

  if (loading) {
    return <LoadingScreen message='Cargando la información...' />
  }
  const onCreateActivity = async () => {
    if (requests.isSendingRequest) {
      return
    }
    await createActivity()
  }

  const renderContent = () => (
    <View style={styles.container}>
      <ButtonsHeader title='Crear Actividad'>
        <IconButton
          icon={
            <CloseIcon
              size={32}
              color={colors.warningRed}
              onPress={() => {
                setShowModal(true)
              }}
            />
          }
        />
        <IconButton
          icon={<CheckIcon size={32} color={colors.selectionBlue} />}
          onPress={onCreateActivity}
        />
      </ButtonsHeader>

      <CreateActivityForm
        mode={mode}
        location={location}
        loadingAction={loadingAction}
        posterImg={posterImg}
        title={title}
        description={description}
        errors={errors}
      />

      <ConfirmationModal
        title='Volver a la pantalla de inicio'
        description='¿Estás seguro de que quieres salir de la pantalla de creación de actividad? Todos los datos que ya llenaste se perderán.'
        confirmButtonColor={colors.warningRed}
        visible={showModal}
        onCancel={() => {
          setShowModal(false)
        }}
        onConfirm={() => {
          router.back()
        }}
      />
    </View>
  )

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/**
       
        Use FlatList component to be able to scroll through page content
        if it overflows screen height and still be able to use another 
        flatlists inside of it
      
      */}
      <FlatList
        data={[{ key: 'content' }]}
        renderItem={renderContent}
        keyExtractor={(item) => item.key}
        keyboardShouldPersistTaps='never' // Asegura que los taps no cierren el teclado
        nestedScrollEnabled={true}
        removeClippedSubviews={false}
      />
    </KeyboardAvoidingView>
  )
}

export default CreateActivity
