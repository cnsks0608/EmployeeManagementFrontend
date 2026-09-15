import { apiClient } from './apiClient';

type GetAllActivityLogsParams = {
    username?: string;
    targetName?: string;
    action?: string;
    isSuccess?: boolean;
    startDate?: string;
    endDate?: string;
    pageNumber?: number;
    pageSize?: number;
    sortDirection?: string;
};

export async function getAllActivityLogs(params: GetAllActivityLogsParams = {}) {
    const searchParams = new URLSearchParams();

    if (params.username) {
        searchParams.append('username', params.username);
    }
    if (params.targetName) {
        searchParams.append('targetName', params.targetName);
    }
    if (params.action) {
        searchParams.append('action', params.action);
    }
    if (params.isSuccess !== undefined) {
        searchParams.append('isSuccess', String(params.isSuccess));
    }
    if (params.startDate) {
        searchParams.append('startDate', params.startDate);
    }
    if (params.endDate) {
        searchParams.append('endDate', params.endDate);
    }

    if (params.sortDirection) {
        searchParams.append('sortDirection', params.sortDirection);
    }

    searchParams.append('pageNumber', String(params.pageNumber || 1));
    searchParams.append('pageSize', String(params.pageSize || 40));

    return apiClient(`/api/ActivityLog/GetAllActivityLogs?${searchParams.toString()}`);
}


type GetAllRequestLogsParams = {
    httpMethod?: string;
    statusCode?: number;
    username?: string;
    startDate?: string;
    endDate?: string;
    pageNumber?: number;
    pageSize?: number;
    sortDirection?: string;
};

export async function getAllRequestLogs(params: GetAllRequestLogsParams = {}) {
    const searchParams = new URLSearchParams();

    if (params.httpMethod) {
        searchParams.append('httpMethod', params.httpMethod);
    }
    if (params.statusCode) {
        searchParams.append('statusCode', String(params.statusCode));
    }
    if (params.username) {
        searchParams.append('username', params.username);
    }
    if (params.startDate) {
        searchParams.append('startDate', params.startDate);
    }
    if (params.endDate) {
        searchParams.append('endDate', params.endDate);
    }

    if (params.sortDirection) {
        searchParams.append('sortDirection', params.sortDirection);
    }

    searchParams.append('pageNumber', String(params.pageNumber || 1));
    searchParams.append('pageSize', String(params.pageSize || 40));

    return apiClient(`/api/RequestLog/GetAllRequestLogs?${searchParams.toString()}`);
}