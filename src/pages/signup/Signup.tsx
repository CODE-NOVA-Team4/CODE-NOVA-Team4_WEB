import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/axios.ts';
import styles from './Signup.module.css';
import backgreenArrow from '../../assets/images/arrow-green.svg';

interface SignupForm {
  nickname: string;
  department: string;
  email: string;
  verificationCode: string;
  password: string;
  passwordConfirm: string;
}

interface ErrorState extends Partial<SignupForm> {
  submit?: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<string[]>([
    '스마트ICT융합공학과',
    '컴퓨터공학부',
    '소프트웨어학과',
    '전자공학부',
    '산업공학과',
    '경영학과',
    '경제학과',
    '국어국문학과',
    '영어영문학과',
    '건축학과',
    '화학공학과'
  ]);
  const [showDepartments, setShowDepartments] = useState(false);
  const [formData, setFormData] = useState<SignupForm>({
    nickname: '',
    department: '',
    email: '',
    verificationCode: '',
    password: '',
    passwordConfirm: '',
  });
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [errors, setErrors] = useState<ErrorState>({});

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
    const newErrors: ErrorState = {};
    
    if (!formData.nickname) newErrors.nickname = '닉네임을 입력해주세요';
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
      const response = await api.post('/auth/code', {
        email: formData.email,
      });
      if (response.data.result === true) {
        setEmailSent(true);
      }
    } catch (error: any) {
      console.error('이메일 인증 요청 실패:', error.response?.data || error.message);
      setErrors((prev) => ({
        ...prev,
        email: error.response?.data?.message || '이메일 전송에 실패했습니다.',
      }));
    }
  };
  

  // 인증코드 확인
  const verifyCode = async () => {
    try {
      const response = await api.post('/auth/verification', {
        email: formData.email,
        code: formData.verificationCode  // 문자열이 아닌 숫자로 보내기 위해 변환
      });
      
      // response의 result 객체 확인
      if (response.data.result?.success) {
        setEmailVerified(true);
        // 인증된 이메일 정보 저장 (필요한 경우)
        const certifiedEmail = response.data.result.certified_email;
        const certifiedDate = response.data.result.certified_date;
        
        // 성공 메시지 표시 (옵션)
        setErrors(prev => ({
          ...prev,
          verificationCode: ''  // 에러 메시지 제거
        }));
      } else {
        // 인증 실패
        setEmailVerified(false);
        setErrors(prev => ({
          ...prev,
          verificationCode: response.data.message || '이메일 인증에 실패했습니다.'
        }));
      }
    } catch (error: any) {
      setEmailVerified(false);
      // 에러 응답 처리
      const errorMessage = error.response?.data?.message || '인증번호 확인에 실패했습니다';
      setErrors(prev => ({
        ...prev,
        verificationCode: errorMessage
      }));
    }
  };

  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // 숫자만 허용
    if (value === '' || /^\d+$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        verificationCode: value
      }));
    }
  };

  const isFormValid = () => {
    return (
      formData.nickname &&
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
      console.log('회원가입 요청 데이터:', {
        nickname: formData.nickname,
        department: formData.department,
        email: formData.email,
        password: formData.password,
      });
  
      const response = await api.post('/auth/signup', {
        nickname: formData.nickname,
        department: formData.department,
        email: formData.email,
        password: formData.password,
      });
  
      // 응답 데이터 확인
      console.log('회원가입 응답:', response.data);
  
      // status가 200이고 success가 true인 경우에만 로그인 페이지로 이동
      if (response.data.status === 200 && response.data.success === true) {
        navigate('/login');
      } else {
        // success가 false인 경우 에러 메시지 표시
        setErrors(prev => ({
          ...prev,
          submit: response.data.message || '회원가입에 실패했습니다.'
        }));
      }
    } catch (error: any) {
      console.error('회원가입 에러:', error.response?.data || error);
      setErrors(prev => ({
        ...prev,
        submit: error.response?.data?.message || '회원가입에 실패했습니다.'
      }));
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
              name="nickname"
              placeholder="닉네임을 입력해주세요."
              value={formData.nickname}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.nickname && <span className={styles.error}>{errors.nickname}</span>}
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
                onChange={handleVerificationCodeChange}  // 새로운 핸들러 사용
                className={styles.input}
                maxLength={5}  // 인증코드 길이 제한
              />
              <button
                type="button"
                onClick={verifyCode}
                className={styles.verifyButton}
              >
                확인
              </button>
              {errors.verificationCode && 
                <span className={styles.error}>{errors.verificationCode}</span>}
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
            {errors.passwordConfirm && 
              <span className={styles.error}>{errors.passwordConfirm}</span>}
          </div>

          {errors.submit && <span className={styles.error}>{errors.submit}</span>}

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