import { View, Text, SafeAreaView } from 'react-native'
import React, { useRef } from 'react'
import styles from './login.styles'
import colors from '../../constants/colors'
import Checkbox from 'expo-checkbox'
import { useLogin } from '../../hooks/useLogin'
import Input from '../../components/InputText/InputText'
import Button from '../../components/Button/Button'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import Logo from '../../components/Logos/Logo'

export default function LogIn() {
  const { email, password, rememberMe, isLoading, handleLogin } = useLogin()

  const passwordRef = useRef(null)

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
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
            placeholder='••••••'
            returnKeyType='done'
            value={password.password}
            onChangeText={password.setPassword}
            secureTextEntry
            inputRef={passwordRef}
          />

          <View style={styles.checkboxContainer}>
            <Checkbox
              value={rememberMe.rememberMe}
              onValueChange={rememberMe.setRememberMe}
              color={colors.selectionBlue}
            />
            <Text style={styles.checkboxLabel}>Recordarme</Text>
          </View>

          <Button buttonText='Iniciar sesión' onPress={handleLogin} />
        </View>
      )}
    </SafeAreaView>
  )
}
