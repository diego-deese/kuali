import { useAuth } from '../../context/AuthContext'
import { Roles } from '../../constants/roles'

const WithRole = ({ children, role }: { children: any; role: Roles }) => {
  const { user } = useAuth()

  if (user?.role.role_id !== role) {
    return <></>
  }
  return children
}

export default WithRole
