import { useLocalSearchParams } from 'expo-router'
import InfoUser from '../../../pages/UsersManagement/InfoUser/InfoUser'

export default function InfoUserPage() {
  const { id } = useLocalSearchParams()

  return <InfoUser userId={id as string} />
}
