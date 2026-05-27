import client from './client';
import type { AuthResponse, User } from '../types';

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await client.post<AuthResponse>('/login', { email, password });
  return response.data;
}

export async function register(
  name: string,
  email: string,
  password: string,
  password_confirmation: string
): Promise<AuthResponse> {
  const response = await client.post<AuthResponse>('/register', {
    name,
    email,
    password,
    password_confirmation,
  });
  return response.data;
}

export async function logout(): Promise<void> {
  await client.post('/logout');
}

export async function getUser(): Promise<User> {
  const response = await client.get<User>('/user');
  return response.data;
}
