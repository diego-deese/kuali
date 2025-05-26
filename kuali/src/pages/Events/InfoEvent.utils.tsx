import { DocumentStatus } from '../../types/UserDocument'
/**
 * Convierte un string a su correspondiente valor en el enum DocumentStatus
 * @param statusName - String o enum DocumentStatus a convertir
 * @returns El valor correspondiente del enum DocumentStatus
 */
export const getDocumentStatusFromString = (
  statusName: DocumentStatus | string | undefined,
): DocumentStatus => {
  // Si es undefined o null, usar pendiente por defecto
  if (!statusName) {
    return DocumentStatus.Pendiente
  }

  // Si ya es un DocumentStatus, devuélvelo directamente
  if (Object.values(DocumentStatus).includes(statusName as DocumentStatus)) {
    return statusName as DocumentStatus
  }

  // Si es un string, conviértelo al enum correspondiente
  const statusNameLower = String(statusName).toLowerCase()

  if (statusNameLower === 'aprobado') {
    return DocumentStatus.Aprobado
  }
  if (statusNameLower === 'rechazado') {
    return DocumentStatus.Rechazado
  }

  return DocumentStatus.Pendiente
}

export const parseValidDate = (dateString: string): Date | null => {
  const parsedDate = new Date(dateString)
  return !isNaN(parsedDate.getTime()) ? parsedDate : null
}
