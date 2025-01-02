import React from 'react';
import styles from './SearchCategory.module.css';

const SearchCategory = ()=>{
    return (
       <div className={styles.searchBox}>
         <div className={styles.searchBar}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="검색어를 입력해주세요"
          />
          <div className={styles.searchButton}></div>
        </div>
       </div>
      );
}


export default SearchCategory;