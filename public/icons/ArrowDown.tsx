interface Props {
  disabled?: boolean
}
const ArrowDown = ({disabled=true}: Props) => {
  return (
    <svg width="17px" height="17px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
      <path d="M6 9L12 15L18 9" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  )
}

export default ArrowDown