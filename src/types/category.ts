import one from "../assets/images/Home-Category-one.svg";
import two from "../assets/images/Home-Category-two.svg";
import three from "../assets/images/Home-Category-three.svg";
import four from "../assets/images/Home-Category-four.svg";
import five from "../assets/images/Home-Category-five.svg";
import six from "../assets/images/Home-Category-six.svg";
import seven from "../assets/images/Home-Category-seven.svg";
import eight from "../assets/images/Home-Category-eight.svg";
import nine from "../assets/images/Home-Category-nine.svg";

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export const CATEGORIES: Category[] = [
  { id: 'textbook', name: '전공서적', icon: one },
  { id: 'pastexam', name: '족보', icon: two },
  { id: 'stationery', name: '학용품', icon: three },
  { id: 'electronics', name: '전자기기', icon: four },
  { id: 'clothing', name: '의류', icon: five },
  { id: 'daily', name: '생활용품', icon: six },
  { id: 'hobby', name: '취미/여가', icon: seven },
  { id: 'sports', name: '운동용품', icon: eight },
  { id: 'etc', name: '기타', icon: nine }
];