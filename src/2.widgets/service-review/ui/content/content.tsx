import styles from './content.module.scss'

export default function Content({
  content,
  onChange
}: {
  content: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <div className={styles['content']}>
      <div className={styles['content-header-title']}>
        리뷰
      </div>
      <textarea 
        id='review' 
        name='review' 
        maxLength={400} 
        placeholder='소중한 리뷰를 남겨주세요' 
        value={content} 
        onChange={onChange} 
      />
    </div>
  )
}