// import React, {useState, useCallback, useEffect, useRef, forwardRef, KeyboardEvent} from "react"
// import Image from "next/image"
// import styles from "./jokbo.module.scss"
// import Table from "components/_templates/table"
// import DropDown from "components/_organisms/search/DropDown"
// import Modal from "components/modal"
// import LoginModal from "components/modal/login"
// import CommonModal from "components/modal/common"
// import ArrowTopIcon from "public/icons/arrow_top.png"
// import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
// import {getAPI, postAPI} from "lib/api"
// import useGetTestPaperQuery from "domain/download/query/useGetTestPaperQuery"
// import useDidMountEffect from "lib/hook/common/useDidMountEffect"
// import {ReadonlyURLSearchParams, useRouter, useSearchParams} from "next/navigation"
// import useModal from "lib/hook/common/useModal"
// import NotPassTicketModal from "components/modal/notPassTicket"
// import CompleteRestoreModal from "components/modal/completeRestore"

// import { useGTM } from "lib/hook/common/useMarketing"

// const gradeList = [
//   {id: "1-1", name: "1-1"},
//   {id: "1-2", name: "1-2"},
//   {id: "2-1", name: "2-1"},
//   {id: "2-2", name: "2-2"},
//   {id: "3-1", name: "3-1"},
//   {id: "3-2", name: "3-2"}
// ]
// const testList = [
//   {id: "중간", name: "중간"},
//   {id: "기말", name: "기말"}
// ]

// const filterList = [
//   {id: 1, name: "해당 학교 기출 보기", gtm_name: '해당학교'},
//   {id: 2, name: "해당 학교의 동네 학교 기출 보기", gtm_name: '해당동네'},
//   {id: 3, name: "해당 학교보다 쉬운 학교 기출 보기", gtm_name: '쉬운기출'},
//   {id: 4, name: "해당 학교보다 어려운 학교 기출 보기", gtm_name: '어려운기출'},
//   {id: 5, name: "대치동, 목동 등 교육 특구 기출 보기", gtm_name: '교육특구'},
//   {id: 6, name: "외고 & 과고 기출 보기", gtm_name: '외고과고'}
// ]

// const Jokbo = ({mainTitle}: {mainTitle: string}) => {
//   const queryClient = useQueryClient()
//   const router = useRouter()

//   const [page, setPage] = useState<number>(1)
//   const [school, setSchool] = useState<string>("") // school input value
//   const [schoolId, setSchoolId] = useState<number>(0) // 선택한 학교 아이디
//   const [grade, setGrade] = useState<string>("1-1")
//   const [test, setTest] = useState<string>("중간")
//   const [filter, setFilter] = useState<number>(1)
//   const [commonModalText, setCommonModalText] = useState<string>("")
//   const [isActiveSearchBox, setIsActiveSearchBox] = useState(false)
//   const [paymentInformation, setPaymentInformation] = useState({product_name: "", left_time: ""})

//   const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false)
//   const [isOpenCommonModal, setIsOpenCommonModal] = useState<boolean>(false)

//   const [gtmData, setGtmData] = useState({})

//   const {data: testPaperList, refetch} = useGetTestPaperQuery({page, school_id: schoolId, grade, term: test, filter})

//   const {data: search_school_data} = useQuery([`schools`, {school}], () => getAPI("schools", {name: school}), {
//     enabled: !!(school && school.length > 1 && school !== "고등" && school !== "학교"),
//     select: (data) => {
//       return data
//     }
//   })

//   const {mutate: POST_API} = useMutation(postAPI)

//   const searchParams = useSearchParams() as ReadonlyURLSearchParams

//   useEffect(() => {
//     const code_naver = searchParams.get("code")
//     const state_naver = searchParams.get("state")
//     if (code_naver && state_naver) {
//       const data = {
//         apiURL: `${process.env.NEXT_PUBLIC_API_URL}/account/restore/oauth`,
//         body: {lms_oauth_code: code_naver, lms_oauth_state: state_naver}
//       }
//       POST_API(data, {
//         onSuccess: (data: any) => {
//           setPaymentInformation(data.data.payment_info)
//           queryClient.invalidateQueries(["user/subscription"])
//           queryClient.invalidateQueries(["qb/dddetail"])
//           completeRestoreModal.show()
//           router.replace("/question/paper/jokbo")
//         },
//         onError: () => {
//           notPassTicketModal.show()
//           router.replace("/question/paper/jokbo")
//         }
//       })
//     }
//   }, [])

//   useEffect(() => {
//     return () => {
//       queryClient.removeQueries(["qb/contents", page])
//     }
//   }, [])

//   useEffect(()=>{
//     if (search_school_data?.length === 0) return
//     setCursorIndex(0)
//   }, [search_school_data])

//   const scrollRef = useRef<HTMLDivElement>(null)
//   const scrollToTop = () => {
//     if (scrollRef?.current?.scrollTop) scrollRef.current.scrollTop = 0
//   }

