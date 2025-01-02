import React from 'react';
import styles from './CategoryModal.module.css';
import { Category, CATEGORIES } from '../../types/category.ts';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategories: Category[];
  onSelectCategory: (category: Category) => void;
}

const CategoryModal = ({
    isOpen,
    onClose,
    selectedCategories,
    onSelectCategory
  }: CategoryModalProps) => {
    if (!isOpen) return null;
  
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h3>카테고리 선택</h3>
            <button onClick={onClose} className={styles.closeButton}>
              ×
            </button>
          </div>
          <p className={styles.subtitle}>최대 2개까지 선택 가능합니다</p>
          <div className={styles.categoryList}>
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                className={`${styles.categoryItem} ${
                  selectedCategories.some(c => c.id === category.id) ? styles.selected : ''
                }`}
                onClick={() => onSelectCategory(category)}
                disabled={selectedCategories.length >= 2 && !selectedCategories.some(c => c.id === category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default CategoryModal;