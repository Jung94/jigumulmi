const Check = ({size="25px", color="#232323"}: {size?: string, color?: string}) => {
  return (
    <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={color}>
      <path d="M5 13L9 17L19 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  )
}

export default Check