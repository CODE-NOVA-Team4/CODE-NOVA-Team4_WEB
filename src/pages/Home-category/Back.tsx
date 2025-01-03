import styles from "./Hcategory.module.css";
import React from "react";
import backsp from "../../assets/images/Back.svg"



const Back = ({prob}) =>{
    
    return(<div className={styles.backbox}>
               <img src={backsp} alt="<" className={styles.back}></img>
                <div className={styles.backtitle}>{prob}</div>
           </div>)
}
export default Back