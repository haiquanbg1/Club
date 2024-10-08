import envConfig from "@/config"
import { LoginResType } from "@/schemaValidations/auth.schema"
import { normalizePath } from "./utils"

type CustomOptions = Omit<RequestInit, 'method'> & {
    baseUrl?: string | undefined
}

export class HttpError extends Error {
    status: number
    payload: any
    constructor({ status, payload }: { status: number, payload: any }) {
        super('Http Error')
        this.status = status
        this.payload = payload
    }
}
// Hàm gọi API refresh token
const refreshAccessToken = async (): Promise<boolean> => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/refresh-token', {
            method: 'PUT',
            credentials: 'include', // Để gửi cookie
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        return true;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        return false;
    }
};

const request = async<Response>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    url: string,
    options?: CustomOptions | undefined
) => {
    const body = options?.body ? JSON.stringify(options.body) : undefined
    const baseHeaders = {
        'Content-Type': 'application/json',
    }
    const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl

    const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`

    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            ...baseHeaders,
            ...options?.headers
        },
        body,
        method
    })
    if (res.status === 410) {
        // Gọi API để làm mới token
        const refreshed = await refreshAccessToken();

        // Nếu refresh token thành công
        if (!refreshed) {
            // Thực hiện lại yêu cầu ban đầu sau khi token được làm mới
            const res = await fetch(fullUrl, {
                ...options,
                headers: {
                    ...baseHeaders,
                    ...options?.headers
                },
                body,
                method
            })
            const payload: Response = await res.json()
            const data = {
                status: res.status,
                payload
            }
            if (!res.ok) {
                throw new HttpError(data)
            }
            return data
        }
    } else {
        const payload: Response = await res.json()
        const data = {
            status: res.status,
            payload
        }
        if (!res.ok) {
            throw new HttpError(data)
        }
        return data
    }

}

const http = {
    get<Response>(
        url: string,
        options?: Omit<CustomOptions, 'body'> | undefined
    ) {
        return request<Response>('GET', url, options)
    },
    post<Response>(
        url: string,
        body: any,
        options?: Omit<CustomOptions, 'body'> | undefined
    ) {
        return request<Response>('POST', url, { ...options, body })
    },
    put<Response>(
        url: string,
        body: any,
        options?: Omit<CustomOptions, 'body'> | undefined
    ) {
        return request<Response>('PUT', url, { ...options, body })
    },
    delete<Response>(
        url: string,
        body: any,
        options?: Omit<CustomOptions, 'body'> | undefined
    ) {
        return request<Response>('DELETE', url, { ...options, body })
    },
    patch<Response>(
        url: string,
        body: any,
        options?: Omit<CustomOptions, 'body'> | undefined
    ) {
        return request<Response>('PATCH', url, { ...options, body })
    },
}
export default http