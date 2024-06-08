import styles from './bottom-sheet.module.scss'

const FloatingButton = ({ onClick }: { onClick: ()=>void }) => {
  return (
    <button className={styles["floating-button"]} onClick={onClick}>
      <svg width="30px" height="30px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
        <path d="M6 12h6m6 0h-6m0 0V6m0 6v6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    </button>
  )
}

export default FloatingButton