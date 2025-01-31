"use client"

import { useState } from 'react';
import styles from './calendar.module.scss';
import { Calendar } from 'components/form';

type CalendarProps = {
  startDay: Date | null
  endDay: Date | null
  onChangeStartDay: (date: Date | null)=>void
  onChangeEndDay: (date: Date | null)=>void
  lock?: boolean
  onClose?: ()=>void
}

const PeriodCalendar = ({
  startDay,
  endDay,
  onChangeStartDay,
  onChangeEndDay,
  lock=false,
  onClose
}: CalendarProps) => {
  // https://www.skyscanner.co.kr/

  // const today = startDay ? startDay : new Date();
  // today.setHours(0, 0, 0, 0);

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const [ currentMonth, setCurrentMonth ] = useState<Date>(new Date());
  const nextMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    currentMonth.getDate()
  );
  
  const isSameDay = (today: Date, compareDay: Date | null) => {
    if (
      today.getFullYear() === compareDay?.getFullYear() &&
      today.getMonth() === compareDay?.getMonth() &&
      today.getDate() === compareDay?.getDate()
    ) {
      return true;
    }
    return false;
  };
  
  const onClickDay = (date: Date) => {
    // 시작일 O, 마지막일 X
    if (startDay && !endDay) {
      // 시작일 <= 당일
      if (startDay <= date) return onChangeEndDay(date);
    } 

    // 시작일 X, 마지막일 X
    if (!startDay && !endDay) return onChangeStartDay(date);

    // 시작일 O, 마지막일 O
    if (startDay && endDay) {
      onChangeStartDay(date);
      onChangeEndDay(null);
      return
    }

    return onChangeStartDay(date);
  };
  
  const prevCalendar = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        currentMonth.getDate()
      )
    );
  };
  
  const nextCalendar = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        currentMonth.getDate()
      )
    );
  };
  
  const buildCalendarDays = (targetMonth: Date) => {
    const curMonthStartDate = new Date(
      targetMonth.getFullYear(),
      targetMonth.getMonth(),
      1
    ).getDay();
    const curMonthEndDate = new Date(
      targetMonth.getFullYear(),
      targetMonth.getMonth() + 1,
      0
    );
    const prevMonthEndDate = new Date(
      targetMonth.getFullYear(),
      targetMonth.getMonth(),
      0
    );
      
    const nextMonthStartDate = new Date(
      targetMonth.getFullYear(),
      targetMonth.getMonth() + 1,
      1
    );

    const days: Date[] = Array.from({ length: curMonthStartDate }, (_, i) => {
      return new Date(
        targetMonth.getFullYear(),
        targetMonth.getMonth() - 1,
        prevMonthEndDate.getDate() - i
      );
    }).reverse();

    days.push(
      ...Array.from(
        { length: curMonthEndDate.getDate() },
        (_, i) =>
        new Date(targetMonth.getFullYear(), targetMonth.getMonth(), i + 1)
      )
    );

    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      days.push(
        ...Array.from(
        { length: remainingDays },
        (_, i) =>
          new Date(
          nextMonthStartDate.getFullYear(),
          nextMonthStartDate.getMonth(),
          i + 1
          )
        )
      );
    }
    return days;
  };
  
  const buildCalendarTag = (calendarDays: Date[], targetMonth: Date) => {
    return calendarDays.map((day: Date, i: number) => {
      // 해당 월이 아닌 이전 및 이후 월의 일자는 보이지 않게 한다.
      if (day.getMonth() < targetMonth.getMonth()
      || day.getMonth() > targetMonth.getMonth()
      ) return <div key={i} className={`${styles.td}`}></div>

      // startDay ~ endDay : 배경색 연한 블루
      // 같은 월, 일 이지만 시간이 다른 경우는 넘어가게 해야 한다.
      if (startDay && endDay && startDay < day && day < endDay && (!(day.getFullYear() === endDay.getFullYear() && day.getMonth() === endDay.getMonth() && day.getDate() === endDay.getDate()))) {
        return (
          <div 
            key={i}
            className={`
              ${styles.td} ${styles.is_between_day}
            `}>
            <div 
              className={`${styles.td_inner}`} 
              onClick={() => onClickDay(day)}
            >
            {day.getDate()}
            </div>
          </div>
        )
      }

      // 그 외 해당 월의 모든 일자
      return (
        <div 
          key={i} 
          className={`
            ${styles.td} 
            ${isSameDay(day, startDay) && styles.start_day}
            ${isSameDay(day, endDay) && styles.end_day}
            ${(startDay && endDay) && (isSameDay(day, startDay) || isSameDay(day, endDay)) && styles.is_between_day}
          `}
        >
          <div 
            className={`${styles.td_inner} ${(isSameDay(day, startDay) || isSameDay(day, endDay)) && styles.is_same_day}`} 
            onClick={() => onClickDay(day)}
          >
          {day.getDate()}
          </div>
        </div>
      );
    });
  };
  
  // 일주일 단위로 분배
  const divideWeek = (calendarTags: JSX.Element[]) => {
    return calendarTags.reduce(
      (acc: JSX.Element[][], day: JSX.Element, i: number) => {
        if (i % 7 === 0) acc.push([day]);
        else acc[acc.length - 1].push(day);
        return acc;
      },
      []
    );
  };

  // 월 캘린더 (ex. 1 ~ 31일) 생성
  const createCalendarRows = (targetMonth: Date) => {
    const calendarDays = buildCalendarDays(targetMonth);
    const calendarTags = buildCalendarTag(calendarDays, targetMonth);
    const calendarRows = divideWeek(calendarTags);

    return calendarRows;
  };
  
  
  const currentMonthRows = createCalendarRows(currentMonth);
  const nextMonthRows = createCalendarRows(nextMonth);

  
  return (
    <div className={styles.container}>
      <div className={styles.calendars_wrap}>
        <div className={styles.calendar}>
          <div className={styles.calendar_nav}>
            <button
              data-testid="prevMonth"
              onClick={prevCalendar}
              className={`${styles.prev_month_button} ${styles.month_button}` }
            >
              {/* &lt; */}
                <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.8203 7.30625L11.1266 14L17.8203 20.6938L15.7495 22.75L6.99948 14L15.7495 5.25L17.8203 7.30625Z" fill="#555555"/>
                </svg>
            </button>
            <div className={styles.calendar_nav_title}>
              {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
            </div>
          </div>

          <div className={`${styles.table} ${lock && styles.lock}`}>
            <div className={styles.thead}>
              <div className={styles.tr}>
                {daysOfWeek.map((day, i) => (
                  <div className={styles.th} key={i} data-testid="calendarHead">
                    {day}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.tbody}>
              {currentMonthRows.map((row: JSX.Element[], i: number) => (
                <div className={styles.tr} key={i}>{row}</div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.calendar}>
          <div className={styles.calendar_nav}>
            <div className={styles.calendar_nav_title}>
              {nextMonth.getFullYear()}년 {nextMonth.getMonth() + 1}월
            </div>
            <button
              data-testid="nextMonth"
              onClick={nextCalendar}
              className={`${styles.next_month_button} ${styles.month_button}` }
            >
              {/* &gt; */}
                <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.75 20.6938L15.4437 14L8.75 7.30625L10.8208 5.25L19.5708 14L10.8208 22.75L8.75 20.6938Z" fill="#555555"/>
                </svg>
            </button>
          </div>

          <div className={`${styles.table} ${lock && styles.lock}`}>
            <div className={styles.thead}>
              <div className={styles.tr}>
                {daysOfWeek.map((day, i) => (
                  <div className={styles.th} key={i} data-testid="calendarHead">
                    {day}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.tbody}>
              {nextMonthRows.map((row: JSX.Element[], i: number) => (
                <div className={styles.tr} key={i}>{row}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.display_wrap}>
        <Calendar.input readonly date={startDay} name='시작일' />
        <Calendar.input readonly date={endDay} name='마감일' />
      </div>
    </div>
  );
};

export default PeriodCalendar;