import React from 'react'
import { router } from 'expo-router'
import NavButtons from '../../shared/NavButtons/NavButtons'

export default function NavigationButtons({
  index,
  students,
}: {
  index: number
  students: any[]
}) {
  const navigateTo = (newIndex: number) => {
    const nextStudent = students[newIndex]

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
      currentIndex={index}
      total={students.length}
      onPrev={() => navigateTo(index - 1)}
      onNext={() => navigateTo(index + 1)}
      label='Estudiante'
    />
  )
}
