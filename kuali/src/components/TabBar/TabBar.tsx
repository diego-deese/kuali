import { TouchableOpacity, View } from 'react-native'
import colors from '../../constants/colors'
import styles from './styles'
import {
  BookmarkIcon,
  CalendarIcon,
  PersonSearch,
  ProfileIcon,
} from '../Icons/Icons'

export default function TabBar({ state, descriptors, navigation }) {
  const icons = {
    myactivities: (props, fill) => (
      <BookmarkIcon size={40} fill={fill} {...props} />
    ),
    calendar: (props, fill) => (
      <CalendarIcon size={35} fill={fill} {...props} />
    ),
    myprofile: (props, fill) => (
      <ProfileIcon size={40} fill={fill} {...props} />
    ),
    mystudents: (props, fill) => (
      <PersonSearch size={40} fill={fill} {...props} />
    ),
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            style={styles.item}
          >
            {icons[route.name](
              {
                color: isFocused ? colors.selectionBlue : colors.standardGray,
              },
              isFocused,
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
