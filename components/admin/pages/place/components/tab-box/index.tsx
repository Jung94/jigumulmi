import styles from './tab-box.module.scss'

const TabBox = ({ active, handleSelect }: { active: number, handleSelect: (v: any, name: string)=>void }) => {
  return (
    <div className={styles.container}>
      <button 
        className={active === 1 ? styles.active : ''}
        onClick={()=>handleSelect(1, "isFromAdmin")}
      >등록된 장소</button>
      <button 
        className={active === 0 ? styles.active : ''}
        onClick={()=>handleSelect(0, "isFromAdmin")}
      >유저 등록 신청 장소</button>
    </div>
  )
}

export default TabBox