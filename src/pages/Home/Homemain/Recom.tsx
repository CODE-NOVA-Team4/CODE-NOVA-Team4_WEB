import React from 'react';
import styles from './Home.module.css';
import fake from '../../../assets/images/Recomfake.svg'
const Recom = () => {
    const recommendtype = [
        { name: "전공서적", src: {fake}, description: "대학 전공 서적",price:"20000" },
        { name: "족보", src:  {fake}, description: "시험 대비 족보 자료" ,price:"2000"},
        { name: "학용품", src:  {fake}, description: "노트, 펜 등 학습 도구",price:"200000" },
        { name: "전자기기", src:  {fake}, description: "노트북, 태블릿 등 전자 기기" ,price:"200"},
        { name: "의류", src:  {fake}, description: "일상복, 운동복 등 의류",price:"20" },
      ];
  return <div className={styles.recom}>
            <div className={styles.recomtitle}>추천목록록</div>
            <div className={styles.recomcontent}>
                {recommendtype.map((item,index)=>(
                    <div key={index} className={styles.recomitembox}>
                        <img src={fake} alt={item.name} className={styles.recomitemphoto} />
                        <div className={styles.itemname}>{item.name}</div>
                        <div className={styles.itemprice}>{item.price}</div>
                        <div className={styles.itemdescription}>{item.description}</div>

                    </div>

                ))}
            </div>
        </div>;
};

export default Recom;
