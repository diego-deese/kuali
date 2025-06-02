import BaseReviewCard from './BaseReviewCard'

export default function StudentReviewCard({ student, onActionComplete }) {
  return (
    <BaseReviewCard
      title={`${student.name} ${student.second_name} ${student.paternal_lastname}`}
      user_document_id={student.user_document_id}
      initialStatus={student.documentStatus?.name}
      //onDownload={() => console.log('Descargando...')}
      onActionComplete={onActionComplete}
    />
  )
}
