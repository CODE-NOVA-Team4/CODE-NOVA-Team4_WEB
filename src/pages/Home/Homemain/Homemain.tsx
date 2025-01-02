import React from 'react';
import styles from './Home.module.css';
import Search from './Search.tsx';
import Category from './Category.tsx';
import Recom from './Recom.tsx';

const Homemain = () => {
  return (
    <div>
      <Search/>
      <Category />
      <Recom />
    </div>
  );
};

export default Homemain;

