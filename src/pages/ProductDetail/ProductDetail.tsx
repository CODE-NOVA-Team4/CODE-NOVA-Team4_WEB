import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import backgreenArrow from '../../assets/images/arrow-green.svg';
import heart from '../../assets/images/white-heart.svg';
import heartFilled from '../../assets/images/red-heart.svg';

interface Product {
    id: string;
    images: string[];
    categories: string[];
    name: string;
    description: string;
    price: number;
    tradeMethod: 'direct' | 'delivery';
    sellerId: string;
}

const dummyProduct: Product = {
    id: '1',
    images: ['/placeholder.jpg', '/placeholder.jpg'],
    categories: ['전공서적', '족보'],
    name: '미개봉 로봇공학 전공서적',
    description: `전공서적 총 5권 세트로, 상태는 A급입니다.
    거의 새 책 수준으로 깨끗하며, 필기나 낙서 없습니다.
    2학년 공학 필수 교재들로, 수업에 꼭 필요한 책들만 모아둔 구성입니다.
    직접 직거래 가능하며, 택배도 가능합니다!`,
    price: 11000,
    tradeMethod: 'direct',
    sellerId: 'user123'
};

const ProductDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLiked, setIsLiked] = useState(false);
    
    // 실제 구현 시에는 로그인된 사용자의 ID를 가져와야 합니다
    const currentUserId = 'user123'; // 임시로 설정
    const isMyProduct = product?.sellerId === currentUserId;

    useEffect(() => {
      if (id) {
        const savedProduct = localStorage.getItem(`product_${id}`);
        if (savedProduct) {
          setProduct(JSON.parse(savedProduct));
        } else {
          setProduct(dummyProduct);
        }
      }
    }, [id]);

    if (!product) return <div>로딩 중...</div>;

    return (
        <div className={styles.container}>
          <div className={styles.header}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
                <img src={backgreenArrow} alt="back" />
            </button>
          </div>

          <div className={styles.imageSlider}>
            <div className={styles.imageWrapper}>
              {product.images.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`상품 이미지 ${index + 1}`} 
                />
              ))}
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.tags}>
              <span className={`${styles.tag} ${styles.tagTrade}`}>
                {product.tradeMethod === 'direct' ? '직거래' : '택배'}
              </span>
              {product.categories.map((category, index) => (
                <span key={index} className={`${styles.tag} ${styles.tagCategory}`}>
                  {category}
                </span>
              ))}
            </div>

            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.description}>{product.description}</p>
            <div className={styles.price}>{product.price.toLocaleString()} ₩</div>

            <div className={styles.buttons}>
              {isMyProduct ? (
                // 판매자인 경우
                <button 
                  className={styles.mainButton}
                  onClick={() => navigate('/edit-product')}
                >
                  수정하기
                </button>
              ) : (
                // 일반 사용자인 경우
                <>
                  <button 
                    className={styles.mainButton}
                    onClick={() => navigate(`/chat/product/${product.id}`)}
                  >
                    채팅하기
                  </button>
                  <button 
                    className={styles.likeButton}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <img 
                      src={isLiked ? heartFilled : heart} 
                      alt="찜하기"
                    />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
    );
};

export default ProductDetail;