import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { useAuth } from '../../../context/AuthContext'
import { Roles } from '../../../constants/roles'

const TabSelector = ({ activeTab, onTabChange }) => {
  const { user } = useAuth()

  return (
    <View style={styles.tabs}>
      <TouchableOpacity onPress={() => onTabChange('upcoming')}>
        <Text
          style={
            activeTab === 'upcoming' ? styles.activeTab : styles.inactiveTab
          }
        >
          {user.role.role_id === Roles.ADMIN
            ? 'Convocatorias a revisar'
            : 'Mis eventos próximos'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onTabChange('past')}>
        <Text
          style={activeTab === 'past' ? styles.activeTab : styles.inactiveTab}
        >
          Historial
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default TabSelector
