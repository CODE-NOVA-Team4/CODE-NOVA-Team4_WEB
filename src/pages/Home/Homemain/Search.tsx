import React from "react";
import styles from './Home.module.css';
import Q from '../../../assets/images/Home-Homemain-Q.svg'
import V from '../../../assets/images/Home-Homemain-v.svg'
const Search = () => {
    
  return (
    <div className={styles.search}>
        <div className={styles.searchbox}>
            <div className={styles.circle}></div>
            <input type="text"className={styles.searchcontent}
            placeholder="검색어를 입력하세요" />
            <img src={V} alt="" className={styles.searchvector} />
        </div>
        <img src={Q} alt="돋보기" className={styles.q} />
    </div>
  );
};

export default Search;
