import React from 'react'
import {
  FlatList,
  KeyboardAvoidingView,
  View,
  Platform,
  ScrollView,
} from 'react-native'
import { styles } from './styles'
import colors from '../../constants/colors'

import ButtonsHeader from '../../components/shared/ButtonsHeader/ButtonsHeader'
import IconButton from '../../components/shared/IconButton/IconButton'
import CreateActivityForm from '../../components/CreateActivity/CreateActivityForm/CreateActivityForm'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

import { CheckIcon, CloseIcon } from '../../components/shared/Icons/Icons'
import { useCreateActivity } from '../../context/CreateActivityContext/useCreateActivity'

const CreateActivity = () => {
  const { loading } = useCreateActivity()

  if (loading) {
    return <LoadingScreen message='Cargando la información...' />
  }

  const renderContent = () => (
    <View style={styles.container}>
      <ButtonsHeader title='Crear Evento'>
        <IconButton icon={<CloseIcon size={32} color={colors.warningRed} />} />
        <IconButton
          icon={<CheckIcon size={32} color={colors.selectionBlue} />}
        />
      </ButtonsHeader>

      <CreateActivityForm />
    </View>
  )

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 64} // Ajusta el offset según sea necesario
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
      />
    </KeyboardAvoidingView>
  )
}

export default CreateActivity
