import styles from "./Profile.module.css"
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import one from "../../assets/images/Home-Category-one.svg"
import two from "../../assets/images/Home-Category-two.svg"
import three from "../../assets/images/Home-Category-three.svg"
import four from "../../assets/images/Home-Category-four.svg"
import five from "../../assets/images/Home-Category-four.svg"

const Profilecontent = ({name}) => {
    const categories = [
        { name: "전공서적", src: one, day: "3", price:"15,000" },
        { name: "족보", src: two, day: "2", price:"15,000" },
        { name: "학용품", src: three, day: "1", price:"15,000" },
        { name: "전자기기", src: four, day: "4", price:"15,000" },
        { name: "의류", src: five, day: "5", price:"15,000" },
    ];
    
    const number = name === "구매 내역" ? 1 : 2;
    const navigate = useNavigate();
    const location = useLocation();
    const isVertical = location.pathname === '/Profile/1' || location.pathname === '/Profile/2';

    const handleClick = () => {
        const newPath = `${location.pathname}/${number}`;
        navigate(newPath);
    };
    
    return (
        <div className={styles.profilecontent}>
            <div className={styles.contenttitle}>
                <div className={styles.expense}>{name}</div>
                {!isVertical && <div className={styles.expenseplus} onClick={handleClick}>더보기</div>}
            </div>
            <div className={isVertical ? styles.contentcontentVertical : styles.contentcontent}>
                {categories.map((item, index) => (
                    <div key={index} className={styles.contentitem}>
                        <img src={item.src} alt={item.name} className={styles.contentitemimg} />
                        <div className={styles.itemname}>{item.name}</div>
                        <div className={styles.iteminfo}>
                            <div className={styles.itemday}>{item.day}일 전</div>
                            <div className={styles.itemprice}>{item.price}₩</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profilecontent;