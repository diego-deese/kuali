import BaseReviewCard from './BaseReviewCard'
/**
 * DocReviewCard is a lightweight wrapper for BaseReviewCard.
 * It extracts relevant information from the `req` object (document requirement)
 * and passes it down to BaseReviewCard to handle display and interaction.
 */
export default function DocReviewCard({ req, onActionComplete }) {
  return (
    <BaseReviewCard
      title={req.requirement?.name}
      user_document_id={req.user_document_id}
      initialStatus={req.status?.name}
      fileName={`${[
        req.user?.name,
        req.user?.second_name,
        req.user?.paternal_lastname,
        req.user?.maternal_lastname,
      ]
        .filter(Boolean)
        .join('_')}_${req.requirement?.name ?? 'Documento'}`}
      onActionComplete={onActionComplete}
    />
  )
}
