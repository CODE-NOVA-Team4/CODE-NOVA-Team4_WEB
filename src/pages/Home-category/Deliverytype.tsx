import React, { useState } from "react";
import styles from "./Hcategory.module.css";

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
  export default Deliverytype;
