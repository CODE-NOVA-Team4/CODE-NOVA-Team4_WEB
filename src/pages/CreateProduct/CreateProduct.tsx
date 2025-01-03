import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreateProduct.module.css';
import backgreenArrow from '../../assets/images/arrow-green.svg';
import CategoryModal from '../../components/CategoryModal/CategoryModal.tsx';
import { Category } from '../../types/category.ts';

interface ProductForm {
  images: File[];
  categories: Category[];
  name: string;
  description: string;
  price: string;
  tradeMethod: 'direct' | 'delivery' | '';
}

const CreateProduct = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ProductForm>({
    images: [],
    categories: [],
    name: '',
    description: '',
    price: '',
    tradeMethod: '',
  });

  const handleCategorySelect = (category: Category) => {
    setFormData(prev => {
      const isAlreadySelected = prev.categories.some(c => c.id === category.id);
      
      if (isAlreadySelected) {
        return {
          ...prev,
          categories: prev.categories.filter(c => c.id !== category.id)
        };
      }
      
      if (prev.categories.length >= 2) {
        return prev;
      }

      return {
        ...prev,
        categories: [...prev.categories, category]
      };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      if (newImages.length + formData.images.length <= 5) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...newImages]
        }));
      } else {
        alert('최대 5장까지만 업로드 가능합니다.');
      }
    }
  };

  // 이미지 삭제 함수 추가
  const handleImageDelete = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index)
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTradeMethodChange = (method: 'direct' | 'delivery') => {
    setFormData(prev => ({
      ...prev,
      tradeMethod: method
    }));
  };

  const isFormValid = () => {
    return (
      formData.images.length > 0 &&
      formData.categories.length > 0 &&
      formData.name &&
      formData.description &&
      formData.price &&
      formData.tradeMethod
    );
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!isFormValid()) return;

  // File 객체를 URL로 변환
  const imageUrls = formData.images.map(file => URL.createObjectURL(file));

  // 저장할 상품 데이터 구성
  const productData = {
    id: Date.now().toString(), // 임시 ID 생성
    images: imageUrls,
    categories: formData.categories.map(cat => cat.name), // Category 객체에서 name만 추출
    name: formData.name,
    description: formData.description,
    price: parseInt(formData.price),
    tradeMethod: formData.tradeMethod,
    sellerId: 'user123' // 임시 사용자 ID
  };

  // localStorage에 저장
  localStorage.setItem(`product_${productData.id}`, JSON.stringify(productData));

  // 상세 페이지로 이동
  navigate(`/product/${productData.id}`);
};

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        <img src={backgreenArrow} alt="back" />
      </button>
      <div className={styles.header}>상품 등록하기</div>
      <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.imageUpload}>
        <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        id="imageUpload"
        hidden
        />
        <label htmlFor="imageUpload" className={styles.imageUploadLabel}>
        <div className={styles.uploadIcon}>+</div>
        <p>최대 5장의 사진을 추가해주세요.</p>
        <p className={styles.imageCount}>{formData.images.length}/5</p>
        </label>
        <div className={styles.imagePreview}>
        {formData.images.map((img, idx) => (
            <div key={idx} className={styles.imageWrapper}>
            <img
                src={URL.createObjectURL(img)}
                alt={`preview ${idx}`}
            />
            <button
                type="button"
                onClick={() => handleImageDelete(idx)}
                className={styles.deleteButton}
            >
                ×
            </button>
            </div>
        ))}
        </div>
    </div>

        <div className={styles.inputGroup}>
          <label>카테고리</label>
          <input
            type="text"
            readOnly
            placeholder="최대 2개의 카테고리를 선택해주세요."
            value={formData.categories.map(c => c.name).join(', ')}
            onClick={() => setIsModalOpen(true)}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>상품명</label>
          <input
            type="text"
            name="name"
            placeholder="등록하실 상품의 이름을 입력해주세요."
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedCategories={formData.categories}
          onSelectCategory={handleCategorySelect}
        />

        <div className={styles.inputGroup}>
          <label>상품 설명</label>
          <textarea
            name="description"
            placeholder="상품에 대한 설명을 상세히 기입해주세요."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>가격</label>
          <input
            type="number"
            name="price"
            placeholder="상품의 가격(₩)을 입력해주세요."
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>선호하는 거래 방식</label>
          <div className={styles.tradeButtons}>
            <button
              type="button"
              className={`${styles.tradeButton} ${formData.tradeMethod === 'direct' ? styles.active : ''}`}
              onClick={() => handleTradeMethodChange('direct')}
            >
              직거래
            </button>
            <button
              type="button"
              className={`${styles.tradeButton} ${formData.tradeMethod === 'delivery' ? styles.active : ''}`}
              onClick={() => handleTradeMethodChange('delivery')}
            >
              택배
            </button>
          </div>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={!isFormValid()}
        >
          물품 등록하기
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;