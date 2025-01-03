import React,{useState} from 'react';
import styles from "./Setting.module.css"
const Settinginfo = () =>{
    const [fields, setFields] = useState([
        { id: 1, label: "닉네임", value: "문학소년", type: "text" },
        { id: 2, label: "학과", value: "국어국문학과", type: "text" },
        { id: 3, label: "학교 이메일", value: "iluvkorean@konkuk.ac.kr", type: "email", disabled: true },
        { id: 4, label: "비밀번호", value: "*********", type: "password" },
      ]);
      const [isEditing, setIsEditing] = useState(false); // 수정 상태 관리

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
    return( <div className={styles.profileForm}>
        <div className={styles.avatar}>
          <div className={styles.circle}></div> {/* 프로필 사진 자리 */}
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
            <input type="password"className={styles.input} />
        </>
        }
     </form>
        <div className={styles.buttonbox}>        
            <div className={styles.setbutton} onClick={toggleEdit}>
                {isEditing ? "저장하기" : "수정하기"}</div>
            {!isEditing && (
        <div className={styles.andbox}>
          <div className={styles.logout}>로그아웃</div>
          <div className={styles.out}>회원탈퇴</div>
        </div>
      )}
        </div>
      </div>);
}
export default Settinginfo;