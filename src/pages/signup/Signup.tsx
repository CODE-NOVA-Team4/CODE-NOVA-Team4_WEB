import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/axios.ts';
import styles from './Signup.module.css';

interface SignupForm {
  name: string;
  department: string;
  grade: string;
  email: string;
  password: string;
  passwordConfirm: string;
  verificationCode: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupForm>({
    name: '',
    department: '',
    grade: '',
    email: '',
    password: '',
    passwordConfirm: '',
    verificationCode: '',
  });
  const [emailSent, setEmailSent] = useState(false);
  const [errors, setErrors] = useState<Partial<SignupForm>>({});

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

  const validateForm = () => {
    const newErrors: Partial<SignupForm> = {};
    
    if (!formData.name) newErrors.name = '이름을 입력해주세요';
    if (!formData.department) newErrors.department = '학과를 입력해주세요';
    if (!formData.grade) newErrors.grade = '학년을 입력해주세요';
    if (!formData.email.endsWith('@konkuk.ac.kr')) {
      newErrors.email = '건국대학교 이메일만 사용 가능합니다';
    }
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailVerification = async () => {
    try {
      await api.post('/api/auth/email-verification', {
        email: formData.email
      });
      setEmailSent(true);
    } catch (error) {
      console.error('이메일 전송 실패:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await api.post('/api/auth/signup', {
        name: formData.name,
        department: formData.department,
        grade: formData.grade,
        email: formData.email,
        password: formData.password,
        verificationCode: formData.verificationCode
      });
      
      // 회원가입 성공 시 로그인 페이지로 이동
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>회원가입</h1>
        <div className={styles.subTitle}>
            <p>건국대학교 이메일로 인증 후</p>
            <p>가입이 가능합니다</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}

          <input
            type="text"
            name="department"
            placeholder="학과"
            value={formData.department}
            onChange={handleChange}
          />
          {errors.department && <span className={styles.error}>{errors.department}</span>}

          <input
            type="text"
            name="grade"
            placeholder="학년"
            value={formData.grade}
            onChange={handleChange}
          />
          {errors.grade && <span className={styles.error}>{errors.grade}</span>}

          <div className={styles.emailSection}>
            <input
              type="email"
              name="email"
              placeholder="건국대학교 이메일"
              value={formData.email}
              onChange={handleChange}
            />
            <button 
              type="button"
              onClick={handleEmailVerification}
              disabled={!formData.email.endsWith('@konkuk.ac.kr')}
            >
              인증번호 전송
            </button>
          </div>
          {errors.email && <span className={styles.error}>{errors.email}</span>}

          {emailSent && (
            <input
              type="text"
              name="verificationCode"
              placeholder="인증번호 입력"
              value={formData.verificationCode}
              onChange={handleChange}
            />
          )}

          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            value={formData.passwordConfirm}
            onChange={handleChange}
          />
          {errors.passwordConfirm && (
            <span className={styles.error}>{errors.passwordConfirm}</span>
          )}

          <button type="submit">가입하기</button>
        </form>

        <div className={styles.links}>
            <button type="button" onClick={() => navigate('/')}>
                로그인 하러가기
            </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;