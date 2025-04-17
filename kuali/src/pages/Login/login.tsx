import { View, Text, SafeAreaView, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import styles from './login.styles'
import colors from '../../constants/colors'
import Checkbox from 'expo-checkbox'
import Input from '../../components/InputText/InputText'
import Button from '../../components/Button/Button'
import Logo from '../../components/Logos/Logo'
import { useAuth } from '../../context/AuthContext'
import { router } from 'expo-router'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

export default function LogIn() {
  const { onLogin, loading } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const passwordRef = useRef(null)

  const login = async () => {
    const result = await onLogin!(email, password)
    if (result && result.error) {
      Alert.alert('Error', result.msg)
    } else {
      router.replace('/')
    }
  }

  if (loading) {
    return <LoadingScreen message='Iniciando sesión, por favor espere' />
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={{ marginVertical: 24 }}>
          <Logo height={200} />
        </View>
        <Text style={styles.title}>Ingresa con tus credenciales</Text>

        <Input
          label='Correo electrónico'
          placeholder='ejemplo@dominio.com'
          returnKeyType='next'
          onSubmitEditing={() => passwordRef.current?.focus()}
          value={email}
          onChangeText={setEmail}
          inputMode='email'
        />

        <Input
          label='Contraseña'
          placeholder='••••••'
          returnKeyType='done'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          inputRef={passwordRef}
        />

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={rememberMe}
            onValueChange={setRememberMe}
            color={colors.selectionBlue}
          />
          <Text style={styles.checkboxLabel}>Recordarme</Text>
        </View>

        <Button buttonText='Iniciar sesión' onPress={login} />
      </View>
    </SafeAreaView>
  )
}
