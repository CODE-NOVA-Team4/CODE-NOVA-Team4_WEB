import React from 'react';
import styles from './Home.module.css';

const Category = () => {
    const categories = [
        { name: "전공서적", src: "/images/major-books.png", description: "대학 전공 서적" },
        { name: "족보", src: "/images/cheatsheets.png", description: "시험 대비 족보 자료" },
        { name: "학용품", src: "/images/stationery.png", description: "노트, 펜 등 학습 도구" },
        { name: "전자기기", src: "/images/electronics.png", description: "노트북, 태블릿 등 전자 기기" },
        { name: "의류", src: "/images/clothing.png", description: "일상복, 운동복 등 의류" },
      ];
  return <div className={styles.category}>
            <div className={styles.categorytitle}>
                카테고리 바로가기
            </div>
            <div className={styles.categorytype}>
                {categories.map((Category,index)=>(
                    <div key={index} className={styles.itembox}>
                        <div className={styles.typeimage}>
                            {/* 임시 원원 */}
                            <div className={styles.fakecircle}></div>
                        </div>
                        <div className={styles.typename}>{Category.name}</div>
                    </div>
                ))}
            </div>
        </div>;
};

export default Category;
