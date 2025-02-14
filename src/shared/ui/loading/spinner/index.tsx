export default function SpinnerLoading(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      fill="currentColor"
      {...props}
    >
      <g>
        {[...Array(12)].map((_, i) => (
          <g key={i} transform={`rotate(${i * 30} 50 50)`}>
            <rect x="46" y="1.5" rx="0" ry="0" width="8" height="23" fill="currentColor">
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin={`${-((11 - i) / 12)}s`}
                repeatCount="indefinite"
              />
            </rect>
          </g>
        ))}
      </g>
    </svg>
  )
}
