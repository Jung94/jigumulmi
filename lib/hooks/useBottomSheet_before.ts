"use client";

import { useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { update_is_shown } from '../store/modules/bottom-sheet';

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number; // touchstart에서 BottomSheet의 최상단 모서리의 Y값
    touchY: number; // touchstart에서 터치 포인트의 Y값
  };
  touchMove: {
    movingDirection: "none" | "down" | "up"; // 유저가 터치를 움직이고 있는 방향 
  };
  status: "close" | "open";
  isContentAreaTouched: boolean;
}

const useBottomSheet = () => {
  const dispatch = useAppDispatch();
  const wrapperHeight = 360;
  const headerHeight = 30;
  const searchHeight = 45;
  // const MIN_Y = 200; // 바텀시트가 최대로 높이 올라갔을 때의 y 값
  const MIN_Y = innerHeight - wrapperHeight; // 바텀시트가 최대로 높이 올라갔을 때의 y 값
  // const MAX_Y = window.innerHeight - 130; // 바텀시트가 최소로 내려갔을 때의 y 값
  const MAX_Y = 0; // 바텀시트가 최소로 내려갔을 때의 y 값

  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  // const isShownBottomSheet = useAppSelector(((state) => state.bottomSheet.isShown));
  
  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      movingDirection: "none",
    },
    status: "close",
    isContentAreaTouched: false,
  });
    
  // Touch Event 핸들러들을 등록한다. 
  useEffect(() => {
    if (!sheetRef.current || !contentRef.current) return;

    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;
    
      // 바텀시트에서 컨텐츠 영역이 아닌 부분을 터치하면 항상 바텀시트를 움직입니다. 
      if (!isContentAreaTouched) {
        return true;
      }
    
      // 바텀시트가 올라와있는 상태가 아닐 때는 컨텐츠 영역을 터치해도 바텀시트를 움직이는 것이 자연스럽습니다. 
      // if (sheetRef.current.getBoundingClientRect().y !== MIN_Y) {
      //   return true;
      // }
    
      if (touchMove.movingDirection === 'down') {
    
        // 스크롤을 더 이상 올릴 것이 없다면, 바텀시트를 움직이는 것이 자연스럽습니다. 
        // Safari 에서는 bounding 효과 때문에 scrollTop 이 음수가 될 수 있습니다. 따라서 0보다 작거나 같음 (<=)으로 검사합니다. 
        // return contentRef.current.scrollTop <= 0;
      }
      
      return false;
    }
    
    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;

      touchStart.sheetY = sheetRef.current.getBoundingClientRect().y; // 376
      touchStart.touchY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove, status } = metrics.current;
      const currentTouch = e.touches[0];
    
      if (touchStart.touchY < currentTouch.clientY) { // touchStart.sheetY -> touchStart.touchY
        touchMove.movingDirection = 'down';
      }
                                                      
      if (touchStart.touchY > currentTouch.clientY) { // touchStart.sheetY -> touchStart.touchY
        touchMove.movingDirection = 'up';
      }
      
      if (canUserMoveBottomSheet()) {
         
        // content에서 scroll이 발생하는 것을 막습니다. 
        e.preventDefault();
    
        // 터치 시작점에서부터 현재 터치 포인트까지의 변화된 y값
        const touchOffset = currentTouch.clientY - touchStart.touchY;
        let nextSheetY = touchStart.touchY + touchOffset; // touchStart.sheetY -> touchStart.touchY
        
        // nextSheetY 는 MIN_Y와 MAX_Y 사이의 값으로 clamp 되어야 한다
        if (nextSheetY <= MIN_Y) {
          nextSheetY = MIN_Y;
        }
                                
        if (nextSheetY >= MAX_Y) {
          nextSheetY = MAX_Y;
        }

        if (status === "open" && touchStart.touchY > currentTouch.clientY) return;
          
        // sheet 위치 갱신. 
        sheetRef.current.style.setProperty('transform', `translateY(${nextSheetY - MAX_Y}px)`);
      } else {
        
        // 컨텐츠를 스크롤하는 동안에는 body가 스크롤되는 것을 막습니다
        document.body.style.overflowY = 'hidden';
      }
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      const { touchMove } = metrics.current;

      document.body.style.overflowY = 'auto';

      if (canUserMoveBottomSheet()) {
        if (touchMove.movingDirection === 'down') {
          dispatch(update_is_shown(false));
          sheetRef.current.style.setProperty('transform', 'translateY(0)');
          metrics.current = { ...metrics.current, status: "close" };
        }
    
        if (touchMove.movingDirection === 'up') {
          dispatch(update_is_shown(true));
          // sheetRef.current.style.setProperty('transform', `translateY(-${wrapperHeight - headerHeight}px)`);
          sheetRef.current.style.setProperty('transform', `translateY(-${wrapperHeight}px)`);
          metrics.current = { ...metrics.current, status: "open" }
        }
      }
    
      // metrics 초기화.
      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          movingDirection: "none",
        },
        status: metrics.current.status,
        isContentAreaTouched: false
      };
    };
    
    sheetRef.current.addEventListener('touchstart', handleTouchStart);
    sheetRef.current.addEventListener('touchmove', handleTouchMove);
    sheetRef.current.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      if (!sheetRef.current) return;

      sheetRef.current.removeEventListener('touchstart', handleTouchStart);
      sheetRef.current.removeEventListener('touchmove', handleTouchMove);
      sheetRef.current.removeEventListener('touchend', handleTouchEnd);
    }
  }, [])

  // content 영역을 터치하는 것을 기록합니다.
  useEffect(() => {
    if (!contentRef.current) return;

    const handleTouchStart = () => {
      metrics.current.isContentAreaTouched = true;
    }
    
    contentRef.current.addEventListener('touchstart', handleTouchStart);
    
    return () => {
      if (!contentRef.current) return;

      contentRef.current.removeEventListener('touchstart', handleTouchStart);
    }
  }, []);
  
  return { sheetRef, contentRef };
};

export default useBottomSheet;