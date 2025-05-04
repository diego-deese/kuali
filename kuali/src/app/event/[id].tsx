import { Roles } from '../../constants/roles'
import { useAuth } from '../../context/AuthContext'
import EditEvent from '../../pages/EditActivity/EditActivity'
import InfoEvent from '../../pages/Events/InfoEvent'

export default function EventPage() {
  const { user } = useAuth()

  if (user.role.role_id === Roles.ADMIN) {
    return <EditEvent />
  }

  return <InfoEvent />
}
