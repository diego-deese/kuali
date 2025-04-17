import { ActivityIndicator, Text, View } from 'react-native'
import Logo from '../../components/Logos/Logo'
import colors from '../../constants/colors'

interface LoadingScreenProps {
  message?: string
}

export default function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
      }}
    >
      <Logo height={200} />
      <ActivityIndicator size={'large'} color={colors.selectionBlue} />
      {message && <Text>{message}</Text>}
    </View>
  )
}
