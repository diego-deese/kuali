import React from 'react'
import { router } from 'expo-router'
import NavButtons from '../../shared/NavButtons/NavButtons'
import { User } from '../../../types/User'
import { buildStudentParams } from '../../../utils/navigation'
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
    // Replace new route with the selected student's data
    router.replace({
      pathname: '/students/[id]',
      params: buildStudentParams(nextStudent, newIndex),
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
