import { Text, View } from 'react-native'
import styles from './UserCard.styles'
import IconButton from '../IconButton/IconButton'
import {
  EnableIcon,
  DisableIcon,
  InfoIcon,
  EditIcon,
} from '../shared/Icons/Icons'
import { router } from 'expo-router'

export default function UserCard({
  name,
  second_name,
  paternal_lastname,
  maternal_lastname,
  state,
}: {
  name: string
  second_name: string
  paternal_lastname: string
  maternal_lastname: string
  state: boolean
}) {
  const handlePress = () => {
    //to do
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
            onPress={() => console.log('Activar/desactivar')}
          />
        </View>
      </View>
    </View>
  )
}
