import styles from './deletion-review.module.scss';
import Button from '@/components/button';

const SuccessContent = ({
  title,
  content,
  onClick,
}: { 
  title: string
  content?: any
  onClick: any
}) => {

  return (
    <div className={styles.container}>
      {/* <svg style={{margin: "0 auto"}} width="45px" height="45px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000" strokeWidth="1.5">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.70164 8.64124C9.40875 8.34835 8.93388 8.34835 8.64098 8.64124C8.34809 8.93414 8.34809 9.40901 8.64098 9.7019L10.9391 12L8.64098 14.2981C8.34809 14.591 8.34809 15.0659 8.64098 15.3588C8.93388 15.6517 9.40875 15.6517 9.70164 15.3588L11.9997 13.0607L14.2978 15.3588C14.5907 15.6517 15.0656 15.6517 15.3585 15.3588C15.6514 15.0659 15.6514 14.591 15.3585 14.2981L13.0604 12L15.3585 9.7019C15.6514 9.40901 15.6514 8.93414 15.3585 8.64124C15.0656 8.34835 14.5907 8.34835 14.2978 8.64124L11.9997 10.9393L9.70164 8.64124Z" fill="#E8674D"></path>
      </svg> */}
      <svg style={{margin: "0 auto"}} width="45px" height="45px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
        <path d="M9.17218 14.8284L12.0006 12M14.829 9.17157L12.0006 12M12.0006 12L9.17218 9.17157M12.0006 12L14.829 14.8284" stroke="hsl(358,70%,52%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="hsl(358,70%,52%)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
      <div className={`${styles.title} ${content ? '' : styles.without_content}`}>{title}</div>
      {content &&
        <div className={styles.content}>{content}</div>
      }
      <Button type='button' variant='contained' color='error' onClick={onClick}>삭제</Button>
    </div>
  )
}

export default SuccessContent;