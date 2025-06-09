import { View, KeyboardAvoidingView, Platform, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useActivityFormContext } from '../../context/ActivityFormContext/ActivityFormContext'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import ButtonsHeader from '../../components/shared/ButtonsHeader/ButtonsHeader'
import IconButton from '../../components/shared/IconButton/IconButton'
import {
  CheckIcon,
  CloseIcon,
  SaveIcon,
} from '../../components/shared/Icons/Icons'
import colors from '../../constants/colors'
import CreateActivityForm from '../../components/CreateActivity/CreateActivityForm/CreateActivityForm'
import ConfirmationModal from '../../components/shared/ConfirmationModal/ConfirmationModal'
import { router } from 'expo-router'
import { styles } from './styles'

const EditActivity = () => {
  const {
    mode,
    loading,
    loadingAction,
    updateActivity,
    posterImg,
    title,
    description,
    location,
    errors,
  } = useActivityFormContext()

  const [showModal, setShowModal] = useState(false)

  if (loading) {
    return <LoadingScreen message='Cargando la información...' />
  }

  const renderContent = () => (
    <View style={styles.container}>
      <ButtonsHeader title='Editar Actividad'>
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
          icon={
            <SaveIcon fill={false} size={30} color={colors.selectionBlue} />
          }
          onPress={updateActivity}
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

export default EditActivity
