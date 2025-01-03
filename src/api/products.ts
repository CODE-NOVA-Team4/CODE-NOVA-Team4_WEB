import { api } from './axios';
import { Product } from '../types/product';

export const createProduct = async (productData: Omit<Product, 'id' | 'sellerId'>) => {
  const response = await api.post('/api/products', productData);
  return response.data;
};

export const getProduct = async (id: string) => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};