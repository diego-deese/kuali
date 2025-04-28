import { MaterialIcons } from '@expo/vector-icons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import AntDesign from '@expo/vector-icons/AntDesign'
import { FontAwesome } from '@expo/vector-icons'
import colors from '../../constants/colors'

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

export const EnableIcon = ({ fill = true, ...props }) => {
  return (
    <MaterialCommunityIcons
      name='eye-outline'
      size={24}
      color={colors.selectionBlue}
    />
  )
}

export const DisableIcon = ({ fill = true, ...props }) => {
  return (
    <MaterialCommunityIcons
      name='eye-off-outline'
      size={24}
      color={colors.warningRed}
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

export const LogoutIcon = ({ fill = true, ...props }) => {
  return <MaterialIcons name='logout' size={24} color='black' {...props} />
}

export const InfoIcon = ({ fill = true, ...props }) => {
  return (
    <MaterialIcons name='info-outline' size={24} color={colors.selectionBlue} />
  )
}

export const EditIcon = ({ fill = true, ...props }) => {
  return <MaterialIcons name='edit' size={24} color={colors.selectionBlue} />
}

export const RejectedIcon = () => {
  return <AntDesign name='close' size={24} color='black' />
}

export const AcceptedIcon = () => {
  return <AntDesign name='check' size={24} color='black' />
}

export const PlusIcon = () => {
  return <AntDesign name='pluscircleo' size={24} color={colors.blueIcons} />
}

export const PendingIcon = () => {
  return <MaterialIcons name='schedule' size={24} color='black' />
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

export const CalendarEvent = ({ fill = true, ...props }) => {
  return <FontAwesome name='calendar' size={24} color='black' {...props} />
}

export const LocationIcon = ({ fill = true, ...props }) => {
  return <FontAwesome name='map-marker' size={24} color='black' {...props} />
}

export const LeftArrow = ({ fill = true, ...props }) => {
  return <FontAwesome name='chevron-left' size={24} color='black' {...props} />
}

export const RightArrow = ({ fill = true, ...props }) => {
  return <FontAwesome name='chevron-right' size={24} color='black' {...props} />
}
