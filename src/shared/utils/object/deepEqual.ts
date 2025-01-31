/**
 * @description 두 객체를 깊게 비교하는 함수
 * @param obj1 첫 번째 객체
 * @param obj2 두 번째 객체
 * @returns 두 객체가 동일하면 true, 그렇지 않으면 false
 */
export function deepEqual<T>(obj1: T, obj2: T): boolean {
  if (typeof obj1 !== typeof obj2) return false; // 1. 타입이 다르면 false 반환
  if (obj1 === null || obj2 === null) return obj1 === obj2; // 2. 두 값이 null인지 확인 (null은 객체지만 특별한 경우)
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return obj1 === obj2; // 3. 값이 객체가 아닌 경우 (문자열, 숫자, boolean 등) 단순 비교

  // 4. 키 정렬 + 두 객체의 키 배열을 비교
  const keys1 = Object.keys(obj1).sort();
  const keys2 = Object.keys(obj2).sort();
  if (keys1.length !== keys2.length) return false;

  // 5. 각 키와 값 재귀적으로 비교
  for (let i = 0; i < keys1.length; i++) {
    if (keys1[i] !== keys2[i]) return false; // 정렬된 키 비교
    if (!deepEqual((obj1 as any)[keys1[i]], (obj2 as any)[keys2[i]])) {
      return false; // 값 재귀 비교
    }
  }

  return true;
}
