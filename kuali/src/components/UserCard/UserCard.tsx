import { Text, View } from 'react-native'
import styles from './UserCard.styles'
import IconButton from '../shared/IconButton/IconButton'
import {
  EnableIcon,
  DisableIcon,
  InfoIcon,
  EditIcon,
} from '../shared/Icons/Icons'
import userService from '../../services/user.service'
import authService from '../../services/auth.service'

export default function UserCard({
  user_id,
  name,
  second_name,
  paternal_lastname,
  maternal_lastname,
  state,
}: {
  user_id: number
  name: string
  second_name: string
  paternal_lastname: string
  maternal_lastname: string
  state: boolean
}) {
  const handleDeactivate = async () => {
    const token = await authService.getToken()
    if (!token) {
      console.log('Token expirado o sin acceso')
      return
    }
    const response = await userService.deactiveProfile(user_id)
    if ('success' in response && !response.success) {
      console.error(response.error)
      // show some UI feedback
    } else {
      console.log('Usuario desactivado con éxito')
      // Optionally update UI or icon
    }
  }
  return (
    <View style={styles.cardContainer}>
      {state === false && <View style={styles.inactiveOverlay} />}

      <View style={styles.content}>
        <View style={styles.nameContainer}>
          <Text style={state ? styles.name : styles.nameInactive}>
            {`${name} ${second_name} ${paternal_lastname} ${maternal_lastname}`}
          </Text>
        </View>
        <View style={styles.actionsContainer}>
          <IconButton icon={<InfoIcon />} onPress={() => console.log('Ver')} />
          <IconButton
            icon={<EditIcon />}
            onPress={() => console.log('Editar')}
          />
          <IconButton
            icon={state ? <DisableIcon /> : <EnableIcon />}
            onPress={handleDeactivate}
          />
        </View>
      </View>
    </View>
  )
}
