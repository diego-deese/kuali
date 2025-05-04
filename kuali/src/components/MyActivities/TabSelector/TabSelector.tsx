import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'

const TabSelector = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.tabs}>
      <TouchableOpacity onPress={() => onTabChange('upcoming')}>
        <Text
          style={
            activeTab === 'upcoming' ? styles.activeTab : styles.inactiveTab
          }
        >
          Mis eventos próximos
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
