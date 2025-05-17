import { useState } from 'react'
import { ActivityRequirement } from '../../types/Requirements'

export const useRequirements = () => {
  const [requirements, setRequirements] = useState<ActivityRequirement[]>([
    // {
    //   requirement_id: 1,
    //   name: 'Constancia',
    //   description: 'Constancia de estudios',
    // },
    // {
    //   requirement_id: 2,
    //   name: 'Carta responsiva',
    //   description: 'Carta responsiva firmada',
    // },
  ])

  const addRequirement = (name: string, description: string) => {
    const newRequirementId = requirements.length + 1
    setRequirements((prevRequirements) => [
      ...prevRequirements,
      { requirement_id: newRequirementId, name, description },
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
  ) => {
    setRequirements((prevRequirements) =>
      prevRequirements.map((requirement) =>
        requirement.requirement_id === requiremetId
          ? { ...requirement, name, description }
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
