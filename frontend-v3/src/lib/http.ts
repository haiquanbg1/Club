import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import envConfig from '../config';

type CustomOptions = AxiosRequestConfig;

export class HttpError extends Error {
    status: number;
    payload: any;
    constructor({ status, payload }: { status: number, payload: any }) {
        super('Http Error');
        this.status = status;
        this.payload = payload;
    }
}

// Tạo instance của Axios với cấu hình mặc định
const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Để gửi cookie trong mọi request
});

// Hàm gọi API refresh token
const refreshAccessToken = async (): Promise<boolean> => {
    try {
        const response = await apiClient.put('/auth/refresh-token');

        if (response.status !== 200) {
            throw new Error('Failed to refresh token');
        }

        return true;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        return false;
    }
};

// Interceptor để xử lý token hết hạn và làm mới tự động
apiClient.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 410 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshed = await refreshAccessToken();
            if (refreshed) {
                return apiClient(originalRequest);
            }
        }
        return Promise.reject(new HttpError({
            status: error.response?.status,
            payload: error.response?.data,
        }));
    }
);

const request = async <Response>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    url: string,
    options?: CustomOptions | undefined
) => {
    try {
        const response: AxiosResponse<Response> = await apiClient.request({
            ...options,
            method,
            url,
        });
        return {
            status: response.status,
            payload: response.data,
        };
    } catch (error: any) {
        throw new HttpError({
            status: error.response?.status,
            payload: error.response?.data,
        });
    }
};

const http = {
    get<Response>(
        url: string,
        options?: Omit<CustomOptions, 'data'> | undefined
    ) {
        return request<Response>('GET', url, options);
    },
    post<Response>(
        url: string,
        data: any,
        options?: Omit<CustomOptions, 'data'> | undefined
    ) {
        return request<Response>('POST', url, { ...options, data });
    },
    put<Response>(
        url: string,
        data: any,
        options?: Omit<CustomOptions, 'data'> | undefined
    ) {
        return request<Response>('PUT', url, { ...options, data });
    },
    delete<Response>(
        url: string,
        data?: any,
        options?: Omit<CustomOptions, 'data'> | undefined
    ) {
        return request<Response>('DELETE', url, { ...options, data });
    },
    patch<Response>(
        url: string,
        data: any,
        options?: Omit<CustomOptions, 'data'> | undefined
    ) {
        return request<Response>('PATCH', url, { ...options, data });
    },
};

export default http;
