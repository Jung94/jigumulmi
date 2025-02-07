"use client"

import { useState } from 'react'
import styles from './calendar.module.scss'

type CalendarProps = {
  selectedDay?: any
  setSelectedDay?: any
  isPrevMonth?: any
  isNextMonth?: any
  startDay?: Date
  lock?: boolean
  onClose?: ()=>void
}

const Calendar = ({
  selectedDay,
  setSelectedDay,
  isPrevMonth,
  isNextMonth,
  startDay,
  lock=false,
  onClose
}: CalendarProps) => {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const [currentMonth, setCurrentMonth] = useState<Date>(
    selectedDay ? selectedDay : new Date()
    );
  
  const today = startDay ? startDay : new Date();
  today.setHours(0, 0, 0, 0);
  
  const isSameDay = (toDay: Date, compareDay?: Date | null) => {
    if (
      toDay.getFullYear() === compareDay?.getFullYear() &&
      toDay.getMonth() === compareDay?.getMonth() &&
      toDay.getDate() === compareDay?.getDate()
    ) {
      return true;
    }
    return false;
  };
  
  const onClickDay = (day: Date) => {
    if (isSameDay(day, selectedDay)) {
      // setSelectedDay(null);  // 선택한 날을 다시 클릭했을 때 선택을 비활성화(삭제)시킴
      setSelectedDay(day);
    } else {
      setSelectedDay(day);

      if (onClose) onClose()
    }
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
  
  const buildCalendarDays = () => {
    const curMonthStartDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();
    const curMonthEndDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const prevMonthEndDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0
    );
    const nextMonthStartDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );
    const days: Date[] = Array.from({ length: curMonthStartDate }, (_, i) => {
      return new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        prevMonthEndDate.getDate() - i
      );
    }).reverse();

    days.push(
      ...Array.from(
        { length: curMonthEndDate.getDate() },
        (_, i) =>
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
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
  
  const buildCalendarTag = (calendarDays: Date[]) => {
    return calendarDays.map((day: Date, i: number) => {
      if (day.getMonth() < currentMonth.getMonth()) {
        return (
          <div key={i} className={`${styles.td} ${styles.prev_month_day}`}>
              {isPrevMonth ? day.getDate() : ""}
          </div>
        );
      }
      if (day.getMonth() > currentMonth.getMonth()) {
        return (
          <div key={i} className={`${styles.td} ${styles.next_month_day}`}>
              {isNextMonth ? day.getDate() : ""}
          </div>
        );
      }
      if (day < today) {
        return (
          <div key={i} className={`${styles.td} ${styles.prev_day}`}>
            <div className={styles.td_inner} onClick={() => !lock && onClickDay(day)}>
              {day.getDate()}
            </div>
          </div>
        );
      }
      return (
        <div key={i} className={`${styles.td} ${styles.future_day}`}>
          <div 
            className={`${styles.td_inner} ${isSameDay(day, selectedDay) && styles.choice_day} ${lock && styles.lock_td}`} 
            onClick={() => !lock && onClickDay(day)}
          >
          {day.getDate()}
          </div>
        </div>
      );
    });
  };
  
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
  
  const calendarDays = buildCalendarDays();
  const calendarTags = buildCalendarTag(calendarDays);
  const calendarRows = divideWeek(calendarTags);
  
  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        <div className={styles.calendar_nav}>
          {!lock &&
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
          }
          <div className={styles.calendar_nav_title}>
            {currentMonth.getFullYear()}. {currentMonth.getMonth() + 1}
          </div>
          {!lock &&
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
          }
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
            {calendarRows.map((row: JSX.Element[], i: number) => (
              <div className={styles.tr} key={i}>{row}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

type InputProps = {
  date: Date,
  hour?: number,
  name?: string,
  disabled?: boolean
  onClick?: (e: any)=>void
  style?: any
}

const Input = ({date, hour, name, disabled, onClick, style}: InputProps) => {
  const _date = new Date(date)

  return (
    <div className={styles.container_input} style={style}>
      <label className={styles.label}>
        {name && 
          <div className={styles.label_name}>{name}</div>
        }
        <div className={styles.input_wrap}>
          <div 
            className={`${styles.input} ${disabled && styles.disabled}`} 
            onClick={onClick && onClick}
          >
            <span>{_date.getFullYear()}</span>
            .
            <span>{_date.getMonth() + 1}</span>
            .
            <span>{_date.getDate()}</span>
            {hour &&
              <>
                &nbsp;
                <span>{hour}:00</span>
              </>
            }
          </div>
        </div>
      </label>
    </div>
  )
}

type FilterProps = {
  date: Date | '',
  name?: string,
  hasHour?: boolean
  onClick?: (v: any)=>void
  style?: any
}

const Filter = ({date, name, hasHour, onClick}: FilterProps) => {
  const _date = date ? new Date(date) : '전체'

  return (
    <div className={styles.container_filter}>
      <label className={styles.label}>
        <div className={styles.label_name}>
          {name && name}
        </div>
        <div className={styles.input_wrap}>
          <div 
            className={`${styles.input}`} 
            onClick={onClick && onClick}
          >
            {_date === '전체'
              ? <span>{_date}</span>
              : (
                <>
                  <span>{_date.getFullYear()}</span>
                  .
                  <span>{_date.getMonth() + 1}</span>
                  .
                  <span>{_date.getDate()}</span>
                  {hasHour &&
                    <>
                      &nbsp;
                      <span>{_date.getHours()}:00</span>
                    </>
                  }
                </>
              )
            }
            
          </div>
        </div>
      </label>
    </div>
  )
}

Calendar.input = Input
Calendar.filter = Filter

export default Calendar