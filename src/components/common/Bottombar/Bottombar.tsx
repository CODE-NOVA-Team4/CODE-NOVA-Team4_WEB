import React, { useState } from "react";
import styles from './Bottombar.module.css';
import home from '../../../assets/images/Bottombar-homebutton.svg';
import indicator from '../../../assets/images/Bottombar-indicator.svg';
import {useLocation, useNavigate } from "react-router-dom";

const Bottombar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const segments = location.pathname.split("/"); // ["", "hcategory", "학용품"]
    const tf = (segments[1]==="Home"||segments[1]==="create-product"||segments[1]==="chats")?true:false;
    const [selectedMenu, setSelectedMenu] = useState(0); // 기본 선택은 첫 번째 메뉴
    const handleMenuClick = (index) => {
        setSelectedMenu(index);
        if(index===0)
            navigate("/Home")
        else if(index===1)
            navigate("/create-product")
        else 
        navigate("/chats") // 클릭한 메뉴의 index를 설정
      };
    
    return (
        <div className={styles.bottombar}>
          {tf&&<div className={styles.top}>
        {/* 메뉴 1 */}
        <div
          className={`${styles.menuItem} ${
            selectedMenu === 0 ? styles.selected : ""
          }`}
          onClick={() => handleMenuClick(0)}
        >
          <img src={home} alt="Home" />
        </div>

        {/* 메뉴 2 */}
        <div
          className={`${styles.menuItem} ${
            selectedMenu === 1 ? styles.selected : ""
          }`}
          onClick={() => handleMenuClick(1)}
        >
          <img src={home} alt="Bag" />
        </div>

        {/* 메뉴 3 */}
        <div
          className={`${styles.menuItem} ${
            selectedMenu === 2 ? styles.selected : ""
          }`}
          onClick={() => handleMenuClick(2)}
        >
          <img src={home} alt="Chat" />
        </div>
      </div>}
        </div>
    );
};

export default Bottombar;
