// date 형식 변환 ex. '2024-2-5'
export const convertDateIntoDashForm = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};