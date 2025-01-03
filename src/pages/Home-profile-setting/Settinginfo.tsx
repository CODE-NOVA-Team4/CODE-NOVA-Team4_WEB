import React, { useState, useEffect } from 'react';
import styles from './Setting.module.css';
import axios from 'axios';

interface Emailinfo {
  nickname: string;
  department: string;
  email: string;
  password: string;
}

const Settinginfo = () => {
  const [Einfo, setEinfo] = useState<Emailinfo>({
    nickname: '',
    department: '',
    email: '',
    password: '',
  });

  const [fields, setFields] = useState([
    { id: 1, label: '닉네임', value: '', type: 'text' },
    { id: 2, label: '학과', value: '', type: 'text' },
    { id: 3, label: '학교 이메일', value: '', type: 'text', disabled: true },
    { id: 4, label: '비밀번호', value: '', type: 'password' },
  ]);

  const [isEditing, setIsEditing] = useState(false); // 수정 상태 관리

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/users/1/info');
        const result = response.data.result;
        setEinfo(result); // Einfo 업데이트
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  // Sync Einfo with fields
  useEffect(() => {
    setFields((prevFields) =>
      prevFields.map((field) => ({
        ...field,
        value:
          field.id === 1
            ? Einfo.nickname
            : field.id === 2
            ? Einfo.department
            : field.id === 3
            ? Einfo.email
            : field.id === 4
            ? Einfo.password
            : field.value,
      }))
    );
  }, [Einfo]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.profileForm}>
      <div className={styles.avatar}>
        <div className={styles.circle}></div> {/* 프로필 사진 자리 */}
      </div>
      <form className={styles.form}>
        {fields.map((field) => (
          <div key={field.id} className={styles.formGroup}>
            <label className={styles.label}>{field.label}</label>
            <input
              type={field.type}
              value={field.value || ''}
              className={`${styles.input} ${field.disabled ? styles.disabled : ''}`}
              disabled={field.disabled || !isEditing}
              onChange={(e) =>
                setFields((prevFields) =>
                  prevFields.map((f) =>
                    f.id === field.id ? { ...f, value: e.target.value } : f
                  )
                )
              }
            />
          </div>
        ))}
        {isEditing && (
          <>
            <label className={styles.label}>비밀번호 확인</label>
            <input type="password" className={styles.input} />
          </>
        )}
      </form>
      <div className={styles.buttonbox}>
        <div className={styles.setbutton} onClick={toggleEdit}>
          {isEditing ? '저장하기' : '수정하기'}
        </div>
        {!isEditing && (
          <div className={styles.andbox}>
            <div className={styles.logout}>로그아웃</div>
            <div className={styles.out}>회원탈퇴</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settinginfo;
