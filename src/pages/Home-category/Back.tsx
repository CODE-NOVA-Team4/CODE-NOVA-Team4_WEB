import styles from "./Hcategory.module.css";
import React from "react";
import backsp from "../../assets/images/Back.svg"
import { useLocation, useNavigate } from "react-router-dom";



const Back = ({prob}) =>{
    const location = useLocation()
    const navigate = useNavigate()
    const segments = location.pathname.split("/"); // ["", "hcategory", "학용품"]
    const isVertical = location.pathname === '/Profile/1' || location.pathname === '/Profile/2';

    const homesearch = () =>{
        if(segments[1]==="hcategory" || (segments[1]==="Profile"&&!isVertical))
            navigate("/Home");
        else
            navigate("/Profile")
        
     }
    return(<div className={styles.backbox}>
               <img src={backsp} alt="<" className={styles.back}onClick={homesearch}></img>
                <div className={styles.backtitle}>{prob}</div>
           </div>)
}
export default Back