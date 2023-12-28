import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider} from 'react-router-dom';
import { router } from './app/router';
import { StoreProvider } from './app/contexts/storeContext';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')as HTMLElement).render(
    <React.StrictMode>
        <StoreProvider>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </StoreProvider>
    </React.StrictMode>
);