import Topbar from "../../components/common/Topbar/Topbar.tsx";
import Bottombar from "../../components/common/Bottombar/Bottombar.tsx";
import React from 'react';
import styles from "./Scrap.module.css"
import Back from "../Home-category/Back.tsx";
import Categoryitems from "../Home-category/Categoryitems.tsx";
const Scrap = () =>{
   return( <>
<Topbar/>
<Back prob = "즐겨찾기"/>
<Categoryitems/>

<Bottombar/>
</>)
}
export default Scrap;