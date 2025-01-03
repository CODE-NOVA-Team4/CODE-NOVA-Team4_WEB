import React from 'react';
import styles from './Home.module.css';
import fake from '../../../assets/images/Recomfake.svg'
import axios from 'axios';
// const fetchHomeData = async () => {
//     try {
//       // GET 요청
//       const response = await axios.get('/home');
      
//       // 성공적으로 데이터를 받았을 때
//       const { nickname, ...products } = response.data;
  
//       // 데이터 로깅
//       console.log("Nickname:", nickname);
//       console.log("Products:", products);
  
//       // 추가적인 처리 로직 작성 가능
//       return { nickname, products };
  
//     } catch (error) {
//       // 에러 응답 처리
//       if (error.response) {
//         const { status, success, message } = error.response.data;
  
//         console.error("Error Status:", status);
//         console.error("Success:", success);
//         console.error("Message:", message);
  
//         // 에러 핸들링 로직
//         return { error: true, status, message };
//       } else {
//         // 네트워크 오류나 기타 오류 처리
//         console.error("Unexpected Error:", error.message);
//         return { error: true, message: error.message };
//       }
//     }
//   };
const Recom = () => {
    const recommendtype = [
        { name: "전공서적", src: {fake}, description: "대학 전공 서적",price:"20000" },
        { name: "족보", src:  {fake}, description: "시험 대비 족보 자료" ,price:"2000"},
        { name: "학용품", src:  {fake}, description: "노트, 펜 등 학습 도구",price:"200000" },
        { name: "전자기기", src:  {fake}, description: "노트북, 태블릿 등 전자 기기" ,price:"200"},
        { name: "의류", src:  {fake}, description: "일상복, 운동복 등 의류",price:"20" },
      ];
  return <div className={styles.recom}>
            <div className={styles.recomtitle}>추천목록</div>
            <div className={styles.recomcontent}>
                {recommendtype.map((item,index)=>(
                    <div key={index} className={styles.recomitembox}>
                        <img src={fake} alt={item.name} className={styles.recomitemphoto} />
                        <div className={styles.itemname}>{item.name}</div>
                        <div className={styles.itemprice}>{item.price} ₩</div>
                        <div className={styles.itemdescription}>{item.description}</div>

                    </div>

                ))}
            </div>
        </div>;
};

export default Recom;
