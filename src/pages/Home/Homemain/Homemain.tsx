import React, { useEffect, useState } from 'react';
import Category from './Category.tsx';
import Recom from './Recom.tsx';
import alarm from "../../../assets/images/Alarm.svg";
import glass from "../../../assets/images/glass.svg";
import userProfile from "../../../assets/images/k.svg";
import styles from './Homemain.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Products {
  productId: string;
  picture: string;
  productName: string;
  price: string;
  updatedAt: string;
}

const HomeProfile = ({ nick }: { nick: string }) => {
  const navigate = useNavigate();
  const searchClick = () => {
    navigate('/search'); // 페이지 이동
  };
  const profileClick = () => {
    navigate('/Profile'); // 프로필 페이지로 이동
  };

  return (
    <div className={styles.titlebox}>
      <div className={styles.left} onClick={profileClick}>
        <div className={styles.titleimg}>
          <img 
            src={userProfile} 
            alt="프로필" 
            className={styles.profileImage}
          />
        </div>
        <div className={styles.name}>{nick}</div>
      </div>
      <div className={styles.right}>
        <img src={glass} alt="glass" className={styles.glass} onClick={searchClick} />
      </div>
    </div>
  );
};

const Homemain = () => {
  const [nick, setNick] = useState('');
  const [sellProducts, setSellProducts] = useState<Products[]>([]);

  useEffect(() => {
    const sellData = async () => {
      try {
        // 쿠키와 세션을 포함하여 API 요청
        const response = await axios.get('/home', {
          withCredentials: true, // 쿠키 자동 포함
          timeout: 10000, // 타임아웃 설정
        });

        console.log(response);
        setSellProducts(response.data.result.products);
        setNick(response.data.result.nickname);
      } catch (error: any) {
        // 오류 핸들링 추가
        if (error.response) {
          console.error('응답 오류:', error.response.data);
          console.error('응답 상태 코드:', error.response.status);
        } else if (error.request) {
          console.error('요청 오류:', error.request);
        } else {
          console.error('오류:', error.message);
        }
      }
    };

    sellData();
  }, []);

  return (
    <div>
      {/* 동적으로 닉네임 전달 */}
      <HomeProfile nick={nick} />
      <Category />
      {/* 동적으로 products 전달 */}
      <Recom prob={sellProducts} />
    </div>
  );
};

export default Homemain;
