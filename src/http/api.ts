import type { CreateUserData, Credentials } from '../types';
import { api } from './client';

export const AUTH_SERVICE = '/api/auth';
const CATALOG_SERVICE = 'api/catalog';

//Auth service

export const login = (credentials: Credentials) =>
  api.post(`${AUTH_SERVICE}/auth/login`, credentials);

export const self = () => api.get(`${AUTH_SERVICE}/auth/self`);

export const logout = () => api.post(`${AUTH_SERVICE}/auth/logout`);

export const getUsers = (queryString: string) =>
  api.get(`${AUTH_SERVICE}/users?${queryString}`);

export const getTenants = () => api.get(`${AUTH_SERVICE}/tenants`);

export const createUsers = (user: CreateUserData) =>
  api.post(`${AUTH_SERVICE}/users`, user);
