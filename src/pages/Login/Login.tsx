import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/axios.ts';
import styles from './Login.module.css';
import backwhiteArrow from '../../assets/images/arrow-white.svg';
import logogreen from '../../assets/images/logo-korean-green.svg';
interface LoginResponse {
  userId: string;
}

interface ErrorResponse {
  status: number;
  success: boolean;
  message: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string>('');

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 폼 제출 핸들러
  // 폼 제출 핸들러
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  try {
    const response = await api.post<LoginResponse>(
      '/auth/login',
      formData,
      {
          withCredentials: true, // 쿠키와 함께 요청 전송
          headers: {
              'Content-Type': 'application/json',
          },
          timeout: 10000, // 타임아웃 시간 증가
      }
  );
  
  console.log('로그인 응답:', response.data);
  
    // status가 200이고 result 객체가 있는지 확인
    if (response.data.status === 200 && response.data.result?.userId) {
      // userId를 localStorage에 저장
      localStorage.setItem('userId', response.data.result.userId.toString());
      
      const sessionId = response.data.result.sessionId;
      document.cookie = `JSESSIONID=${sessionId};path=/; Secure; SameSite=None;`;

      navigate('/home');  // 홈 화면으로 이동
    } else {
      setError(response.data.message || '로그인에 실패했습니다.');
    }
  } catch (err: any) {
    console.error('로그인 에러:', err.response?.data || err);
    const errorResponse = err.response?.data as ErrorResponse;
    setError(errorResponse?.message || '로그인에 실패했습니다.');
  }
};

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
        <form className={styles.form} onSubmit={handleSubmit}>
          <span className={styles.inputstyle}>학교 이메일</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="건국대학교 이메일"
            className={styles.input}
          />
          <span className={styles.inputstyle}>비밀번호</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호"
            className={styles.input}
          />
          {error && <p className={styles.error}>{error}</p>}
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