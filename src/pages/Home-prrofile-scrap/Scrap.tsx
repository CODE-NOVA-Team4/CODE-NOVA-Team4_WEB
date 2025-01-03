import Bottombar from "../../components/common/Bottombar/Bottombar.tsx";
import React from 'react';
import Back from "../Home-category/Back.tsx";
import Categoryitems from "../Home-category/Categoryitems.tsx";

const Scrap = () =>{
       
   return( <>
<Back prob = "즐겨찾기"/>
<Categoryitems />

<Bottombar/>
</>)
}
export default Scrap;