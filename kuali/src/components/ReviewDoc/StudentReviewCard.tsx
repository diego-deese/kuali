import BaseReviewCard from './BaseReviewCard'
/**
 * StudentReviewCard is a wrapper for BaseReviewCard.
 * It formats and passes student-specific data to display
 * their document status and allow approval or rejection actions.
 */
export default function StudentReviewCard({ student, onActionComplete }) {
  return (
    <BaseReviewCard
      title={[
        student.name,
        student.second_name,
        student.paternal_lastname,
        student.maternal_lastname,
      ]
        .filter(Boolean)
        .join(' ')}
      user_document_id={student.user_document_id}
      initialStatus={student.documentStatus?.name}
      fileName={`${[
        student.name,
        student.second_name,
        student.paternal_lastname,
        student.maternal_lastname,
      ]
        .filter(Boolean)
        .join('')}_${student.requirement?.name ?? 'Documento'}`}
      onActionComplete={onActionComplete}
    />
  )
}
