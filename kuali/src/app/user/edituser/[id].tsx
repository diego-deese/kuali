import { useLocalSearchParams } from 'expo-router'
import EditUser from '../../../pages/UsersManagement/EditUser/EditUser'

export default function EditUserPage() {
  const { id } = useLocalSearchParams()

  return <EditUser userId={id as string} />
}
