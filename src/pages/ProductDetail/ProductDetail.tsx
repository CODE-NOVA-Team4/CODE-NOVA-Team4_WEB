import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import backgreenArrow from '../../assets/images/arrow-green.svg';
import heart from '../../assets/images/white-heart.svg';
import heartFilled from '../../assets/images/red-heart.svg';

interface Product {
    id: string;
    images: string[];
    categories: string[];  // 여기는 string 배열로 유지
    name: string;
    description: string;
    price: number;
    tradeMethod: 'direct' | 'delivery';
    sellerId: string;
}

const dummyProduct: Product = {
    id: '1',
    images: ['/placeholder.jpg', '/placeholder.jpg'],
    categories: ['전공서적', '족보'],  // 문자열 배열로 수정
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
    const { id } = useParams(); // URL에서 상품 ID 가져오기
    const [product, setProduct] = useState<Product | null>(null);
    const [isLiked, setIsLiked] = useState(false);
    const isMyProduct = true; // 임시로 true로 설정
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };
  
    useEffect(() => {
      if (id) {
        // localStorage에서 상품 데이터 가져오기
        const savedProduct = localStorage.getItem(`product_${id}`);
        if (savedProduct) {
          setProduct(JSON.parse(savedProduct));
        } else {
          // 저장된 데이터가 없으면 더미 데이터 사용
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
              {product.images.length > 1 && (
                <>
                  <button 
                    className={`${styles.sliderButton} ${styles.prevButton}`}
                    onClick={handlePrevImage}
                  >
                    {'<'}
                  </button>
                  <button 
                    className={`${styles.sliderButton} ${styles.nextButton}`}
                    onClick={handleNextImage}
                  >
                    {'>'}
                  </button>
                </>
              )}
              <img 
                src={product.images[currentImageIndex]} 
                alt={`상품 이미지 ${currentImageIndex + 1}`} 
              />
              {product.images.length > 1 && (
                <div className={styles.pagination}>
                  {product.images.map((_, index) => (
                    <div 
                      key={index}
                      className={`${styles.dot} ${index === currentImageIndex ? styles.activeDot : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
  
        <div className={styles.content}>
          <div className={styles.tags}>
            {product.categories.map((category, index) => (
              <span key={index} className={styles.tag}>{category}</span>
            ))}
            <span className={styles.tag}>
              {product.tradeMethod === 'direct' ? '직거래' : '택배'}
            </span>
          </div>
  
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.price}>{product.price.toLocaleString()} ₩</div>
  
          <div className={styles.buttons}>
            <button 
              className={styles.mainButton}
              onClick={() => isMyProduct ? navigate('/edit-product') : navigate(`/chat/product/${product.id}`)}
            >
              {isMyProduct ? '수정하기' : '채팅하기'}
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
          </div>
        </div>
      </div>
    );
  };

export default ProductDetail;