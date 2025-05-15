// Lista temporal donde se almacenan los estudiantes asignados.
let studentList: any[] = []

// Esta función guarda la lista de estudiantes en la variable interna.
// Se llama desde la vista MyStudents, cuando se hace clic en un estudiante.
// Esto permite acceder a toda la lista después desde otra pantalla como InfoStudents.
export const setStudents = (students: any[]) => {
  studentList = students
}

// Esta función devuelve la lista de estudiantes guardada previamente.
// Se usa en InfoStudents para obtener al estudiante actual y navegar entre ellos.
export const getStudents = () => studentList
