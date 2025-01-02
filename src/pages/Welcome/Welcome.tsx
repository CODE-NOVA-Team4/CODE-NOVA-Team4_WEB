import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Welcome.module.css';
import logo from '../../assets/images/KUITSO-greenlogo.svg';

const Welcome = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const starryBg = document.createElement('div');
    starryBg.className = styles['starry-bg'];
    
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = styles.star;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      starryBg.appendChild(star);
    }
  
    const container = document.querySelector(`.${styles.container}`);
    container?.appendChild(starryBg);
  
    return () => {
      starryBg.remove();
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src={logo} alt="KUITSO" />
        </div>
        <div className={styles.description}>
            안전한 건국대학교 캠퍼스 중고거래의 시작
        </div>
        <div className={styles.buttons}>
          <button onClick={() => navigate('/login')} className={styles.loginButton}>로그인</button>
          <button onClick={() => navigate('/signup')} className={styles.signupButton}>회원가입</button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;