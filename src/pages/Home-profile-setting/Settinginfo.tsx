import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/axios.ts';
import styles from "./Setting.module.css";

const Settinginfo = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useState([
        { id: 1, label: "닉네임", value: "문학소년", type: "text" },
        { id: 2, label: "학과", value: "국어국문학과", type: "text" },
        { id: 3, label: "학교 이메일", value: "iluvkorean@konkuk.ac.kr", type: "email", disabled: true },
        { id: 4, label: "비밀번호", value: "*********", type: "password" },
    ]);
    const [isEditing, setIsEditing] = useState(false);

    const handleLogout = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('사용자 ID가 없습니다.');
                return;
            }

            const sessionId = document.cookie
            .split('; ')
            .find(row => row.startsWith('sessionId=')) // 쿠키 이름을 sessionId로 변경
            ?.split('=')[1];
            console.log(sessionId);
          
          const response = await api.post(
            '/auth/logout',
            null,
            {
              headers: {
                //'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                //'Cookie': `sessionId=${sessionId}`, // sessionId 쿠키를 헤더에 포함
              },
              withCredentials: true, // 쿠키와 함께 요청
              timeout: 10000, // 타임아웃 설정
            }
          );
          
    
            console.log('로그아웃 응답:', response.data);
    
            if (response.data.status === 200 && response.data.success) {
                // 로컬 스토리지와 상태 초기화
                localStorage.clear();
                navigate('/welcome');
            }
        } catch (error: any) {
            console.error('로그아웃 실패:', error.response?.data || error);
            // 네트워크 에러 발생 시에도 상태 초기화
            localStorage.clear();
            navigate('/welcome');
        }
    };
    

  const handleWithdrawal = async () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('사용자 ID가 없습니다.');
                return;
            }

            console.log('회원탈퇴 요청 시작');  // 디버깅용 로그 추가

            const response = await api.patch('/auth/signout', {}, {  // 빈 객체라도 데이터로 전송
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
                timeout: 10000  // 타임아웃 시간 증가1
                
            });
            
            console.log('회원탈퇴 응답:', response.data);

            if (response.data.status === 200 && response.data.success) {
                localStorage.clear();
                navigate('/welcome');
            }
        } catch (error: any) {
            console.error('회원탈퇴 에러 상세:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            // 네트워크 에러가 발생해도 로그아웃 처리
            localStorage.clear();
            navigate('/welcome');
        }
    }
};

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className={styles.profileForm}>
            <div className={styles.avatar}>
                <div className={styles.circle}></div>
            </div>
            <form className={styles.form}>
                {fields.map((field) => (
                    <div key={field.id} className={styles.formGroup}>
                        <label className={styles.label}>{field.label}</label>
                        <input
                            type={field.type}
                            value={field.value}
                            className={`${styles.input} ${field.disabled ? styles.disabled : ""}`}
                            disabled={field.disabled}
                        />
                    </div>
                ))}
                {isEditing && 
                <>
                    <label className={styles.label}>비밀번호 확인</label>
                    <input type="password" className={styles.input} />
                </>
                }
            </form>
            <div className={styles.buttonbox}>        
                <div className={styles.setbutton} onClick={toggleEdit}>
                    {isEditing ? "저장하기" : "수정하기"}
                </div>
                {!isEditing && (
                    <div className={styles.andbox}>
                        <div 
                            className={styles.logout}
                            onClick={handleLogout}
                            role="button"
                            tabIndex={0}
                        >
                            로그아웃
                        </div>
                        <div 
                            className={styles.out}
                            onClick={handleWithdrawal}
                            role="button"
                            tabIndex={0}
                        >
                            회원탈퇴
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Settinginfo;