//   useDidMountEffect(() => {
//     if (page >= 1) refetch()
//   }, [page])

//   const notPassTicketModal = useModal({component: <NotPassTicketModal />})
//   const completeRestoreModal = useModal({component: <CompleteRestoreModal paymentInformation={paymentInformation} />})

//   const handleRestoreNaver = () => {
//     return router.push(
//       `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID_LEGACY}&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_LOGIN_RETURN_URL}/question/paper/jokbo&state=100`
//     )
//   }

//   const onCloseLoginModal = () => {
//     setIsOpenLoginModal(false)
//   }

//   const handleCloseCommonModal = () => {
//     setIsOpenCommonModal(false)
//   }

//   const debounce = (callback: any, duration: number) => {
//     let timer: any
//     return (...args: any) => {
//       clearTimeout(timer)
//       timer = setTimeout(() => callback(...args), duration)
//     }
//   }

//   const handleSchool = useCallback(
//     (e: any) => {
//       e.preventDefault()
//       debounce(setSchool(e.target.value), 500)
//       if (isActiveSearchBox) return
//       setIsActiveSearchBox(true)
//     },
//     [school]
//   )

//   const onClickSchool = (id: number, name: string) => {
//     setIsActiveSearchBox(false)
//     setSchool(name)
//     setSchoolId(id)
//   }
//   const handleClickGrade = (e: any) => {
//     setGrade(e.target.value)
//   }
//   const handleClickTest = (e: any) => {
//     setTest(e.target.value)
//   }

//   const handleClickFilter = (e: any, name: string) => {
//     setFilter(Number(e.target.value))
//   }

//   const handleSubmitForm = () => {
//     setPage(1)
//     let errorText: string = ""

//     if (!school) errorText = "학교를 검색해 주세요"
//     else if (schoolId === 0) errorText = "자동 검색된 학교 리스트 중 하나를 선택해 주세요"

//     if (errorText !== "") {
//       setCommonModalText(errorText)
//       setIsOpenCommonModal(true)
//       return
//     }
    
//     const gtm_filter_name: string | undefined = filterList.find((e: any) => e.id === filter)?.gtm_name

//     useGTM({event: 'search_schoolname', data: {schoolName: school, grade: grade, exam: test === '중간' ? 'mid' : 'final', filter: gtm_filter_name}})
//     setGtmData({schoolName: school, grade: grade, exam: test === '중간' ? 'mid' : 'final', filter: gtm_filter_name})

//     refetch()
//   }

//   const [cursorIndex, setCursorIndex] = useState<number>(0)

//   const handleSearchScroll = (key: 'ArrowDown' | 'ArrowUp') => {
//     const activeOption = document.querySelector(`.${styles.active_option}`)
//     const container = document.querySelector(`.${styles.search_result_box}`)
//     const optionPosition = activeOption?.offsetTop // option과 box_top의 거리
//     const optionHeight = activeOption?.offsetHeight // option 하나의 높이
//     const clientHeight = container?.clientHeight // 스크롤 제외 높이
//     const scrollHeight = container?.scrollHeight // 스크롤 포함 높이
//     const scrollTop = container?.scrollTop // 스크롤 Y 좌표 (맨 위일 때 === 0)

//     // 스크롤 X
//     if (container?.clientHeight === container?.scrollHeight) return

//     // 스크롤 O
//     if (key === 'ArrowDown') {
//       if (
//         (scrollHeight - (scrollTop + clientHeight)) > 2 && 
//         ((scrollTop + clientHeight) - (optionPosition + optionHeight + 10)) < optionHeight
//       ) container?.scrollTo(0, scrollTop + optionHeight)
//     }

//     if (key === 'ArrowUp') {
//       if (
//         scrollTop !== 0 && 
//         (optionPosition - scrollTop) < optionHeight
//       ) container?.scrollTo(0, scrollTop - optionHeight)
//     }
//   }

//   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     const { key } = e

//     // 첫 번째 keydown 시 두 번 호출됨
//     // https://levelup.gitconnected.com/javascript-events-handlers-keyboard-and-load-events-1b3e46a6b0c3
//     // https://velog.io/@corinthionia/JS-keydown%EC%97%90%EC%84%9C-%ED%95%9C%EA%B8%80-%EC%9E%85%EB%A0%A5-%EC%8B%9C-%EB%A7%88%EC%A7%80%EB%A7%89-%EC%9D%8C%EC%A0%88%EC%9D%B4-%EC%A4%91%EB%B3%B5-%EC%9E%85%EB%A0%A5%EB%90%98%EB%8A%94-%EA%B2%BD%EC%9A%B0-%ED%95%A8%EC%88%98%EA%B0%80-%EB%91%90-%EB%B2%88-%EC%8B%A4%ED%96%89%EB%90%98%EB%8A%94-%EA%B2%BD%EC%9A%B0
//     if (e.nativeEvent.isComposing) return 

