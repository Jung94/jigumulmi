import styles from './navbar.module.scss'

const Navbar = () => {

  return (
    <div className={styles.navbar}>
      <div className={styles.icons_wrap}>
        <div className={styles.icon}>
          <svg width="39px" height="39px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
            <path fillRule="evenodd" clipRule="evenodd" d="M17.8733 15.4753C18.3338 16.345 17.4362 17.3064 16.537 16.9067L11.9994 14.89L7.46178 16.9067C6.56256 17.3064 5.66499 16.345 6.12541 15.4753L11.0838 6.1095C11.4729 5.37447 12.5259 5.37448 12.915 6.1095L17.8733 15.4753Z" stroke="#000000" strokeWidth="1.1"></path>
          </svg>
        </div>
        <div className={styles.icon}>
          <svg width="27px" height="27px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
            <path d="M8 12H12M16 12H12M12 12V8M12 12V16" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Navbar