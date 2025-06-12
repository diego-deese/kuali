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
        name: 'Admin',
        second_name: 'Admin',
        paternal_lastname: 'Admin',
        maternal_lastname: 'Admin',
        institutional_email: 'admin@ipn.mx',
        personal_email: 'admin@ipn.mx',
        identifier: 'IPN000000',
        password: await hashPassword('1234').catch((e) => { console.log(e); return '' }),
        role_id: 1
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

  // Seed Locations
  // await prisma.locations.createMany({
  //   skipDuplicates: true,
  //   data: [
  //     { name: 'Auditorio Principal' },
  //     { name: 'Sala de Conferencias' },
  //     { name: 'Laboratorio A' },
  //     { name: 'Aula Magna' }
  //   ]
  // })

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
