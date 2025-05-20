import { useAuth } from '../../context/AuthContext'
import { Roles } from '../../constants/roles'
import ProfileId from '../../pages/ProfileId/profileId'
import UsersManagement from '../../pages/UsersManagement/usersmanagement'
import ProfileIdInv from '../../pages/ProfileIdInv/profileIdInv'

export default function MyProfileTab() {
  const { user } = useAuth()

  if (user.role.role_id === Roles.ADMIN) {
    return <UsersManagement />
  } else if (user.role.role_id === Roles.TEACHER) {
    return <ProfileIdInv />
  }

  return <ProfileId />
}
