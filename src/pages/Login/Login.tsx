import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import backwhiteArrow from '../../assets/images/arrow-white.svg';
import logogreen from '../../assets/images/logo-korean-green.svg'

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
          <img src={logogreen} alt="KUITSO" />
          <span className={styles.description}>
            건국대 학생을 위한 쉽고 안전한 중고거래
          </span>
        </div>
        <form className={styles.form}>
          <span className={styles.inputstyle}>학교 이메일</span>
          <input
            type="email"
            placeholder="건국대학교 이메일"
            className={styles.input}
          />
          <span className={styles.inputstyle}>비밀번호</span>
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