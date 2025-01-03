import React from 'react';
import styles from './Home.module.css';
import { useNavigate } from "react-router-dom";
import one from "../../../assets/images/Home-Category-one.svg"
import two from "../../../assets/images/Home-Category-two.svg"
import three from "../../../assets/images/Home-Category-three.svg"
import four from "../../../assets/images/Home-Category-four.svg"
import five from "../../../assets/images/Home-Category-four.svg"
import axios from 'axios';

const Category = () => {
    const categories = [
        { name: "전공서적", src: one,  },
        { name: "족보", src: two,  },
        { name: "학용품", src: three, },
        { name: "전자기기", src: four,  },
        { name: "의류", src: five,  },
        { name: "생활용품", src: five, },
        { name: "취미/여가", src: five, },
        { name: "운동용품", src: five, },
        { name: "기타", src: five, },
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
