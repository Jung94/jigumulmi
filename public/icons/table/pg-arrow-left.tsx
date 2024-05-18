interface Props {
  disabled?: boolean
}
const ArrowLeftOen = ({disabled=true}: Props) => {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.83986 2.06621V1.03094C6.83986 0.941211 6.73674 0.891658 6.6671 0.946568L0.629595 5.66219C0.578298 5.70209 0.536791 5.75317 0.508238 5.81154C0.479686 5.86992 0.464844 5.93404 0.464844 5.99902C0.464844 6.06401 0.479686 6.12813 0.508238 6.18651C0.536791 6.24488 0.578298 6.29596 0.629595 6.33585L6.6671 11.0515C6.73808 11.1064 6.83986 11.0568 6.83986 10.9671V9.93184C6.83986 9.86621 6.80906 9.80327 6.75817 9.76309L1.93674 5.99969L6.75817 2.23496C6.80906 2.19478 6.83986 2.13184 6.83986 2.06621Z" fill={disabled ? "#E1E1E1" : "#111111"}/>
    </svg>
  )
}

export default ArrowLeftOen