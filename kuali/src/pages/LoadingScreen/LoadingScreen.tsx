import { ActivityIndicator, View } from 'react-native'
import Logo from '../../components/Logos/Logo'
import colors from '../../constants/colors'

export default function LoadingScreen() {
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
    </View>
  )
}
