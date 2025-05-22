class RegistrationService {
  async getAllUsersByActivity(activityId: number) {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/registration/activity/${activityId}`)
      if (!response.ok) {
        throw new Error('Error fetching registered users')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error in getAllUsersByActivity:', error)
      throw error
    }
  }
}

export default new RegistrationService()