//     if (isActiveSearchBox && search_school_data?.length > 0) {
//       switch (key) {
//         case 'ArrowDown':
//           e.preventDefault();
//           handleSearchScroll('ArrowDown');
//           setCursorIndex((prev) => prev + 1 > search_school_data.length - 1 ? prev : prev + 1);
//           break;
//         case 'ArrowUp':
//           e.preventDefault();
//           handleSearchScroll('ArrowUp');
//           setCursorIndex((prev) => prev - 1 < 0 ? prev : prev - 1);
//           break;
//         case 'Enter':
//           e.preventDefault();
//           const target = search_school_data.at(cursorIndex)
//           setIsActiveSearchBox(false)
//           setSchool(target.name)
//           setSchoolId(target.id)
//       }
//     }
//   }

//   return (
//     <>
//       <main className={styles.container} ref={scrollRef}>
//         <section className={styles.form_section}>
//           <div className={styles.main_title}>{mainTitle}</div>
//           <div className={[`${styles.form_box}`, `${styles.search}`].join(" ")}>
//             <label htmlFor="form_school">학교</label>
//             <input
//               type="text"
//               name="school"
//               placeholder="입력해주세요."
//               autoComplete="off"
//               id="form_school"
//               className={styles.form_school}
//               value={school}
//               onChange={handleSchool}
//               onKeyDown={e => handleKeyDown(e)}
//             />
//             {isActiveSearchBox && school.length > 1 && search_school_data?.length > 0 && (
//               <div className={styles.search_result_box}>
//                 <div className={styles.wrap}>
//                 {search_school_data?.map((e: any, index: number) => {
//                   return (
//                     <button
//                       key={e.id}
//                       type="button"
//                       className={[
//                         `${styles.button_result_item}`, 
//                         cursorIndex === index && `${styles.active_option}`
//                       ].join(" ")}
//                       onClick={() => onClickSchool(e.id, e.name)}
//                     >
//                       {e.name}
//                     </button>
//                   )
//                 })}
//                 </div>
//               </div>
//             )}
//             <div className={styles.search_label_info}>* 자동 검색된 학교 리스트 중 하나를 선택해주세요</div>
//           </div>

//           <div className={styles.form_box_grade}>
//             <article className={styles.form_box}>
//               <label>학년</label>
//               <div className={styles.form_radio_box}>
//                 {gradeList.map((e: any) => (
//                   <div key={e.id}>
//                     <input type="radio" name="grade" id={`form_grade_${e.id}`} value={e.id} checked={grade === e.id} onChange={handleClickGrade} />
//                     <label htmlFor={`form_grade_${e.id}`} className={styles.form_radio_label}>
//                       {e.name}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </article>

//             <article className={styles.form_box}>
//               <label>시험</label>
//               <div className={styles.form_radio_box}>
//                 {testList.map((e: any) => (
//                   <div key={e.id}>
//                     <input type="radio" name="test" id={`form_test_${e.id}`} value={e.id} checked={test === e.id} onChange={handleClickTest} />
//                     <label htmlFor={`form_test_${e.id}`} className={styles.form_radio_label}>
//                       {e.name}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </article>
//           </div>

//           <article className={styles.form_box}>
//             <label>필터</label>
//             <div className={styles.form_checkbox_box}>
//               {filterList.map((e: any) => (
//                 <label key={e.id} className={styles.checkbox}>
//                   {e.name}
//                   <input type="radio" name="filter" value={e.id} checked={filter === e.id} onChange={(v) => handleClickFilter(v, e.name)} />
//                   <span className={styles.checkmark}></span>
//                 </label>
//               ))}
//             </div>
//           </article>

//           <div className={styles.button_box}>
//             <button className={styles.button_submit} onClick={handleSubmitForm}>
//               검색하기
//             </button>
//           </div>
//         </section>

//         <div className={styles.divider}></div>

//         <Table
//           title={testPaperList?.title}
//           onPressNaverResotre={handleRestoreNaver}
//           data={testPaperList?.contents}
//           pageData={testPaperList?.page}
//           setPage={setPage}
//           gtmData={gtmData}
//         />
//         {testPaperList?.contents.length === 0 && (
//           <div className={styles.search_result_empty}>
//             <div>검색과 일치하는 데이터가 존재하지 않아요!</div>
//           </div>
//         )}

//         {isOpenLoginModal && (
//           <Modal borderRadius="8px">
//             <LoginModal onClose={onCloseLoginModal} />
//           </Modal>
//         )}
//         {isOpenCommonModal && (
//           <Modal borderRadius="8px">
//             <CommonModal text={commonModalText} onClose={handleCloseCommonModal} />
//           </Modal>
//         )}

//         <button className={styles.button_floating} onClick={() => scrollToTop()}>
//           <Image className={styles.arrow_top_icon} src={ArrowTopIcon} width={22} height={22} alt="arrow_top_icon" />
//         </button>
//       </main>
//       {notPassTicketModal.Modal}
//       {completeRestoreModal.Modal}
//     </>
//   )
// }

// export default Jokbo
