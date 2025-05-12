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
  onGetInfoPress,
  onEditPress,
  onDeactivatePress,
}: {
  user_id: number
  name: string
  second_name: string
  paternal_lastname: string
  maternal_lastname: string
  state: boolean
  onGetInfoPress: (user_id: number) => void
  onEditPress: (user_id: number) => void
  onDeactivatePress: (user_id: number) => void
}) {
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
          <IconButton
            icon={<InfoIcon />}
            onPress={() => onGetInfoPress(user_id)}
          />
          <IconButton
            icon={<EditIcon />}
            onPress={() => onEditPress(user_id)}
          />
          <IconButton
            icon={state ? <DisableIcon /> : <EnableIcon />}
            onPress={() => onDeactivatePress(user_id)}
          />
        </View>
      </View>
    </View>
  )
}
