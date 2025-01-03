import React from 'react';
import styles from './Bottombar.module.css';
import home from '../../../assets/images/Bottombar-homebutton.svg';
import indicator from '../../../assets/images/Bottombar-indicator.svg';

const Bottombar = () => {
   

    return (
        <div className={styles.bottombar}>
            <div className={styles.top}>
                <div className={styles.menu1}>
                    <img src={home} alt="" />
                </div>
                <div className={styles.menu2}></div>
                <img src={home} alt="" />

                <div className={styles.menu3}></div>
                <img src={home} alt="" />

            </div>
            <div className="bottom">
                <img src={indicator} alt="" className={styles.indicator} />
            </div>
        </div>
    );
};

export default Bottombar;
