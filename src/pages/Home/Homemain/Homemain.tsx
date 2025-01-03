import React,{useEffect,useState} from 'react';
// import Search from './Search.tsx';
import Category from './Category.tsx';
import Recom from './Recom.tsx';
import alarm from "../../../assets/images/Alarm.svg"
import glass from "../../../assets/images/glass.svg"
import styles from './Homemain.module.css';
import { useNavigate} from 'react-router-dom';
import { set } from 'date-fns';
import axios from 'axios';
interface Products {
    productId: string;
    picture: string;
    productName: string;
    price: string;
    updatedAt: string;
}


const HomeProfile = ({nick}) => {
      
    const navigate = useNavigate()
    const searchClick = () => {
        const newPath = `/search`; 
        navigate(newPath); // 페이지 이동gate(newPath); // 페이지 이동
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
        <div className={styles.name}>{nick}</div>
        </div>
        <div className={styles.right}>
            <img src={glass} alt="glass" className={styles.glass} onClick={searchClick}/>
        </div>
    </div>);
}
const Homemain = () => {
    const [nick,setnick] = useState('');
    const [sellProducts,setsellProducts] = useState<Products[]>([]);

useEffect(() => {
    
    const sellData = async () => {
        try {
            const response = await axios.get(`/home`);
            // console.log(response.data.result.products);
            console.log(response);
            setsellProducts(response.data.result.products);
            setnick(response.data.result.nickname);
        } catch (error) {
            console.error('API 요청 중 오류 발생:', error);
        }
    };
    sellData();
}, []);
  return (
    <div>
        <HomeProfile nick={nick}/>
        <Category />
        <Recom prob={sellProducts}/>
    </div>
  );
};

export default Homemain;

