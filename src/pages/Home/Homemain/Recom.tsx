import React from 'react';
import styles from './Home.module.css';
import fake from '../../../assets/images/Recomfake.svg';

interface Products {
  productId: string;
  picture: string;
  productName: string;
  price: string;
  updatedAt: string;
}

interface RecomProps {
  prob?: Products[]; // prob를 선택적 프로퍼티로 설정
}

const Recom: React.FC<RecomProps> = ({ prob = [] }) => {
  return (
    <div className={styles.recom}>
      <div className={styles.recomtitle}>요즘 뜨는 상품</div>
      <div className={styles.recomcontent}>
        {prob.map((item) => (
          <div key={item.productId} className={styles.recomitembox}>
            <img
              src={item.picture || fake} // item.picture가 없을 경우 fake 이미지 사용
              alt={item.productName}
              className={styles.recomitemphoto}
            />
            <div className={styles.itemname}>{item.productName}</div>
            <div className={styles.itemprice}>{item.price} ₩</div>
            <div className={styles.itemdescription}>{item.updatedAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recom;
