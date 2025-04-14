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
import colors from '../../constants/colors'
import { VisibilityIcon, VisibilityOffIcon } from '../Icons/Icons'

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
          style={secureTextEntry ? styles.inputTextIcon : styles.inputText}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          value={value}
          onChangeText={onChangeText}
          inputMode={inputMode}
          secureTextEntry={showContent}
          ref={inputRef}
          {...restProps}
        />
        {secureTextEntry && (
          <TouchableOpacity style={styles.icon} onPress={toggleShowContent}>
            {showContent ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default InputText
