export enum DocumentStatus {
  Pendiente = 'Pendiente',
  Aprobado = 'Aprobado',
  Rechazado = 'Rechazado',
}

export type UserDocument = {
  user_document_id: number
  status: {
    revision_status_id: number
    name: DocumentStatus
  }
}
