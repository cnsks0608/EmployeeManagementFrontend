import { apiClient } from './apiClient';

export async function getMe() {
  return apiClient('/api/User/GetMe');
}

type UpdateMeDto = {
  username: string;
};

export async function updateMe(dto: UpdateMeDto) {
  return apiClient('/api/User/UpdateMe', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto),
  });
}

type ChangePasswordDto = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export async function changePassword(dto: ChangePasswordDto) {
  return apiClient('/api/User/ChangePassword', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto),
  });
}

export async function logout() {
  return apiClient('/api/Auth/Logout', {
    method: 'POST',
  });
}

