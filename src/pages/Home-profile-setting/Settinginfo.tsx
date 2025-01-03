import React, { useState, useEffect } from 'react';
import styles from './Setting.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Emailinfo {
  nickname: string;
  department: string;
  email: string;
  password: string;
}

const Settinginfo = () => {
  const navigate = useNavigate();
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

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    try {
      const updatedInfo = {
        nickname: fields.find((field) => field.id === 1)?.value || '',
        department: fields.find((field) => field.id === 2)?.value || '',
        password: fields.find((field) => field.id === 4)?.value || '',
      };

      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('사용자 ID가 없습니다.');
        return;
      }

      // 서버에 PATCH 요청
      const response = await axios.patch(`/users/${userId}/info`, updatedInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      console.log('수정 완료:', response.data);

      // 업데이트된 데이터 다시 가져오기
      const fetchUpdatedData = async () => {
        try {
          const updatedResponse = await axios.get(`/users/${userId}/info`);
          const result = updatedResponse.data.result;
          setEinfo(result); // 최신 데이터로 업데이트
        } catch (error) {
          console.error('업데이트된 데이터 가져오기 실패:', error);
        }
      };

      await fetchUpdatedData();

      // 수정 상태 종료
      setIsEditing(false);
    } catch (error) {
      console.error('수정 저장 중 오류 발생:', error);
    }
  };

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('사용자 ID가 없습니다.');
          return;
        }

        const response = await axios.get(`/users/${userId}/info`);
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
    if (isEditing) {
      handleSave(); // 저장하기 클릭 시 저장
    } else {
      setIsEditing(true); // 수정하기 클릭 시 수정 가능 상태로 전환
    }
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
              disabled={field.disabled || !isEditing || field.id === 3} // 이메일 필드 항상 비활성화
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
      </div>
    </div>
  );
};

export default Settinginfo;
