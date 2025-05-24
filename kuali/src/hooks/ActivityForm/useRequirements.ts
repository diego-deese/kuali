import { useState } from 'react'
import { ActivityRequirement } from '../../types/Requirements'

export const useRequirements = () => {
  const [requirements, setRequirements] = useState<ActivityRequirement[]>([])

  const addRequirement = (
    name: string,
    description: string,
    template_uri?: string,
  ) => {
    const newRequirementId = requirements.length + 1
    setRequirements((prevRequirements) => [
      ...prevRequirements,
      { requirement_id: newRequirementId, name, description, template_uri },
    ])
  }

  const deleteRequirement = (requirementId: number) => {
    setRequirements((prevRequirements) =>
      prevRequirements.filter(
        (requirement) => requirement.requirement_id !== requirementId,
      ),
    )
  }

  const editRequirement = (
    requiremetId: number,
    name: string,
    description: string,
    templateUri: string,
  ) => {
    setRequirements((prevRequirements) =>
      prevRequirements.map((requirement) =>
        requirement.requirement_id === requiremetId
          ? { ...requirement, name, description, template_uri: templateUri }
          : requirement,
      ),
    )
  }

  return {
    requirements,
    addRequirement,
    deleteRequirement,
    editRequirement,
  }
}
