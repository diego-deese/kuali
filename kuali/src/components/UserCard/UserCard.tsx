import { Text, View } from 'react-native'
import styles from './UserCard.styles'
import IconButton from '../IconButton/IconButton'
import { EnableIcon, DisableIcon, InfoIcon, EditIcon } from '../Icons/Icons'

export default function UserCard({
  username,
  state,
}: {
  username: string
  state: boolean
}) {
  return (
    <View style={styles.cardContainer}>
      {state === false && <View style={styles.inactiveOverlay} />}

      <View style={styles.content}>
        <View style={styles.nameContainer}>
          <Text style={state ? styles.name : styles.nameInactive}>
            {username}
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
            onPress={() => console.log('Activar/desactivar')}
          />
        </View>
      </View>
    </View>
  )
}
