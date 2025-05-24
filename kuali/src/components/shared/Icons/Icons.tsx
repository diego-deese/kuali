import { MaterialIcons } from '@expo/vector-icons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import AntDesign from '@expo/vector-icons/AntDesign'
import { FontAwesome } from '@expo/vector-icons'
import colors from '../../../constants/colors'

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
      {...props}
    />
  )
}

export const DisableIcon = ({ fill = true, ...props }) => {
  return (
    <MaterialCommunityIcons
      name='eye-off-outline'
      size={24}
      color={colors.warningRed}
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

export const LogoutIcon = ({ fill = true, ...props }) => {
  return <MaterialIcons name='logout' size={24} color='black' {...props} />
}

export const ReverseIcon = ({ fill = true, ...props }) => {
  return <MaterialIcons name='touch-app' size={30} color='white' {...props} />
}
export const DropDownIcon = ({ fill = true, ...props }) => {
  return (
    <MaterialIcons name='arrow-drop-down' size={35} color='black' {...props} />
  )
}
export const DropUpIcon = ({ fill = true, ...props }) => {
  return (
    <MaterialIcons name='arrow-drop-up' size={35} color='black' {...props} />
  )
}

export const InfoIcon = ({ fill = true, ...props }) => {
  return (
    <MaterialIcons
      name='info-outline'
      size={24}
      color={colors.selectionBlue}
      {...props}
    />
  )
}

export const EditIcon = ({ fill = true, ...props }) => {
  return (
    <MaterialIcons
      name='edit'
      size={24}
      color={colors.selectionBlue}
      {...props}
    />
  )
}

export const RejectedIcon = (props) => {
  return <AntDesign name='close' size={24} color='black' {...props} />
}

export const AcceptedIcon = (props) => {
  return <AntDesign name='check' size={24} color='black' {...props} />
}

export const PlusIcon = (props) => {
  return (
    <AntDesign
      name='pluscircleo'
      size={24}
      color={colors.blueIcons}
      {...props}
    />
  )
}

export const PendingIcon = (props) => {
  return <MaterialIcons name='schedule' size={24} color='black' {...props} />
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

export const LeftArrowIcon = (props) => {
  return (
    <MaterialCommunityIcons
      name='chevron-left'
      size={24}
      color='black'
      {...props}
    />
  )
}

export const RightArrowIcon = (props) => {
  return (
    <MaterialIcons name='chevron-right' size={24} color='black' {...props} />
  )
}

export const PlaceIcon = ({ fill = true, ...props }) => {
  return fill ? (
    <MaterialIcons name='place' size={24} color='black' {...props} />
  ) : (
    <MaterialCommunityIcons
      name='map-marker-outline'
      size={24}
      color='black'
      {...props}
    />
  )
}

export const CalendarClockIcon = ({ fill = true, ...props }) => {
  return fill ? (
    <MaterialCommunityIcons
      name='calendar-clock'
      size={24}
      color='black'
      {...props}
    />
  ) : (
    <MaterialCommunityIcons
      name='calendar-clock-outline'
      size={24}
      color='black'
      {...props}
    />
  )
}

export const SquareEditIcon = (props) => {
  return (
    <MaterialCommunityIcons
      name='square-edit-outline'
      size={24}
      color='black'
      {...props}
    />
  )
}

export const CloseIcon = (props) => {
  return <MaterialIcons name='close' size={24} color='black' {...props} />
}

export const CheckIcon = (props) => {
  return <MaterialIcons name='check' size={24} color='black' {...props} />
}

export const EditCalendarIcon = (props) => {
  return (
    <MaterialIcons name='edit-calendar' size={24} color='black' {...props} />
  )
}

export const ArrowDownIcon = (props) => {
  return (
    <MaterialCommunityIcons
      name='chevron-down'
      size={24}
      color='black'
      {...props}
    />
  )
}

export const DeleteIcon = (props) => {
  return (
    <MaterialIcons name='delete-forever' size={24} color='black' {...props} />
  )
}

export const PlusBoxIcon = (props) => {
  return (
    <MaterialCommunityIcons
      name='plus-box-outline'
      size={24}
      color='black'
      {...props}
    />
  )
}

export const UploadIcon = (props) => {
  return (
    <MaterialCommunityIcons name='upload' size={24} color='black' {...props} />
  )
}

export const DocumentIcon = (props) => {
  return (
    <MaterialCommunityIcons
      name='file-document'
      size={24}
      color='black'
      {...props}
    />
  )
}

export const ImagePlusIcon = (props) => {
  return (
    <MaterialCommunityIcons
      name='image-plus'
      size={24}
      color='black'
      {...props}
    />
  )
}

export const ArrowBack = (props) => {
  return <MaterialIcons name='arrow-back' size={24} color='black' {...props} />
}
