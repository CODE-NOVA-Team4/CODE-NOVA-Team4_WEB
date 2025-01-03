import { Category } from './category';
export interface Product {
    id: string;
    images: string[];
    categories: Category[];  // string[] 대신 Category[] 사용
    name: string;
    description: string;
    price: number;
    tradeMethod: 'direct' | 'delivery';
    sellerId: string;
  }