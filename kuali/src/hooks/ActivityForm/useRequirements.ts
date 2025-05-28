import { useState } from 'react'
import { ActivityRequirement } from '../../types/Requirements'
import { RequirementTemplate } from '../../types/RequirementTemplate'

export const useRequirements = () => {
  const [requirements, setRequirements] = useState<ActivityRequirement[]>([])

  const setInitialRequirements = (
    requirements: ActivityRequirement[],
  ): void => {
    setRequirements(requirements)
  }

  const addRequirement = (
    name: string,
    description: string,
    template_uri?: string,
  ) => {
    const newRequirementId = requirements.length + 1
    setRequirements((prevRequirements) => {
      const requirementTemplate: RequirementTemplate =
        template_uri !== null
          ? { requirement_template_id: newRequirementId, template_uri }
          : null
      const newRequirements: ActivityRequirement[] = [
        ...prevRequirements,
        {
          requirement_id: newRequirementId,
          name,
          description,
          template: requirementTemplate,
        },
      ]

      return newRequirements
    })
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
    setInitialRequirements,
    addRequirement,
    deleteRequirement,
    editRequirement,
  }
}
