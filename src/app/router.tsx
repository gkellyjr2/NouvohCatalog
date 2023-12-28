import{ Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../app/layout/App';
import Homepage from '../../Homepage1';
import { AppTheme } from './constants/apptheme';
import About from '../pages/about';
import ProductDetails from '../pages/catalog/Details/productDetails';
import Catalog from '../pages/catalog/catalog';
import ContactUs from '../pages/contactus';
import ServerError from '../pages/errorComponents/serverError';
import NotFound from '../pages/errorComponents/notfound';
import ProductNotFound from '../pages/errorComponents/productNotFound';
import Basket from '../pages/basket/Basket';
import CheckOut from '../pages/basket/CheckOut';
import LoginAUser from '../pages/user/loginAUser';
import RegisterAUser from '../pages/user/registerAUser';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', 
                element: <Homepage newTheme={AppTheme} /> 
            },
            { path: '/catalog', 
                element: <Catalog newTheme={AppTheme}/> 
            },
            { path: '/catalog/:id', 
              element: <ProductDetails /> 
            },
            { path: '/about', 
              element: <About /> 
            },
            { path: '/contact', 
              element: <ContactUs /> 
            },
            { path: '/login', 
              element: <LoginAUser /> 
            },
            { path: '/register', 
              element: <RegisterAUser /> 
            },
            { path: '/servererror', 
              element: <ServerError /> 
            },
            { path: '/notfound', 
              element: <NotFound /> 
            },
            { path: '/productnotfound', 
              element: <ProductNotFound /> 
            },
            { path: '/basket', 
              element: <Basket /> 
            },
            { path: '/checkout', 
              element: <CheckOut /> 
            },
            { path: '*', 
              element: <Navigate replace to='notfound' /> 
            },
        ]
    }
]);