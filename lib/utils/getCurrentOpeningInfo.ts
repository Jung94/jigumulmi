export const getCurrentOpeningInfo = (info: string): { info: string, className: string } => {
  let className: string;

  switch(info) {
    case '영업 중': 
    case '곧 영업 종료': 
      className = 'open'
      break
    default: 
      className = 'closed'
      break
  }
  return { info, className }
}
// 오늘 휴무
// 영업 전
// 곧 영업 시작
// 영업 중
// 곧 영업 종료
// 영업 종료