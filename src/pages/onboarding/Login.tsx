import React, { useState } from 'react';
import styles from './Login.module.css';
import Input from '../../components/common/Input/Input.tsx';
import Button from '../../components/common/Button/Button.tsx';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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
        {/* 로고 섹션 추가 */}
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <span>KU-it-so</span>
          </div>
        </div>

        {/* 왼쪽: 환영 메시지 */}
        <div className={styles.leftSection}>
          <div className={styles.welcomeText}>
            <p>KU-it-so에 오신 것을</p>
            <p>환영합니다</p>
          </div>
        </div>

        {/* 오른쪽: 로그인 폼 */}
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit} className={styles.formInputs}>
            <Input
              type="text"
              name="email"
              placeholder="이메일 혹은 아이디 입력"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;