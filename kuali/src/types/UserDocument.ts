export enum DocumentStatus {
  'Pendiente',
  'Aprobado',
  'Rechazado',
}

export type UserDocument = {
  user_document_id: number
  status: {
    revision_status_id: number
    name: DocumentStatus
  }
}
