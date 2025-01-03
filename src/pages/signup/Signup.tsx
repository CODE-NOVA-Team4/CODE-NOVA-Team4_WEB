import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/axios.ts';
import styles from './Signup.module.css';
import backgreenArrow from '../../assets/images/arrow-green.svg';

interface SignupForm {
  name: string;
  department: string;
  email: string;
  verificationCode: string;
  password: string;
  passwordConfirm: string;
}

const fetchDepartments = async () => {
  try {
    const response = await api.get('/api/departments');
    setDepartments(response.data);
  } catch (error) {
    console.error('학과 목록 가져오기 실패:', error);
  }
};

const Signup = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<string[]>([
    '컴퓨터공학부',
    '소프트웨어학과',
    '전자공학부',
    '산업공학과',
    '경영학과',
    '경제학과',
    '국어국문학과',
    '영어영문학과',
    '건축학과',
    '화학공학과' // 임시데이터
  ]);
  const [showDepartments, setShowDepartments] = useState(false);
  const [formData, setFormData] = useState<SignupForm>({
    name: '',
    department: '',
    email: '',
    verificationCode: '',
    password: '',
    passwordConfirm: '',
  });
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [errors, setErrors] = useState<Partial<SignupForm>>({});

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get('/api/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('학과 목록 가져오기 실패:', error);
      }
    };
    
    fetchDepartments();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector(`.${styles.departmentDropdown}`);
      const input = document.querySelector(`.${styles.departmentWrapper} input`);
      
      if (dropdown && input && 
          !dropdown.contains(event.target as Node) && 
          !input.contains(event.target as Node)) {
        setShowDepartments(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 에러 메시지 초기화
    if (errors[name as keyof SignupForm]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<SignupForm> = {};
    
    if (!formData.name) newErrors.name = '이름을 입력해주세요';
    if (!formData.department) newErrors.department = '학과를 입력해주세요';
    if (!formData.email.endsWith('@konkuk.ac.kr')) {
      newErrors.email = '건국대학교 이메일만 사용 가능합니다';
    }
    if (!emailVerified) newErrors.verificationCode = '이메일 인증이 필요합니다';
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 이메일 인증코드 발송
  const handleEmailVerification = async () => {
    try {
      // 백엔드 API 엔드포인트와 통신
      await api.post('/api/auth/email-verification', {
        email: formData.email
      });
      setEmailSent(true);
    } catch (error) {
      console.error('이메일 전송 실패:', error);
    }
  };

// 인증코드 확인
const verifyCode = async () => {
    try {
      // 백엔드 API 엔드포인트와 통신
      const response = await api.post('/api/auth/verify-code', {
        email: formData.email,
        code: formData.verificationCode
      });
      
      // 인증 성공 시
      if (response.data.success) {
        setEmailVerified(true);
      }
    } catch (error) {
      console.error('인증번호 확인 실패:', error);
    }
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.department &&
      formData.email.endsWith('@konkuk.ac.kr') &&
      emailVerified &&
      formData.password &&
      formData.password === formData.passwordConfirm
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await api.post('/api/auth/signup', {
        name: formData.name,
        department: formData.department,
        email: formData.email,
        password: formData.password,
      });
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          onClick={() => navigate(-1)} 
          className={styles.backButton}
        >
        <img src={backgreenArrow} alt="back" />
        </button>
        <span className={styles.headerspan}>회원가입</span>
      </div>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>닉네임</label>
            <input
              type="text"
              name="name"
              placeholder="이름을 입력해주세요."
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>학과</label>
            <div className={styles.departmentWrapper}>
              <input
                type="text"
                name="department"
                placeholder="본인의 학과를 선택해주세요."
                value={formData.department}
                onChange={handleChange}
                onClick={() => setShowDepartments(true)}
                className={styles.input}
                readOnly
              />
              {showDepartments && (
                <div className={styles.departmentDropdown}>
                  {departments.map((dept, index) => (
                    <div
                      key={index}
                      className={styles.departmentItem}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, department: dept }));
                        setShowDepartments(false);
                      }}
                    >
                      {dept}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.department && <span className={styles.error}>{errors.department}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>학교 이메일</label>
            <div className={styles.emailSection}>
              <input
                type="email"
                name="email"
                placeholder="ex ) kuitso@konkuk.ac.kr"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
              />
              <button
                type="button"
                onClick={handleEmailVerification}
                disabled={!formData.email.endsWith('@konkuk.ac.kr')}
                className={styles.verifyButton}
              >
                인증
              </button>
            </div>
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          {emailSent && (
            <div className={styles.formGroup}>
              <input
                type="text"
                name="verificationCode"
                placeholder="인증코드를 입력해주세요."
                value={formData.verificationCode}
                onChange={handleChange}
                className={styles.input}
              />
              <button
                type="button"
                onClick={verifyCode}
                className={styles.verifyButton}
              >
                확인
              </button>
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>비밀번호</label>
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해 주세요."
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>비밀번호 확인</label>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="비밀번호를 한 번 더 입력해주세요."
              value={formData.passwordConfirm}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.passwordConfirm && (
              <span className={styles.error}>{errors.passwordConfirm}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid()}
            className={styles.submitButton}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;