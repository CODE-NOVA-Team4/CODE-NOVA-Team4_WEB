import React,{useState} from 'react';
import styles from './SearchCategory.module.css';
import { useLocation, useNavigate } from "react-router-dom";

const SearchCategory = ()=>{
    const location = useLocation(); // 현재 경로 가져오기
    const navigate = useNavigate(); // 페이지 이동을 위한 hook
    const [searchText, setSearchText] = useState(""); // 입력된 검색어 상태

    const handleClick = () => {
        if (location.pathname === "/search") {
          // 두 번째 페이지에서는 입력 가능
          return;
        }
        // 첫 번째 페이지에서는 검색 페이지로 이동
        navigate("/search");
      };
      const handleSearch = () => {
        if (searchText.trim() !== "") {
          // 입력된 검색어를 query parameter로 전달하면서 페이지 이동
          navigate(`/result?query=${encodeURIComponent(searchText)}`);
        }
      }; 
    return (
       <div className={styles.parentContainer}>
            <div className={styles.searchBar} onClick={handleClick}>
            <input
                type="text"
                className={styles.searchInput}
                placeholder="검색어를 입력해주세요"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                readOnly={location.pathname !== "/search"}
            />
            <div className={styles.searchButton}  onClick={handleSearch}></div>
            </div>
       </div>
      );
}


export default SearchCategory;