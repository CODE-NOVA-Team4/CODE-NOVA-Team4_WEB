import Topbar from "../../components/common/Topbar/Topbar.tsx";
import Bottombar from "../../components/common/Bottombar/Bottombar.tsx";
import React from 'react';
import styles from "./Expense.module.css"
import Back from "../Home-category/Back.tsx";
import { useParams } from 'react-router-dom';
import Profilecontent from "../Home-Profile/Profilecontent.tsx";
const Expense = () =>{
    const { number } = useParams(); // 경로에서 number 읽기
    const title = number === "1" ? "구매 내역" : "판매 내역";
    return(<>
<Topbar/>
<Back prob={title}/>
<Profilecontent name ={title}/>
<Bottombar/>
</>);
}
export default Expense;