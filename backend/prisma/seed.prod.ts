import prisma from '../src/lib/prisma'
import { hashPassword } from '../src/utils/encryption'

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
      {
        name: 'Karla',
        second_name: 'Catalina',
        paternal_lastname: 'Cruz',
        maternal_lastname: 'Torres',
        institutional_email: 'kcruzt@ipn.mx',
        personal_email: 'kcruzt@ipn.mx',
        identifier: '',
        password: await hashPassword('C1cata2025$').catch((e) => { console.log(e); return '' }),
        role_id: 1,
        active: true
      },
      {
        name: 'Kenia',
        second_name: 'Xitlaly',
        paternal_lastname: 'Salazar',
        maternal_lastname: 'Lezama',
        institutional_email: 'ksalazarl@ipn.mx',
        personal_email: 'ksalazarl@ipn.mx',
        identifier: '',
        password: await hashPassword('C1cata2025$').catch((e) => { console.log(e); return '' }),
        role_id: 1,
        active: true
      }
    ]
  })
}

async function main (): Promise<void> {
  await createRoles()
    .then(async () => {
      await createDummyUsers()
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

  // Seed RevisionStatus
  await prisma.revisionStatus.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Pendiente' },
      { name: 'Aprobado' },
      { name: 'Rechazado' }
    ]
  })

  await prisma.academicPrograms.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Semilla' }
    ]
  })

  await prisma.notificationType.createMany({
    data: [
      {
        name: 'activity_reminder',
        description: 'Recordatorio de actividad próxima'
      },
      {
        name: 'registration_deadline',
        description: 'Fecha límite de registro'
      },
      {
        name: 'document_review',
        description: 'Estado de revisión de documentos'
      },
      {
        name: 'activity_created',
        description: 'Nueva actividad disponible'
      },
      {
        name: 'activity_updated',
        description: 'Datos de actividad actualizados'
      }
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
