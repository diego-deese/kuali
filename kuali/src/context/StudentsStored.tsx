let studentList: any[] = []

export const setStudents = (students: any[]) => {
  studentList = students
}

export const getStudents = () => studentList
