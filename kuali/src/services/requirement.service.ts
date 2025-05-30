import { AxiosInstance } from 'axios'
import authService from './auth.service'
import { EditRequirement } from '../types/Requirements'

class RequirementService {
  private api: AxiosInstance

  constructor() {
    this.api = authService.getApiClient()
  }

  async updateRequirement(requirementInfo: EditRequirement): Promise<void> {
    try {
      const response = this.api.patch(
        `/requirements/${requirementInfo.requirement_id}`,
      )
    } catch (error) {}
  }
}

export default new RequirementService()
