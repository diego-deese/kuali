import prisma from '../src/lib/prisma'
import { hashPassword } from '../src/utils/encryption'
import { getFileBuffer } from '../src/utils/file_buffering'

async function createRoles (): Promise<void> {
  await prisma.roles.createMany({
    data: [
      { name: 'Administrador' },
      { name: 'Estudiante' },
      { name: 'Investigador' }
    ]
  })
}

async function createDummyUsers (): Promise<void> {
  await prisma.users.createMany({
    data: [
      // Creamos Estudiantes dummy
      {
        name: 'Juan',
        second_name: 'Pablo Sebastián',
        paternal_lastname: 'Escobar',
        maternal_lastname: 'Juárez',
        institutional_email: 'juanpi@dominio.com',
        personal_email: 'juanpi@dominio.com',
        identifier: 'IPN000000',
        password: await hashPassword('1234').catch((e) => { console.log(e); return '' }),
        profile_photo: getFileBuffer('src/utils/placeholder_files/profile_photo.jpg'),
        photo_mime_type: 'image/jpg',
        role_id: 2
      },
      {
        name: 'Dulce',
        second_name: 'Nahomi',
        paternal_lastname: 'Bucio',
        maternal_lastname: 'Rivas',
        institutional_email: 'dulce@dominio.com',
        personal_email: 'dulce@dominio.com',
        identifier: 'IPN000001',
        password: await hashPassword('1234').catch((e) => { console.log(e); return '' }),
        profile_photo: getFileBuffer('src/utils/placeholder_files/profile_photo.jpg'),
        photo_mime_type: 'image/jpg',
        role_id: 2
      },
      {
        name: 'Hugo',
        second_name: 'Omar',
        paternal_lastname: 'Alejandres',
        maternal_lastname: 'Sánchez',
        institutional_email: 'hugo@dominio.com',
        personal_email: 'hugo@dominio.com',
        identifier: '000001',
        password: await hashPassword('1234').catch((e) => { console.log(e); return '' }),
        profile_photo: getFileBuffer('src/utils/placeholder_files/profile_photo.jpg'),
        photo_mime_type: 'image/jpg',
        role_id: 3
      },
      {
        name: 'Julia',
        second_name: 'Guadalupe',
        paternal_lastname: 'Juárez',
        maternal_lastname: 'Hernández',
        institutional_email: 'julia@dominio.com',
        personal_email: 'julia@dominio.com',
        identifier: '000002',
        password: await hashPassword('1234').catch((e) => { console.log(e); return '' }),
        profile_photo: getFileBuffer('src/utils/placeholder_files/profile_photo.jpg'),
        photo_mime_type: 'image/jpg',
        role_id: 3
      },
      {
        name: 'Diego',
        second_name: 'Sahid',
        paternal_lastname: 'García',
        maternal_lastname: 'Galván',
        institutional_email: 'sahid@dominio.com',
        personal_email: 'sahid@dominio.com',
        identifier: '000003',
        password: await hashPassword('1234').catch((e) => { console.log(e); return '' }),
        profile_photo: getFileBuffer('src/utils/placeholder_files/profile_photo.jpg'),
        photo_mime_type: 'image/jpg',
        role_id: 1
      },
      {
        name: 'Erick',
        second_name: 'Arjuna',
        paternal_lastname: 'Blas',
        maternal_lastname: 'Flores',
        institutional_email: 'erick@dominio.com',
        personal_email: 'erick@dominio.com',
        identifier: '000004',
        password: await hashPassword('1234').catch((e) => { console.log(e); return '' }),
        profile_photo: getFileBuffer('src/utils/placeholder_files/profile_photo.jpg'),
        photo_mime_type: 'image/jpg',
        role_id: 1
      }
    ]
  })
}

async function createAcademicPrograms (): Promise<void> {
  await prisma.academicPrograms.createMany({
    skipDuplicates: true,
    data: [
      {
        name: 'Licenciatura en Ciencias Computacionales',
        researcher_id: 3
      },
      {
        name: 'Maestría en Inteligencia Artificial',
        researcher_id: 4
      },
      {
        name: 'Doctorado en Sistemas Computacionales',
        researcher_id: 4
      }
    ]
  })
}

async function createInscriptions (): Promise<void> {
  await prisma.inscriptions.createMany({
    data: [
      {
        start_date: new Date('2025-01-01'),
        end_date: new Date('2025-07-30'),
        active: true,
        student_id: 1,
        program_id: 1
      },
      {
        start_date: new Date('2025-01-01'),
        end_date: new Date('2025-07-30'),
        active: true,
        student_id: 2,
        program_id: 2
      }
    ]
  })
}

async function main (): Promise<void> {
  // Seed roles
  await createRoles()
    .then(async () => {
      // Seed dummy users
      await createDummyUsers()
        .then(async () => {
          // Seed academic programs
          await createAcademicPrograms()
            .then(async () => {
              // Seed inscriptions
              await createInscriptions()
                .catch((e) => { console.log('Error al crear las inscripciones ', e) })
            })
            .catch((e) => { console.log('Error al crear los programas académicos ', e) })
        })
        .catch((e) => { console.log('Error al crear a los usuarios ', e) })
    })
    .catch((e) => { console.log('Error al crear los roles de usuarios ', e) })

  await prisma.categories.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Convocatoria' },
      { name: 'Evento' }
    ]
  })

  // Seed Locations
  await prisma.locations.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Auditorio Principal' },
      { name: 'Sala de Conferencias' },
      { name: 'Laboratorio A' },
      { name: 'Aula Magna' }
    ]
  })

  // Seed RevisionStatus
  await prisma.revisionStatus.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Pendiente' },
      { name: 'Aprobado' },
      { name: 'Rechazado' }
    ]
  })

  console.log('Base de datos poblada correctamente')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
      .catch((e) => {
        console.error(e)
      })
  })
