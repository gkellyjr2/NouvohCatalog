import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7700/api/products/',
    withCredentials: true
    });

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
                    //throw modalStateErrors.flat();
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

const apiRequests = {
    get: (url: string) => axiosInstance.get(url).then(axiosResponseBody)
}

const brandsAndCategories = () => apiRequests.get('GetFilters/filters');

const axiosFilterHelpers = {
    brandsAndCategories
}

export default axiosFilterHelpers;