import { apiClient } from './apiClient';

type GetAllUsersParams = {
  search?: string;
  role?: string;
  employeeId?: number;
  pageNumber?: number;
  pageSize?: number;
  status?: string;
  sortDirection?: string;
};

export async function getAllUsers(params: GetAllUsersParams = {}) {
  const searchParams = new URLSearchParams();

  if (params.search) {
    searchParams.append('search', params.search);
  }
  if (params.role) {
    searchParams.append('role', params.role);
  }
  if (params.employeeId) {
    searchParams.append('employeeId', String(params.employeeId));
  }

  if (params.sortDirection) {
    searchParams.append('sortDirection', params.sortDirection);
  }

  searchParams.append('pageNumber', String(params.pageNumber || 1));
  searchParams.append('pageSize', String(params.pageSize || 40));
  searchParams.append('status', params.status || 'active');

  return apiClient(`/api/User/GetAllUsers?${searchParams.toString()}`);
}

export async function getUserById(id: number) {
  return apiClient(`/api/User/GetUserById/${id}`);
}

// ADMİN ********************************************************

type CreateUserDto = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  roleType: string;
  employeeId: number;
};

export async function createUser(dto: CreateUserDto) {
  return apiClient('/api/Auth/CreateUserByAdmin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto),
  });
}


type UpdateUserDto = {
  username: string;
  email: string;
  roleType: string;
};

export async function updateUser(id: number, dto: UpdateUserDto) {
  return apiClient(`/api/User/UpdateUserByAdmin/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto),
  });
}

export async function deleteUser(id: number) {
  return apiClient(`/api/User/DeleteUserByAdmin/${id}`, {
    method: 'DELETE',
  });
}

export async function reactivateUser(id: number) {
  return apiClient(`/api/User/ReactivateUser/${id}`, {
    method: 'PUT',
  });
}