import api from './api';
import type { User, ChangePasswordRequest } from '../types';

export const userService = {
  // GET /api/users - Obtener todos los usuarios
  getAll: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  // GET /api/users/:id - Obtener un usuario por ID
  getById: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  // GET /api/users/email/:email - Obtener usuario por email
  getByEmail: async (email: string): Promise<User> => {
    const response = await api.get<User>(`/users/email/${email}`);
    return response.data;
  },

  // GET /api/users/count - Contar usuarios
  count: async (): Promise<number> => {
    const response = await api.get<number>('/users/count');
    return response.data;
  },

  // POST /api/users - Crear usuario
  create: async (user: Omit<User, 'id' | 'createdDate' | 'updatedDate' | 'products'>): Promise<User> => {
    const response = await api.post<User>('/users', user);
    return response.data;
  },

  // PUT /api/users/:id - Actualizar usuario completo
  update: async (id: number, user: Partial<User>): Promise<User> => {
    const response = await api.put<User>(`/users/${id}`, user);
    return response.data;
  },

  // PATCH /api/users/:id - Actualizar usuario parcialmente
  patch: async (id: number, user: Partial<User>): Promise<User> => {
    const response = await api.patch<User>(`/users/${id}`, user);
    return response.data;
  },

  // DELETE /api/users/:id - Eliminar usuario
  delete: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },

  // GET /api/users/exists/:id - Verificar si usuario existe
  exists: async (id: number): Promise<boolean> => {
    const response = await api.get<boolean>(`/users/exists/${id}`);
    return response.data;
  },

  // POST /api/users/:id/change-password - Cambiar contraseña
  changePassword: async (id: number, request: ChangePasswordRequest): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>(`/users/${id}/change-password`, request);
    return response.data;
  },
};
