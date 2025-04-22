import { MaterialIcons } from '@expo/vector-icons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export const BookmarkIcon = ({ fill = true, ...props }) => {
  return fill ? (
    <MaterialIcons name='bookmark' size={24} {...props} />
  ) : (
    <MaterialIcons name='bookmark-border' size={24} {...props} />
  )
}

export const CalendarIcon = ({ fill = true, ...props }) => {
  return fill ? (
    <MaterialCommunityIcons name='calendar-blank' size={24} {...props} />
  ) : (
    <MaterialCommunityIcons
      name='calendar-blank-outline'
      size={24}
      {...props}
    />
  )
}

export const ProfileIcon = ({ fill = true, ...props }) => {
  return fill ? (
    <MaterialIcons name='person' size={24} {...props} />
  ) : (
    <MaterialIcons name='person-outline' size={24} {...props} />
  )
}

export const VisibilityIcon = ({ fill = true, ...props }) => {
  return <MaterialIcons name='visibility' size={24} {...props} />
}

export const VisibilityOffIcon = ({ fill = true, ...props }) => {
  return <MaterialIcons name='visibility-off' size={24} {...props} />
}

export const NotificationIcon = ({ fill = true, ...props }) => {
  return <MaterialIcons name='notifications' size={24} {...props} />
}

export const NotificationNoneIcon = ({ fill = true, ...props }) => {
  return <MaterialIcons name='notifications-none' size={24} {...props} />
}

export const PersonSearch = ({ fill = true, ...props }) => {
  return fill ? (
    <MaterialCommunityIcons
      name='account-search'
      size={24}
      color='black'
      {...props}
    />
  ) : (
    <MaterialCommunityIcons
      name='account-search-outline'
      size={24}
      color='black'
      {...props}
    />
  )
}
