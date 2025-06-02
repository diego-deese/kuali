import { useLocalSearchParams, router, Stack } from 'expo-router'
import Header from '../../../components/shared/Header/Header'
import { ArrowBack } from '../../../components/shared/Icons/Icons'
import colors from '../../../constants/colors'
import LogoHorizontal from '../../../components/shared/Logos/LogoHorizontal'
import IconButton from '../../../components/shared/IconButton/IconButton'

export default function EventLayout() {
  const { activity_id } = useLocalSearchParams()

  const goBack = () => {
    router.push(`/event/${activity_id}/info`)
  }

  return (
    <Stack
      screenOptions={{
        header: () => (
          <Header
            rightComponent={<LogoHorizontal />}
            leftComponent={
              <IconButton
                icon={<ArrowBack size={32} color={colors.highlightCyan} />}
                onPress={goBack}
              />
            }
          />
        ),
      }}
    />
  )
}
