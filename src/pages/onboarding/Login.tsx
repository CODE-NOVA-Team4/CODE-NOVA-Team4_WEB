import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import Input from '../../components/common/Input/Input.tsx';
import Button from '../../components/common/Button/Button.tsx';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <span>KU-it-so</span>
          </div>
          <div className={styles.logoDescription}>
           안전한 건국대학교 캠퍼스 중고거래의 시작
          </div>
        </div>

        <div className={styles.formSection}>
          <form onSubmit={handleSubmit} className={styles.formInputs}>
            <Input
              type="text"
              name="email"
              placeholder="건국대학교 이메일 입력"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="비밀번호 입력"
              value={formData.password}
              onChange={handleChange}
            />
            <Button type="submit" fullWidth>
              로그인
            </Button>
          </form>

          <div className={styles.links}>
            <button type="button">회원가입</button>
            <div className={styles.signupDescription}>
                건국대학교 학생만 가입 가능합니다
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;