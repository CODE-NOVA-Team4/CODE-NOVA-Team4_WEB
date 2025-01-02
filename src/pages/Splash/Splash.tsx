import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Splash.module.css';
import logo from '../../assets/images/KUITSO-logo.svg';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 별 효과
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

    // 페이지 전환
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 3000);

    return () => {
      clearTimeout(timer);
      starryBg.remove();
    };
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="KUITSO" />
        <span>쿠잇소</span>
      </div>
    </div>
  );
};

export default Splash;