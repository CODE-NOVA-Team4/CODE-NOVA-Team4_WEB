import Topbar from "../../components/common/Topbar/Topbar.tsx";
import Bottombar from "../../components/common/Bottombar/Bottombar.tsx";
import React, { useState } from "react";
import styles from "./SearchWindow.module.css"
import SearchCategory from "../../components/common/SearchCategory/SearchCategory.tsx";
const Recentsearch = ()=>{
    const [searches, setSearches] = useState([
        "미개봉 아이패드",
        "자차템",
        "검색어 입력",
        "검색어 입력",
        "검색어 입력",
      ]);
      const deleteSearch = (index) => {
        setSearches((prev) => prev.filter((_, i) => i !== index));
      };
    
      // 전체 삭제
      const deleteAll = () => {
        setSearches([]);
      };
      return (
        <div className={styles.recentsearch}>
          {/* 상단 제목 */}
          <div className={styles.top}>
            <div className={styles.title}>최근 검색</div>
            <div className={styles.delete} onClick={deleteAll}>
              전체 삭제
            </div>
          </div>
    
          {/* 검색어 리스트 */}
          <div className={styles.content}>
            {searches.map((search, index) => (
              <div key={index} className={styles.searchItem}>
                <span className={styles.searchText}>{search}</span>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteSearch(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      );
}
const SearchWindow = () =>{
    return(<>
<Topbar/>
<div style={{ paddingTop: "calc(50px)" }}></div>

<SearchCategory/>
<Recentsearch/>
<Bottombar/>
</>);
}
export default SearchWindow;