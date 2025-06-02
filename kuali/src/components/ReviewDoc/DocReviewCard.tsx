import BaseReviewCard from './BaseReviewCard'

export default function DocReviewCard({ req, onActionComplete }) {
  return (
    <BaseReviewCard
      title={req.requirement?.name}
      user_document_id={req.user_document_id}
      initialStatus={req.status?.name}
      //onDownload={() => console.log('Descargando...')}
      onActionComplete={onActionComplete}
    />
  )
}
