const ROWS_PER_PAGE = null
const HEAD = ['#', '이름', '수정일', '활성화 여부']
const COL_WIDTH_LIST = ['5%', '35%', '35%', '25%']

// const HEAD = [
//   {
//     "#": "#",
//     ID: "ID",
//     school: "학교",
//     period: "학기",
//     page_count: "페이지 수",
//     has_answer: "답지 유무",
//     upload_time: "업로드 시간",
//   },
// ];

const CONTENT_NUMBER = Object.values(HEAD[0]).length
const BANNER_PATH = '/admin/banner'

export { HEAD, ROWS_PER_PAGE, COL_WIDTH_LIST, CONTENT_NUMBER, BANNER_PATH }
