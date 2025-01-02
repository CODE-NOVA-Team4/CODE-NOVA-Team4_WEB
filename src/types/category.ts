export type Category = {
    id: string;
    name: string;
  };
  
  export const CATEGORIES: Category[] = [
    { id: 'textbook', name: '전공서적' },
    { id: 'pastexam', name: '족보' },
    { id: 'stationery', name: '학용품' },
    { id: 'electronics', name: '전자기기' },
    { id: 'clothing', name: '의류' },
    { id: 'daily', name: '생활용품' },
    { id: 'hobby', name: '취미/여가' },
    { id: 'sports', name: '운동용품' },
    { id: 'etc', name: '기타' }
  ];