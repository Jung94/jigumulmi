"use clinet"

import { useState, useRef } from 'react';
import styles from './form-section.module.scss';
import { Input } from '@/components/admin/form';

export type KakaoSearchedDocument = {
  address_name: string
  category_group_code: string
  category_group_name: string
  category_name: string
  distance: string
  id: string
  phone: string
  place_name: string
  place_url: string
  road_address_name: string
  x: string
  y: string
}

export default function PlaceSearch({ handleSelect }: { handleSelect: (data: KakaoSearchedDocument)=>void}) {
  const categories = ["FD6", "CE7", "CT1"]; // 음식점, 카페, 문화시설
  const searchRef = useRef<HTMLInputElement>(null);
  const [options, setOptions] = useState<KakaoSearchedDocument[]>([]);
  const [isShownOptionBox, setIsShownOptionBox] = useState(false);

  const handleCloseOption = () => setIsShownOptionBox(false);

  const handleClickOption = (data: KakaoSearchedDocument) => {
    handleSelect(data);
    setIsShownOptionBox(false);
  };

  const handleSearchPlace = (keyword: string) => {
    async function fetchPosts() {
      let res = await fetch(`https://dapi.kakao.com/v2/local/search/keyword?query=${keyword}`, {
        method: "GET",
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}`
        }
      });
      let data = await res.json();
      
      if (data?.documents) {
        let filteredOptions = data.documents.filter((arr: KakaoSearchedDocument) => categories.some(v => v === arr.category_group_code));
        filteredOptions = filteredOptions.filter((arr: KakaoSearchedDocument) => arr.place_name.includes(keyword));
        setOptions(filteredOptions);
      }
    }
    if (keyword) {
      fetchPosts();
      setIsShownOptionBox(true);
    } else {
      setOptions([]);
    }
  };

  const handleKeyDownKeyword = (e: React.KeyboardEvent<Element>) => {
    const { code, nativeEvent } = e;
    if (nativeEvent.isComposing || !searchRef?.current?.value) return;
    if (code === 'Enter') handleSearchPlace(searchRef?.current?.value);
  };

  return (
    <div className={styles["place-search"]}>
      {isShownOptionBox &&
        <div className={styles["place-search-backdrop"]} onClick={handleCloseOption}></div>
      }
      <Input 
        ref={searchRef}
        type='text' 
        name='장소 검색' 
        onKeyDown={(e) => handleKeyDownKeyword(e)} 
        style={{fontSize: '0.875rem', zIndex: '1'}} 
      />
      {isShownOptionBox &&
        <div className={styles["place-search-option-box"]}>
          {!!options.length
            ? (options.map((option: KakaoSearchedDocument) => {
              return (
                <div key={option.id} className={styles["place-search-option-item"]} onClick={()=>handleClickOption(option)}>
                  <div className={styles["place-search-option-item-name"]}>{option.place_name}</div>|
                  <div className={styles["place-search-option-item-category"]}>{option.category_group_name}</div>|
                  <div className={styles["place-search-option-item-address"]}>{option.road_address_name}</div>
                </div>
              )
            }))
            : <span>검색 결과가 없습니다.</span>
          }
        </div>
      }
    </div>
  )
}