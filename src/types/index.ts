// User - Coincide exactamente con la respuesta del backend
export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Se devuelve hasheado, pero mejor no mostrarlo en el frontend
  createdDate: string; // "2025-10-17T16:33:12.549868"
  updatedDate: string; // "2025-10-19T14:25:32.227655"
  products?: Product[]; // Array de productos del usuario
}

// Product - Coincide exactamente con los productos en la respuesta
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string; // URL de la imagen del producto
  createdDate: string;
  updatedDate: string;
  // NO tiene 'user' para evitar recursión (backend usa @JsonBackReference)
}

// AuthResponse - Coincide exactamente con la respuesta de login del backend
export interface AuthResponse {
  token: string;
  type: string; // "Bearer"
  userId: number;
  email: string;
  name: string;
}

export interface LoginRequest {
  email: string; // Tu backend probablemente usa email para login
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
}
