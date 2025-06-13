export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const getFileInfo = (uri: string) => {
  // Obtener el nombre del archivo de la URI
  const fileName = uri.split('/').pop() || ''

  // Obtener la extensión del archivo
  const extension = fileName.split('.').pop()?.toLowerCase() || ''

  // Mapeo de extensiones comunes a tipos MIME
  const mimeTypes: { [key: string]: string } = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  }

  return {
    fileName,
    mimeType: mimeTypes[extension] || 'application/octet-stream',
  }
}

export const getDateWithoutTime = (date: Date): Date => {
  const newDate = new Date(date)
  newDate.setHours(0, 0, 0, 0)
  return newDate
}
