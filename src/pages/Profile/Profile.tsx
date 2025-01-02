import Topbar from "../../components/common/Topbar/Topbar.tsx";
import Bottombar from "../../components/common/Bottombar/Bottombar.tsx";
import React from 'react';
import styles from "./Profile.module.css"
import setting from "../../assets/images/Profile-setting.svg"
const Profiletitle = () =>{
    return(
        <div className={styles.profiletitle}>
            <div className={styles.profilebox}>
                <div className={styles.circle}></div>
                <div className={styles.name}>박민주주</div>
                <div className={styles.subject}>일본문화언어학과과</div>
                <img src={setting} alt="" className={styles.setting} />
            </div>
        </div>
    );
}
const Profilecontent = () =>{
    return(
        <div className={styles.profilecontent}>
            <div className={styles.account}>거래 내역</div>
            <div className={styles.account}>관심 상품품</div>
        </div>
    );
}
const Profile = () =>{
    return(<>
<Topbar/>
<Profiletitle/>
<Profilecontent/>
<Bottombar/>
</>);
}
export default Profile;