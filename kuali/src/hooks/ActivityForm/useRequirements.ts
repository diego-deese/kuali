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
    const newRequirementId = -(requirements.length + 1) // Negative ID to prevent collisions
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

    return newRequirementId
  }

  const deleteRequirement = (requirementId: number) => {
    setRequirements((prevRequirements) =>
      prevRequirements.filter(
        (requirement) => requirement.requirement_id !== requirementId,
      ),
    )
  }

  const editRequirement = (
    requirementId: number,
    name: string,
    description: string,
    templateUri: string | null,
  ) => {
    setRequirements((prevRequirements) =>
      prevRequirements.map((requirement) =>
        requirement.requirement_id === requirementId
          ? {
              ...requirement,
              name,
              description,
              template:
                templateUri !== null
                  ? { requirement_template_id: 0, template_uri: templateUri }
                  : null,
            }
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
