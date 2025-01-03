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
          <div className={styles.categoryGrid}>
            {CATEGORIES.map(category => {
              const isSelected = selectedCategories.some(c => c.id === category.id);
              return (
                <button
                  key={category.id}
                  className={`${styles.categoryItem} ${isSelected ? styles.selected : ''}`}
                  onClick={() => onSelectCategory(category)}
                  disabled={selectedCategories.length >= 2 && !isSelected}
                >
                  <div className={styles.categoryIcon}>
                    <img src={category.icon} alt={category.name} />
                  </div>
                  <span className={styles.categoryName}>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

export default CategoryModal;