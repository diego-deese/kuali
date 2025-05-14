import React, { useState } from 'react'
import {
  Text,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
  TouchableOpacity,
} from 'react-native'
import styles from './styles'
import { VisibilityIcon, VisibilityOffIcon } from '../Icons/Icons'
import colors from '../../../constants/colors'

interface CustomInputProps extends TextInputProps {
  label?: string
  styles?: {
    inputLabels?: StyleProp<TextStyle>
    inputText?: StyleProp<TextStyle>
  }
  colors?: {
    placeholderGray: string
  }
  inputRef?: React.RefObject<TextInput>
  containerStyle?: StyleProp<ViewStyle>
  error?: boolean
  errorMessage?: string
}

const getInputStyle = (multiline: boolean, secureTextEntry: boolean) => {
  if (multiline) {
    return { ...styles.inputText, ...styles.inputTextMultiline }
  } else if (secureTextEntry) {
    return { ...styles.inputText, ...styles.inputTextIcon }
  } else {
    return styles.inputText
  }
}

const InputText: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  inputMode = 'text',
  returnKeyType = 'next',
  onSubmitEditing,
  secureTextEntry,
  inputRef,
  multiline = false,
  error,
  errorMessage,
  ...restProps
}) => {
  const [showContent, setShowContent] = useState(secureTextEntry)

  const toggleShowContent = () => {
    setShowContent(!showContent)
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.inputLabels}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.placeholderGray}
          style={[
            getInputStyle(multiline, secureTextEntry),
            error && {
              borderColor: colors.warningRed,
            },
          ]}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          value={value}
          onChangeText={onChangeText}
          inputMode={inputMode}
          secureTextEntry={showContent}
          ref={inputRef}
          multiline={multiline}
          numberOfLines={4}
          {...restProps}
        />
        {secureTextEntry && (
          <TouchableOpacity style={styles.icon} onPress={toggleShowContent}>
            {showContent ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  )
}

export default InputText
