import React from 'react';
import styles from './Home.module.css';

interface Product {
  productId: string;
  picture: string;
  productName: string;
  price: string;
  updatedAt: string;
}

const Recom = ({ prob }: { prob: Product[] }) => {
  return (
    <div className={styles.recom}>
      <div className={styles.recomtitle}>요즘 뜨는 상품</div>
      <div className={styles.recomcontent}>
        {prob.length > 0 ? (
          prob.map((product) => (
            <div key={product.productId} className={styles.recomitembox}>
              <img src={product.picture} alt={product.productName} className={styles.recomitemphoto} />
              <div className={styles.itemname}>{product.productName}</div>
              <div className={styles.itemprice}>{product.price} ₩</div>
            </div>
          ))
        ) : (
          <div className={styles.noproducts}>추천 상품이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default Recom;
