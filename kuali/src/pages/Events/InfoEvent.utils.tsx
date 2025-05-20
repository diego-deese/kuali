import { DocumentStatus } from '../../types/UserDocument'
/**
 * Convierte un string a su correspondiente valor en el enum DocumentStatus
 * @param statusName - String o enum DocumentStatus a convertir
 * @returns El valor correspondiente del enum DocumentStatus
 */
export const getDocumentStatusFromString = (
  statusName: DocumentStatus | string,
): DocumentStatus => {
  // Si ya es un DocumentStatus, devuélvelo directamente
  if (Object.values(DocumentStatus).includes(statusName as DocumentStatus)) {
    return statusName as DocumentStatus
  }

  // Si es un string, conviértelo al enum correspondiente
  switch (String(statusName).toLowerCase()) {
    case 'aprobado':
      return DocumentStatus.Aprobado
    case 'rechazado':
      return DocumentStatus.Rechazado
    default:
      return DocumentStatus.Pendiente
  }
}

export const parseValidDate = (dateString: string): Date | null => {
  // Si es una fecha ISO válida o formato reconocido por JS
  const parsedDate = new Date(dateString)
  return !isNaN(parsedDate.getTime()) ? parsedDate : null
}
