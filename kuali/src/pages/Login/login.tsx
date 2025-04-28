import { View, Text, SafeAreaView } from 'react-native'
import React, { useRef } from 'react'
import styles from './login.styles'
import Input from '../../components/InputText/InputText'
import Button from '../../components/Button/Button'
import Logo from '../../components/Logos/Logo'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { useLogin } from '../../hooks/useLogin'
import { useAuth } from '../../context/AuthContext'
import { Redirect } from 'expo-router'
import { useFonts } from 'expo-font'

export default function LogIn() {
  const { email, password, loading, handleLogin } = useLogin()
  const { authenticated } = useAuth()
  const [fontsLoaded] = useFonts({
    monserratRegular: require('../../../assets/fonts/Montserrat-Regular.ttf'),
    monserratBold: require('../../../assets/fonts/Montserrat-SemiBold.ttf'),
    monserratItalic: require('../../../assets/fonts/Montserrat-Italic.ttf'),
  })

  const passwordRef = useRef(null)

  if (loading) {
    return <LoadingScreen message='Iniciando sesión, por favor espere' />
  }

  if (authenticated) {
    return <Redirect href='myactivities' />
  }

  if (!fontsLoaded) {
    return <LoadingScreen message='Cargando recursos de la aplicación' />
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
          value={email.email}
          onChangeText={email.setEmail}
          inputMode='email'
        />

        <Input
          label='Contraseña'
          placeholder='• • • • • •'
          returnKeyType='done'
          value={password.password}
          onChangeText={password.setPassword}
          secureTextEntry
          inputRef={passwordRef}
        />

        <Button buttonText='Iniciar sesión' onPress={handleLogin} />
      </View>
    </SafeAreaView>
  )
}
