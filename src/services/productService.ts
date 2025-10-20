import api from './api';
import type { Product, CreateProductRequest } from '../types';

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products');
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  getByUserId: async (userId: number): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products/user/${userId}`);
    return response.data;
  },

  create: async (product: CreateProductRequest): Promise<Product> => {
    const response = await api.post<Product>('/products', product);
    return response.data;
  },

  createForUser: async (userId: number, product: CreateProductRequest): Promise<Product> => {
    const response = await api.post<Product>(`/products/user/${userId}`, product);
    return response.data;
  },

  update: async (id: number, product: Partial<CreateProductRequest>): Promise<Product> => {
    const response = await api.put<Product>(`/products/${id}`, product);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
