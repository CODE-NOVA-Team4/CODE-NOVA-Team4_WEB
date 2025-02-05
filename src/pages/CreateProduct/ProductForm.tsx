import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CreateProduct.module.css';
import backgreenArrow from '../../assets/images/arrow-green.svg';
import CategoryModal from '../../components/CategoryModal/CategoryModal.tsx';
import { Category } from '../../types/category.ts';

interface ProductFormData {
  images: File[];
  existingImages: string[];
  categories: Category[];
  name: string;
  description: string;
  price: string;
  tradeType: 'meet' | 'delivery' | '';
}

interface ProductFormProps {
  mode: 'create' | 'edit';
  productId?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ mode, productId }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    images: [],
    existingImages: [],
    categories: [],
    name: '',
    description: '',
    price: '',
    tradeType: '',
  });

  useEffect(() => {
    if (mode === 'edit' && productId) {
      const savedProduct = localStorage.getItem(`product_${productId}`);
      if (savedProduct) {
        const productData = JSON.parse(savedProduct);
        setFormData({
          images: [],
          existingImages: productData.images,
          categories: productData.categories.map((name: string) => ({
            id: name.toLowerCase().replace(/\s/g, ''),
            name
          })),
          name: productData.name,
          description: productData.description,
          price: productData.price.toString(),
          tradeType: productData.tradeType,
        });
      }
    }
  }, [mode, productId]);

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
      const totalImages = formData.images.length + formData.existingImages.length;
      if (newImages.length + totalImages <= 5) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...newImages]
        }));
      } else {
        alert('최대 5장까지만 업로드 가능합니다.');
      }
    }
  };

  const handleImageDelete = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index)
    }));
  };

  const handleExistingImageDelete = (index: number) => {
    setFormData(prev => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, idx) => idx !== index)
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTradeTypeChange = (method: 'meet' | 'delivery') => {
    setFormData(prev => ({
      ...prev,
      tradeType: method
    }));
  };

  const isFormValid = () => {
    const totalImages = formData.images.length + formData.existingImages.length;
    return (
      totalImages > 0 &&
      formData.categories.length > 0 &&
      formData.name &&
      formData.description &&
      formData.price &&
      formData.tradeType
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const newImageUrls = formData.images.map(file => URL.createObjectURL(file));
    const allImageUrls = [...formData.existingImages, ...newImageUrls];

    const productData = {
      id: mode === 'edit' ? productId : Date.now().toString(),
      images: allImageUrls,
      categories: formData.categories.map(cat => cat.name),
      name: formData.name,
      description: formData.description,
      price: parseInt(formData.price),
      tradeType: formData.tradeType,
      sellerId: 'user123'
    };

    localStorage.setItem(`product_${productData.id}`, JSON.stringify(productData));
    navigate(`/product/${productData.id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          onClick={() => navigate(-1)} 
          className={styles.backButton}
        >
          <img src={backgreenArrow} alt="back" />
        </button>
        <span className={styles.headerspan}>
          {mode === 'create' ? '상품 등록하기' : '상품 수정하기'}
        </span>
      </div>
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
            {formData.images.length === 0 && formData.existingImages.length === 0 && (
              <p>최대 5장의 사진을 첨부해주세요</p>
            )}
          </label>
          <div className={styles.imagePreview}>
            {formData.existingImages.map((imgUrl, idx) => (
              <div key={`existing-${idx}`} className={styles.imageWrapper}>
                <img src={imgUrl} alt={`existing preview ${idx}`} />
                <button
                  type="button"
                  onClick={() => handleExistingImageDelete(idx)}
                  className={styles.deleteButton}
                >
                  ×
                </button>
              </div>
            ))}
            {formData.images.map((img, idx) => (
              <div key={`new-${idx}`} className={styles.imageWrapper}>
                <img
                  src={URL.createObjectURL(img)}
                  alt={`new preview ${idx}`}
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
              className={`${styles.tradeButton} ${formData.tradeType === 'meet' ? styles.active : ''}`}
              onClick={() => handleTradeTypeChange('meet')}
            >
              직거래
            </button>
            <button
              type="button"
              className={`${styles.tradeButton} ${formData.tradeType === 'delivery' ? styles.active : ''}`}
              onClick={() => handleTradeTypeChange('delivery')}
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
          {mode === 'create' ? '물품 등록하기' : '수정 완료'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;