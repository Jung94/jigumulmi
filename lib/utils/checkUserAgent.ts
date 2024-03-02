export const isMobile = () => {
	// return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);  // 안드로이드 아이폰을 검사해 체크
	return /Mobi/i.test(window.navigator.userAgent);  // "Mobi" 가 User agent에 포함되어 있으면 모바일
}

export const checkOS = () => {
	const userAgent = window.navigator.userAgent.toLowerCase(); //userAgent 값 얻기
	
	if ( userAgent.indexOf('android') > -1) {
		return 'Android';
	} else if ( userAgent.indexOf("iphone") > -1 || userAgent.indexOf("ipad") > -1 ||userAgent.indexOf("ipod") > -1 ) {
		return 'IOS';
	} else {
		//아이폰, 안드로이드 외 모바일
		return 'other_than_Android_and_IOS';
	}
}


// export const isDesktopOS = () => {
// 	return ( 'win16|win32|win64|windows|mac|macintel|linux|freebsd|openbsd|sunos'.indexOf(navigator.platform.toLowerCase()) >= 0 );
// }

// https://inpa.tistory.com/entry/JS-📚-웹페이지에-접속하는-기기모바일태블릿PC-구분하기 [Inpa Dev 👨‍💻:티스토리]