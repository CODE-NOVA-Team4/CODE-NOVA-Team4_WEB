import Bottombar from "../../components/common/Bottombar/Bottombar.tsx";
import React from "react";
import styles from "./Searchresult.module.css"
import SearchCategory from "../../components/common/SearchCategory/SearchCategory.tsx";
import { useLocation } from "react-router-dom";
import Deliverytype from "../Home-category/Deliverytype.tsx";
import Categoryitems from "../Home-category/Categoryitems.tsx";
const SearchResultContent = ({prob}) =>{
return (
    <div className={styles.searchresultcontent}>
        '{prob}' 관련 검색어
    </div>

)
}
const SearchResult = () =>{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query")
    return(<>
<SearchCategory/>
<SearchResultContent prob={query}/>
<Deliverytype name=""/>
<Categoryitems/>
<Bottombar/>
</>);
}
export default SearchResult;