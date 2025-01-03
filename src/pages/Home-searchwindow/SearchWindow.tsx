import Bottombar from "../../components/common/Bottombar/Bottombar.tsx";
import React, { useState,useEffect } from "react";
import styles from "./SearchWindow.module.css"
import SearchCategory from "../../components/common/SearchCategory/SearchCategory.tsx";
import axios from "axios";
interface RecentsearchProps {
  recentSearchId: string; // recentSearchId는 문자열
  recentSearch: string; // recentSearch는 문자열
}
const Recentsearch = ()=>{
    const [recentSearches, setrecentSearches] = useState<RecentsearchProps[]>([
      ]);
      useEffect(() => {
        
        const sellData = async () => {
            try {
                const response = await axios.get(`/recent-search/list`);
                console.log(response);
                setrecentSearches(response.data.result.recentSearches);
            } catch (error) {
                console.error('API 요청 중 오류 발생:', error);
            }
        };
        sellData();
    }, []);
    const deleteSearch = async (index: number) => {
      const recentSearchId = recentSearches[index]?.recentSearchId;
      if (!recentSearchId) return;
    
      try {
        await axios.patch(`/recent-search/${recentSearchId}/delete`);
        setrecentSearches((prev) => prev.filter((_, i) => i !== index));
      } catch (error) {
        console.error("검색어 삭제 중 오류 발생:", error);
      }
    };
    
      // 전체 삭제
      const deleteAll = async () => {
        try {
          await axios.patch(`/recent-search/delete`);
          setrecentSearches([]);
        } catch (error) {
          console.error("전체 검색어 삭제 중 오류 발생:", error);
        }
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
            {recentSearches.map((search, index) => (
              <div key={index} className={styles.searchItem}>
                <span className={styles.searchText}>{search.recentSearch}</span>
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
