import Topbar from "../../components/common/Topbar/Topbar.tsx";
import Bottombar from "../../components/common/Bottombar/Bottombar.tsx";
import React, { useState } from "react";
import styles from "./Hcategory.module.css";
import { useParams } from "react-router-dom";
import SearchCategory from "../../components/common/SearchCategory/SearchCategory.tsx";
import heart from "../../assets/images/Hcategory-heart.svg"
const Categoryitem = ({ prob }) => {
  const cate = "카테고리 > ";
  return (
    <div className={styles.Category}>
      <div className={styles.Categorybox}>
        {cate}
        {prob} {/* 객체의 값을 렌더링 */}
      </div>
    </div>
  );
};

const Deliverytype = () => {
  const [selected, setSelected] = useState("직거래"); // 초기 선택 버튼 설정

  const handleClick = (type) => {
    setSelected(type); // 클릭한 버튼의 타입을 활성화
  };
  return (
    <div className={styles.toggleContainer}>
      <button
        className={`${styles.button} ${
          selected === "직거래" ? styles.active : ""
        }`}
        onClick={() => handleClick("직거래")}
      >
        직거래
      </button>
      <button
        className={`${styles.button} ${
          selected === "택배" ? styles.active : ""
        }`}
        onClick={() => handleClick("택배")}
      >
         택   배 
      </button>
    </div>
  );
};
const Categoryitems = () =>{
    const categories = [
        { name:"미개봉 로봇 공학 전자 서적", src: "/images/major-books.png",time:"22시간전",heart:"3",price:"12,000"  },
        { name: "미개봉 로봇 공학 전자 서적", src: "/images/cheatsheets.png",time:"22시간전",heart:"3",price:"12,000"  },
        { name: "미개봉 로봇 공학 전자 서적", src: "/images/stationery.png",time:"22시간전",heart:"3",price:"12,000" },
        { name: "미개봉 로봇 공학 전자 서적", src: "/images/electronics.png",time:"22시간전",heart:"3",price:"12,000"  },
        { name: "미개봉 로봇 공학 전자 서적", src: "/images/clothing.png",time:"22시간전",heart:"3",price:"12,000" },
      ];
    return(<div className={styles.categoryitemsbox}>
                {categories.map((Category,index)=>(
                    <div key={index} className={styles.itembox}>
                        <div className={styles.circle}></div>
                        <div className={styles.information}>
                            <div className={styles.typename}>{Category.name}</div>
                            <div className={styles.price}>{Category.price}</div>
                            <div className={styles.time}>{Category.time}</div>
                            <div className={styles.heart}><img src={heart} alt="heart"></img>{Category.heart}</div>

                        </div>
                    </div>
                ))}    </div>)
}
const Hcategory = () => {
  const { name } = useParams(); // 객체 구조 분해로 name 추출
  return (
    <>
      <Topbar />
      <Categoryitem prob={name} /> {/* prob에 name 값 전달 */}
      <Deliverytype />
      <SearchCategory/>
      <Categoryitems/>
      <Bottombar />
    </>
  );
};

export default Hcategory;
