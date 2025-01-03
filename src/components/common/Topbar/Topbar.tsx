import React, { useState, useEffect } from 'react';
import styles from './Topbar.module.css';
import connection from '../../../assets/images/Topbar-Connection.svg';
import wify from '../../../assets/images/Topbar-wify.svg';
import battery from '../../../assets/images/Topbar-battery.svg';

const Topbar = () => {
    const [time, setTime] = useState<string>(() => {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
        }, 1000); // 1초마다 시간 업데이트

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
    }, []);

    return (
        <div className={styles.topbar}>
            <div className={styles.time}>{time}</div>
            <div className={styles.state}>
                <img src={connection} alt="Connection" className="src" />
                <img src={wify} alt="WiFi" className="src" />
                <img src={battery} alt="Battery" className="src" />
            </div>
        </div>
    );
};

export default Topbar;
