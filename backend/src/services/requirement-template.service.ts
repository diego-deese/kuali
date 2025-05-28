import { RequirementTemplates } from '../generated/client'
import prisma from '../lib/prisma'
import { NotFoundError } from '../types/Error'
import { CreatedRequirementTemplate, NewRequirementTemplate, UpdateRequirementTemplate } from '../types/RequirementTemplates'

class RequirementTemplateService {
  async uploadFile (newRequirementTemplateData: NewRequirementTemplate): Promise<CreatedRequirementTemplate> {
    try {
      // Guardar el archivo en la base de datos como datos binarios
      const newRequirementTemplate = await prisma.requirementTemplates.create({
        data: newRequirementTemplateData,
        omit: {
          file_content: true,
          mimetype: true
        }
      })

      return newRequirementTemplate
    } catch (error) {
      console.error('Error al guardar la plantilla del requisito en la base de datos:', error)
      throw new Error('No se pudo guardar la plantilla del requisito en la base de datos')
    }
  }

  async getFile (templateId: number): Promise<RequirementTemplates> {
    try {
      const file = await prisma.requirementTemplates.findUnique({
        where: {
          requirement_template_id: templateId
        }
      })

      if (file === null) {
        throw new NotFoundError('No se econtró ningún archivo con ese id')
      }

      return file
    } catch (error) {
      console.error('Error al obtener el documento:', error)
      throw new Error('No se pudo obtener el archivo')
    }
  }

  async updateTemplateFile (requirementTemplateId: number, requirementTemplateData: UpdateRequirementTemplate): Promise<CreatedRequirementTemplate> {
    const updatedTemplate = prisma.requirementTemplates.update({
      where: {
        requirement_template_id: requirementTemplateId
      },
      data: requirementTemplateData,
      omit: {
        file_content: true,
        mimetype: true
      }
    })

    return await updatedTemplate
  }
}

export default new RequirementTemplateService()
