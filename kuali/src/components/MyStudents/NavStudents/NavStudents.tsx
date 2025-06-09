import React from 'react'
import { router } from 'expo-router'
import NavButtons from '../../shared/NavButtons/NavButtons'
import { User } from '../../../types/User'
/**
 * NavigationButtons allows switching between students using index-based navigation.
 * It wraps the shared NavButtons component and handles routing to the corresponding student detail.
 */
export default function NavigationButtons({
  index,
  students,
}: {
  index: number
  students: User[]
}) {
  // Navigate to a new student based on index
  const navigateTo = (newIndex: number) => {
    const nextStudent = students[newIndex]
    // Push new route with the selected student's data
    router.push({
      pathname: '/students/[id]',
      params: {
        user_id: nextStudent?.user_id?.toString() ?? '',
        name: nextStudent?.name ?? '',
        paternal_lastname: nextStudent?.paternal_lastname ?? '',
        identifier: nextStudent?.identifier ?? '',
        institutional_email: nextStudent?.institutional_email ?? '',
        index: newIndex.toString(),
      },
    })
  }

  return (
    <NavButtons
      currentIndex={index} // Current index for disabling/enabling buttons
      total={students.length} // Total number of students
      onPrev={() => navigateTo(index - 1)}
      onNext={() => navigateTo(index + 1)}
      label='Estudiante'
    />
  )
}
