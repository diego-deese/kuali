import { useAuth } from '../../context/AuthContext'
import { Roles } from '../../constants/roles'
import ProfileId from '../../pages/ProfileId/profileId'
import UsersManagement from '../../pages/UsersManagement/usersmanagement'
import ProfileSwitcher from '../../pages/ProfileId/profileSwitcher'

export default function MyProfileTab() {
  const { user } = useAuth()

  if (user.role.role_id === Roles.ADMIN) {
    return <UsersManagement />
  }

  return <ProfileSwitcher />
}
