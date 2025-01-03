import Topbar from "../../components/common/Topbar/Topbar.tsx";
import Bottombar from "../../components/common/Bottombar/Bottombar.tsx";
import React from "react";
import styles from "./Hcategory.module.css";
import { useParams } from "react-router-dom";
import SearchCategory from "../../components/common/SearchCategory/SearchCategory.tsx";
import Categoryitems from "./Categoryitems.tsx";
import DeliveryType from "./Deliverytype.tsx"
import Back from "./Back.tsx";
const Categoryitem = ({ prob }) => {
  return (
    <div className={styles.Category}>
      <div className={styles.Categorybox}>
        
        {prob} {/* 객체의 값을 렌더링 */}
      </div>
    </div>
  );
};



const Hcategory = () => {
  const { name } = useParams(); // 객체 구조 분해로 name 추출
  return (
    <>
      <Topbar />
      <Back prob="카테고리"/>

      <Categoryitem prob={name} /> {/* prob에 name 값 전달 */}

      <DeliveryType />
      <SearchCategory/>
      <Categoryitems/>
      <Bottombar />
    </>
  );
};

export default Hcategory;
