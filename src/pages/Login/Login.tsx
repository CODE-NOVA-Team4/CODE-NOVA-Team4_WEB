import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '../../assets/images/KUITSO-logo.svg';
import backwhiteArrow from '../../assets/images/arrow-white.svg';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
        <button 
            onClick={() => navigate(-1)} 
            className={styles.backButton}
        >
        <img src={backwhiteArrow} alt="back" />
        </button> 
      <div className={styles.content}>
        <div className={styles.logo}>
         <img src={logo} alt="KUITSO" />
        </div>
        <p className={styles.description}>
            KU 학생 인증으로 더 안전하게 거래하세요.
        </p>
        <form className={styles.form}>
          <input
            type="email"
            placeholder="건국대학교 이메일"
            className={styles.input}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className={styles.input}
          />
          <button type="submit" className={styles.loginButton}>
            로그인
          </button>
        </form>
        <p className={styles.signup}>
            아직 아이디가 없으신가요?
        </p>
        <div className={styles.signupLink}>
        <button 
            onClick={() => navigate('/signup')}
            className={styles.signupButton}
        >
            회원가입
        </button>
        </div>

      </div>
    </div>
  );
};

export default Login;