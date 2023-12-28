import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7700/api/ErrorHandler/'
});

axiosInstance.defaults.withCredentials = true; // This is to allow the cookie to be sent to the server for authentication
const axiosResponseBody = (response: AxiosResponse) => response.data;

axiosInstance.interceptors.response.use(response => {
    return response;
    }, 
    (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const modalStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 404:
            router.navigate('/notfound');
            break;
        case 500:
            router.navigate('/servererror', {state: {error: data}});
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
    }
);
const triggerRequests = {
    get: (url: string) => axiosInstance.get(url).then(axiosResponseBody),
    post: (url: string, body: {}) => axiosInstance.post(url, body).then(axiosResponseBody),
    put: (url: string, body: {}) => axiosInstance.put(url, body).then(axiosResponseBody),
    del: (url: string) => axiosInstance.delete(url).then(axiosResponseBody)

}

const errorTriggers = {
    triggerNotFoundError: () => triggerRequests.get('NotFoundError/not-found'),
    triggerBadRequestError: () => triggerRequests.get('BadRequestError/bad-request'),
    triggerUnauthorizedError: () => triggerRequests.get('UnauthorizedError/unauthorized'),
    triggerValidationError: () => triggerRequests.get('ValidationError/validation-error'),
    triggerServerError: () => triggerRequests.get('ServerError/server-error'),
    triggerDatabaseError: () => triggerRequests.get('DatabaseError/database-error'),

}
const axiosErrorTriggers = {
    errorTriggers
}

export default axiosErrorTriggers;