import React from 'react';
import styles from './Home.module.css';
import { useNavigate } from "react-router-dom";
import one from "../../../assets/images/Home-Category-one.svg"
import two from "../../../assets/images/Home-Category-two.svg"
import three from "../../../assets/images/Home-Category-three.svg"
import four from "../../../assets/images/Home-Category-four.svg"
import five from "../../../assets/images/Home-Category-four.svg"

const Category = () => {
    const categories = [
        { name: "전공서적", src: one, description: "대학 전공 서적" },
        { name: "족보", src: two, description: "시험 대비 족보 자료" },
        { name: "학용품", src: three, description: "노트, 펜 등 학습 도구" },
        { name: "전자기기", src: four, description: "노트북, 태블릿 등 전자 기기" },
        { name: "의류", src: five, description: "일상복, 운동복 등 의류" },
      ];
      const navigate = useNavigate();
      const handleCategoryClick = (name) => {
        navigate(`/hcategory/${name}`); // 클릭 시 Hcategory로 이동
      };
  return <div className={styles.category}>
            <div className={styles.categorytitle}>
                카테고리 바로가기
            </div>
            <div className={styles.categorytype}>
                {categories.map((Category,index)=>(
                    <div key={index} className={styles.itembox}
                    onClick={()=>handleCategoryClick(Category.name)}>
                        <div className={styles.typeimage}>
                            {/* <div className={styles.fakecircle}>

                            </div> */}
                            <img src={Category.src} alt={Category.name} className={styles.fakecircle}/>
                        </div>
                        <div className={styles.typename}>{Category.name}</div>
                    </div>
                ))}
            </div>
        </div>;
};

export default Category;
