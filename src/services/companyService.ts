import { apiClient } from './apiClient';

export async function getAllDepartments() {
  return apiClient('/api/Company/GetAllDepartments');
}

export async function getTitlesByDepartmentId(departmentId: number) {
  return apiClient(`/api/Company/GetTitlesByDepartmentsId/${departmentId}`);
}