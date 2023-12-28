import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7700/api/Authentication/',
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
                    const modalStateErrors: string [] = [];
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
                router.navigate('/servererror',{state: {error: data}});
                break;
            default:
                break;
        }
        return Promise.reject(error.response);
        }
);

const apiRequests= {
    get: (url: string) => axiosInstance.get(url).then(axiosResponseBody),
    post: (url: string, body: {}) => axiosInstance.post(url, body).then(axiosResponseBody),
    put: (url: string, body: {}) => axiosInstance.put(url, body).then(axiosResponseBody),
    del: (url: string) => axiosInstance.delete(url).then(axiosResponseBody)

}
const UserAccountAPIs = {
    getCurrentUser: () => apiRequests.get(`GetCurrentUser/user`),
    userLogin: (userName: string, password: string) => apiRequests.post(`Login/uauth`, {userName, password}),
    userRegister: (userName: string, password: string, email: string, userRole: number) => 
        apiRequests.post(`RegisterAUser/ureg`, {userName, password, email, userRole}),
    userAddARole: (userName: string, roleAssigned: number) => apiRequests.post(`AddUserRole/uaddrole?userName=${userName}&roleAssigned=${roleAssigned}`, {}),
    delUser: (userName: string) => apiRequests.del(`DeleteAUser/udel?userName=${userName}`),
    delAUserRole: (userName: string, roleAssigned: number) => apiRequests.del(`DeleteAUserRole/udelrole?userName=${userName}&roleAssigned=${roleAssigned}`),
}
const axiosUserAccountHelpers = {
    UserAccountAPIs
}

export default axiosUserAccountHelpers;

