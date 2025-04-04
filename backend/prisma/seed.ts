import prisma from '../src/lib/prisma'
import { hashPassword } from '../src/utils/encryption'

async function main (): Promise<void> {
  await prisma.roles.createMany({
    data: [
      { name: 'Administrador' },
      { name: 'Estudiante' },
      { name: 'Investigador' }
    ]
  })

  await prisma.users.createMany({
    data: [
      // Creamos Estudiantes dummy
      {
        name: 'Estudiante',
        paternal_lastname: '0',
        maternal_lastname: '0',
        institutional_email: 'estudiante@dominio.com',
        personal_email: 'estudianteper@dominio.com',
        identifier: 'IPN000000',
        password: await hashPassword('1234').catch((e) => { console.log(e); return '' }),
        role_id: 2
      },
      {
        name: 'Estudiante',
        paternal_lastname: '0',
        maternal_lastname: '1',
        institutional_email: 'estudiante1@dominio.com',
        personal_email: 'estudianteper1@dominio.com',
        identifier: 'IPN000001',
        password: await hashPassword('1234').catch((e) => { console.log(e); return '' }),
        role_id: 2
      },
      {
        name: 'Investigador',
        paternal_lastname: '0',
        maternal_lastname: '0',
        institutional_email: 'investigador@dominio.com',
        personal_email: 'investigadorper@dominio.com',
        identifier: 'IPN000002',
        password: await hashPassword('1234').catch((e) => { console.log(e); return '' }),
        role_id: 3
      },
      {
        name: 'Investigador',
        paternal_lastname: '0',
        maternal_lastname: '1',
        institutional_email: 'investigador1@dominio.com',
        personal_email: 'investigadorper1@dominio.com',
        identifier: 'IPN000003',
        password: await hashPassword('1234').catch((e) => { console.log(e); return '' }),
        role_id: 3
      },
      {
        name: 'Administrador',
        paternal_lastname: '0',
        maternal_lastname: '0',
        institutional_email: 'administrador@dominio.com',
        personal_email: 'administradorper@dominio.com',
        identifier: 'IPN000004',
        password: await hashPassword('1234').catch((e) => { console.log(e); return '' }),
        role_id: 1
      },
      {
        name: 'Administrador',
        paternal_lastname: '0',
        maternal_lastname: '1',
        institutional_email: 'administrador1@dominio.com',
        personal_email: 'administradorper1@dominio.com',
        identifier: 'IPN000005',
        password: await hashPassword('1234').catch((e) => { console.log(e); return '' }),
        role_id: 1
      }
    ]
  })

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
      // Agrega más ubicaciones según necesites
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

  // Seed AcademicPrograms
  await prisma.academicPrograms.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Licenciatura en Ciencias Computacionales' },
      { name: 'Maestría en Inteligencia Artificial' },
      { name: 'Doctorado en Sistemas Computacionales' }
    ]
  })

  await prisma.inscriptions.createMany({
    data: [
      {
        start_date: new Date('2025-01-01'),
        end_date: new Date('2025-07-30'),
        active: true,
        student_id: 1,
        researcher_id: 3,
        program_id: 1
      },
      {
        start_date: new Date('2025-01-01'),
        end_date: new Date('2025-07-30'),
        active: true,
        student_id: 2,
        researcher_id: 4,
        program_id: 2
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
