import { LoginCredentials, RegisterCredentials } from '../interfaces/auth';
import api from '@/services/api';

export async function login(credentials: LoginCredentials) {
  const response = await api.post('/login', credentials);
  return response.data;
};

export async function register(credentials: RegisterCredentials) {
  const response = await api.post('/register', credentials);
  return response.data;
};