import React, { useState } from "react";
import styles from "./Hcategory.module.css";

const Deliverytype = ({name}) => {
  const [selectedDelivery, setSelectedDelivery] = useState(null); // 직거래/택배
  const [selectedCategories, setSelectedCategories] = useState(
    Array(9).fill(false) // 9가지 항목 선택 상태 초기화
  );
  const visiable= name===""?true:false
  const handleDeliveryClick = (type) => {
    setSelectedDelivery((prev) => (prev === type ? null : type)); // 같은 버튼 클릭 시 선택 해제
  };

  const handleCategoryClick = (index) => {
    setSelectedCategories((prev) => {
      const newCategories = [...prev];
      newCategories[index] = !newCategories[index]; // 선택 상태 토글
      return newCategories;
    });
  };

  const categories = [
    "전공서적",
    "족보",
    "학용품",
    "전자기기",
    "의류",
    "운동기구",
    "도서",
    "취미용품",
    "음반",
  ];

  return (
    <div className={styles.container}>
      {/* 직거래/택배 버튼 */}
      <div className={styles.toggleContainer}>
        <button
          className={`${styles.button} ${
            selectedDelivery === "직거래" ? styles.active : ""
          }`}
          onClick={() => handleDeliveryClick("직거래")}
        >
          직거래
        </button>
        <button
          className={`${styles.button} ${
            selectedDelivery === "택배" ? styles.active : ""
          }`}
          onClick={() => handleDeliveryClick("택배")}
        >
          택배
        </button>
      </div>

      {/* 카테고리 버튼 */}
      {visiable&&<div className={styles.categoryContainer}>
        {categories.map((category, index) => (
          <button
            key={index}
            className={`${styles.categoryButton} ${
              selectedCategories[index] ? styles.activeCategory : ""
            }`}
            onClick={() => handleCategoryClick(index)}
          >
            {category}
          </button>
        ))}
      </div>}
    </div>
  );
};

export default Deliverytype;
