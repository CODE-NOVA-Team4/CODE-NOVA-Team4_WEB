import React from 'react';
import styles from './OnboardingLayout.module.css';
import { OnboardingLayoutProps } from './OnboardingLayout.types';
// @ts-ignore
import KULogo from '../../assets/images/KU-logo.svg';

const OnboardingLayout = ({ children }: OnboardingLayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logoContainer}>
          <img 
            src={KULogo}
            alt="건국대학교 로고"
            className={styles.logo}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default OnboardingLayout;