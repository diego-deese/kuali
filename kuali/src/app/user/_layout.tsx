import { router, Stack } from 'expo-router'
import Header from '../../components/shared/Header/Header'
import IconButton from '../../components/shared/IconButton/IconButton'
import { ArrowBack } from '../../components/shared/Icons/Icons'
import colors from '../../constants/colors'
import LogoHorizontal from '../../components/shared/Logos/LogoHorizontal'

export default function UserManagementLayout() {
  const goBack = () => {
    router.back()
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
