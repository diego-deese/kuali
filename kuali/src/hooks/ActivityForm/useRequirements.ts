import { useState } from 'react'
import { ActivityRequirement, EditRequirement } from '../../types/Requirements'
import { RequirementTemplate } from '../../types/RequirementTemplate'

export const useRequirements = () => {
  const [requirements, setRequirements] = useState<ActivityRequirement[]>([])

  const setInitialRequirements = (
    requirements: ActivityRequirement[],
  ): void => {
    setRequirements(requirements)
  }

  const restartRequirements = () => {
    setRequirements([])
  }

  const addRequirement = (
    name: string,
    description: string,
    template_uri: string | null,
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

  const editRequirement = (requirementInfo: EditRequirement) => {
    setRequirements((prevRequirements) =>
      prevRequirements.map((requirement) =>
        requirement.requirement_id === requirementInfo.requirement_id
          ? {
              ...requirement,
              name: requirementInfo.name,
              description: requirementInfo.description,
              template: requirementInfo.template,
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
    restartRequirements,
  }
}
