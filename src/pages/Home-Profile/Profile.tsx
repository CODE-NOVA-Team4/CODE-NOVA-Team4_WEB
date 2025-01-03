import Topbar from "../../components/common/Topbar/Topbar.tsx";
import Bottombar from "../../components/common/Bottombar/Bottombar.tsx";
import React from 'react';
import styles from "./Profile.module.css"
import setting from "../../assets/images/Profile-setting.svg"
import heart from "../../assets/images/Profile-heart.svg";
import Profilecontent from "./Profilecontent.tsx";
import Back from "../Home-category/Back.tsx";
import { useNavigate} from 'react-router-dom';

const Profiletitle = () =>{
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    const settingClick = () => {
        const newPath = `/setting`; 
        navigate(newPath); // 페이지 이동
      };
    return(
        <div className={styles.profiletitle}>
            <div className={styles.profilebox}>
                <div className={styles.circle}></div>
                <div className={styles.name}>박민주</div>
                <div className={styles.subject}>일본문화언어학과</div>
                <img src={heart} alt="" className={styles.setting} />
                <img src={setting} alt="" className={styles.setting} onClick={settingClick}/>
            </div>
        </div>
    );
}

const Profile = () =>{
    return(<>
<Topbar/>
<Back prob="프로필"/>
<Profiletitle/>
<Profilecontent name ={"구매 내역"}/>
<Profilecontent name ={"판매 내역"}/>

<Bottombar/>
</>);
}
export default Profile;