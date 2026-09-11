import { apiClient } from './apiClient';

type GetAllEmployeesParams = {
    search?: string;
    email?: string;
    registrationNumber?: string;
    minSalary?: number;
    maxSalary?: number;
    startHireDate?: string;
    endHireDate?: string;
    pageNumber?: number;
    pageSize?: number;
    status?: string;
    departmentId?: number;
    titleId?: number;
    sortBy?: string;
    sortDirection?: string;
};

export async function getAllEmployees(params: GetAllEmployeesParams = {}) {
    const searchParams = new URLSearchParams();

    if (params.search) {
        searchParams.append('search', params.search);
    }
    if (params.email) {
        searchParams.append('email', params.email);
    }
    if (params.registrationNumber) {
        searchParams.append('registrationNumber', params.registrationNumber);
    }
    if (params.minSalary) {
        searchParams.append('minSalary', String(params.minSalary));
    }
    if (params.maxSalary) {
        searchParams.append('maxSalary', String(params.maxSalary));
    }
    if (params.startHireDate) {
        searchParams.append('startHireDate', params.startHireDate);
    }
    if (params.endHireDate) {
        searchParams.append('endHireDate', params.endHireDate);
    }
    if (params.departmentId) {
        searchParams.append('departmentId', String(params.departmentId));
    }
    if (params.titleId) {
        searchParams.append('titleId', String(params.titleId));
    }
    if (params.sortBy) {
        searchParams.append('sortBy', params.sortBy);
    }
    if (params.sortDirection) {
        searchParams.append('sortDirection', params.sortDirection);
    }

    searchParams.append('pageNumber', String(params.pageNumber || 1));
    searchParams.append('pageSize', String(params.pageSize || 40));
    searchParams.append('status', params.status || 'active');  // status hiç verilmezse varsayılan olarak aftifler gösterilir
    return apiClient(`/api/Employee/GetAllEmployees?${searchParams.toString()}`);
}

// -------

export async function getEmployeeById(id: number) {
    return apiClient(`/api/Employee/GetEmployeeById/${id}`);
}


// ADMİN ********************************************************

type CreateEmployeeDto = {
    registrationNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    salary: number;
    hireDate: string;
    titleId: number;
};

export async function createEmployee(dto: CreateEmployeeDto) {
    return apiClient('/api/Employee/CreateEmployeeByAdmin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
    });
}

// ------

type UpdateEmployeeDto = {
    registrationNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    salary: number;
    hireDate: string;
    titleId: number;
};

export async function updateEmployee(id: number, dto: UpdateEmployeeDto) {
    return apiClient(`/api/Employee/UpdateEmployeeByAdmin/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
    });
}

// -------

export async function deleteEmployee(id: number) {
    return apiClient(`/api/Employee/DeleteEmployeeByAdmin/${id}`, {
        method: 'DELETE',
    });
}

// -------

export async function reactivateEmployee(id: number) {
  return apiClient(`/api/Employee/ReactivateEmployee/${id}`, {
    method: 'PUT',
  });
}









