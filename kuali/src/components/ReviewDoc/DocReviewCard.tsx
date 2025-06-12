import BaseReviewCard from './BaseReviewCard'
/**
 * DocReviewCard is a lightweight wrapper for BaseReviewCard.
 * It extracts relevant information from the `req` object (document requirement)
 * and passes it down to BaseReviewCard to handle display and interaction.
 */
export default function DocReviewCard({ req, onActionComplete }) {
  const baseName = `${[
    req.user?.name,
    req.user?.second_name,
    req.user?.paternal_lastname,
    req.user?.maternal_lastname,
  ]
    .filter(Boolean)
    .join('')}_${req.requirement?.name ?? 'Documento'}`

  const extension = req.file_name?.split('.').pop()?.toLowerCase() ?? 'pdf'
  const fileName = `${baseName}.${extension}`
  return (
    <BaseReviewCard
      title={req.requirement?.name}
      user_document_id={req.user_document_id}
      initialStatus={req.status?.name}
      fileName={fileName}
      onActionComplete={onActionComplete}
    />
  )
}
