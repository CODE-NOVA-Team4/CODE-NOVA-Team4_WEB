import React from 'react';
// import Search from './Search.tsx';
import Category from './Category.tsx';
import Recom from './Recom.tsx';
import alarm from "../../../assets/images/Alarm.svg"
import glass from "../../../assets/images/glass.svg"
import styles from './Homemain.module.css';
import { useNavigate} from 'react-router-dom';

const HomeProfile = () => {
    const navigate = useNavigate()
    const searchClick = () => {
        const newPath = `/search`; 
        navigate(newPath); // 페이지 이동
      };
    const profileClick = () =>{
        navigate("/Profile")
    }
    return(
    <div className={styles.titlebox}>
        <div className={styles.left} onClick={profileClick}>
            <div className={styles.titleimg}>
                <div className={styles.titlecircle}></div>
            </div>
        <div className={styles.name}>문학소년</div>
        </div>
        <div className={styles.right}>
            <img src={alarm} alt="alarm" className={styles.alarm} />
            <img src={glass} alt="glass" className={styles.glass} onClick={searchClick}/>
        </div>
    </div>);
}
const Homemain = () => {
  return (
    <div>
        <HomeProfile/>
        <Category />
        <Recom />
    </div>
  );
};

export default Homemain;

