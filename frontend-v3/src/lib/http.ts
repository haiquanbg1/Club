import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';

// Tạo lớp HttpError để xử lý lỗi HTTP
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
    // headers: {
    //     'Content-Type': 'application/json',
    // },
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

// Cấu hình interceptor để xử lý tự động refresh token
apiClient.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        // Xử lý token hết hạn (410) và gọi lại request nếu refresh thành công
        if (error.response?.status === 410 && !originalRequest._retry) {
            originalRequest._retry = true; // Đánh dấu rằng đã thử refresh token
            const refreshed = await refreshAccessToken();

            if (refreshed) {
                return apiClient(originalRequest); // Retry request với token mới
            }
        }

        // Nếu lỗi khác hoặc không refresh thành công
        return Promise.reject(new HttpError({
            status: error.response?.status,
            payload: error.response?.data,
        }));
    }
);

// Hàm request chung
const request = async <Response>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    url: string,
    options?: AxiosRequestConfig | undefined
): Promise<{ status: number, payload: Response }> => {
    try {
        const isFormData = options?.data instanceof FormData;
        const headers = {
            ...(!isFormData && { 'Content-Type': 'application/json' }), // Chỉ thêm Content-Type nếu không phải FormData
            ...options?.headers
        };
        // Thực hiện request
        const response: AxiosResponse<Response> = await apiClient.request({
            ...options,
            method,
            headers,
            url,
        });

        return {
            status: response.status,
            payload: response.data,
        };
    } catch (error: any) {
        // // Xử lý token hết hạn (410) và gọi lại request nếu refresh thành công
        // if (error.response?.status === 410 && !error.config._retry) {
        //     error.config._retry = true;
        //     const refreshed = await refreshAccessToken();
        //     if (refreshed) {
        //         const retryResponse: AxiosResponse<Response> = await apiClient.request(error.config);
        //         return {
        //             status: retryResponse.status,
        //             payload: retryResponse.data,
        //         };
        //     }
        // }

        // Nếu lỗi khác hoặc không refresh thành công
        throw new HttpError({
            status: error.response?.status,
            payload: error.response?.data,
        });
    }
};

// Các phương thức HTTP sử dụng Axios
const http = {
    get<Response>(
        url: string,
        options?: Omit<AxiosRequestConfig, 'data'> | undefined
    ) {
        return request<Response>('GET', url, options);
    },
    post<Response>(
        url: string,
        data: any,
        options?: Omit<AxiosRequestConfig, 'data'> | undefined
    ) {
        return request<Response>('POST', url, { ...options, data });
    },
    put<Response>(
        url: string,
        data: any,
        options?: Omit<AxiosRequestConfig, 'data'> | undefined
    ) {
        return request<Response>('PUT', url, { ...options, data });
    },
    delete<Response>(
        url: string,
        data?: any,
        options?: Omit<AxiosRequestConfig, 'data'> | undefined
    ) {
        return request<Response>('DELETE', url, { ...options, data });
    },
    patch<Response>(
        url: string,
        data: any,
        options?: Omit<AxiosRequestConfig, 'data'> | undefined
    ) {
        return request<Response>('PATCH', url, { ...options, data });
    },
};

export default http;


