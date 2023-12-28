import axios, { AxiosError, AxiosResponse } from "axios";
import { Product } from "../models/product";
import { PaginationResponse } from "../models/pagination";
import { toast } from "react-toastify";
import { router } from "../router";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7700/api/products/',
    withCredentials: true

});
axiosInstance.defaults.withCredentials = true;
const axiosResponseBody = (response: AxiosResponse) => response.data;

axiosInstance.interceptors.response.use(response => {
    const paginationData = response.headers['pagination'];

    if(paginationData) {
        response.data = new PaginationResponse(response.data, JSON.parse(paginationData));
        return response;
    }
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
    get: (url: string, params?: URLSearchParams) => axiosInstance.get(url, {params}).then(axiosResponseBody),
    post: (url: string, body: {}) => axiosInstance.post(url, body).then(axiosResponseBody),
    put: (url: string, body: {}) => axiosInstance.put(url, body).then(axiosResponseBody),
    del: (url: string) => axiosInstance.delete(url).then(axiosResponseBody)

}

const catalogOfProducts = {
    allProducts: (params: URLSearchParams) => apiRequests.get('getproducts', params),
    productDetails: (id: number) => apiRequests.get(`getproduct/${id}`),
    createProduct: (product: Product) => apiRequests.post('createproduct', product),
    updateProduct: (product: Product) => apiRequests.put('updateproduct', product),
    deleteProduct: (id: number) => apiRequests.del(`deleteproduct/${id}`)
}
const axiosProductHelpers = {
    catalogOfProducts
}

export default axiosProductHelpers;
