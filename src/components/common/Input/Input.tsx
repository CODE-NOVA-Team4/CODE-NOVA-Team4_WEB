import React from 'react';
import styles from './Input.module.css';
import { InputProps } from './Input.types';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  error,
  disabled = false,
  required = false,
  fullWidth = false,
  label,
}: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
        required={required}
        className={`
          ${styles.input}
          ${error ? styles.error : ''}
          ${fullWidth ? styles.fullWidth : ''}
        `}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Input;