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

<SearchCategory/>
<Recentsearch/>
<Bottombar/>
</>);
}
export default SearchWindow;

// const [searches, setSearches] = useState([
//     "미개봉 아이패드",
//     "자차템",
//     "검색어 입력",
//     "검색어 입력",
//     "검색어 입력",
//   ]);
  
// //   const deleteSearch = (index) => {
// //     setSearches((prev) => prev.filter((_, i) => i !== index));
// //   };

// //   // 전체 삭제
// //   const deleteAll = () => {
// //     setSearches([]);
// //   };
// const fetchRecentSearches = async () => {
   
//     try {
//       const response = await axios.get("/recent-search/list");
//       setSearches(response.data.recentSearches);
//     } catch (err) {
//       console.error(err);
//     } finally {
//     }
//   };

//   // 특정 검색어 삭제
//   const deleteSearch = async (index) => {
//     const recentSearchId = searches[index].recentSearchId;
//     try {
//       await axios.patch(`/recent-search/${recentSearchId}/delete`);
//       setSearches((prev) => prev.filter((_, i) => i !== index));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 전체 삭제
//   const deleteAll = async () => {
//     try {
//       await axios.patch("/recent-search/delete");
//       setSearches([]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 초기 데이터 로드
//   useEffect(() => {
//     fetchRecentSearches();
//   }, []);
