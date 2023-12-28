import { bindActionCreators, configureStore } from "@reduxjs/toolkit";
import { IncrementCounter, DecrementCounter, ReviseTitle } from "./storeDispatchShorts/counterDispatchShorts";
import { CounterReducer } from "./reducerSlices/counterSlice";
import { counterSlice } from "./reducerSlices/counterSliceToolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { basketSlice } from "./reducerSlices/basketSlice";
import { productCatalogSlice } from './reducerSlices/productSlice';
import { filterSlice } from "./reducerSlices/filterSlice";


const store = Store();

const storeBoundShorts = bindActionCreators(
    {
            IncrementCounterValue: IncrementCounter,
            DecrementCounterValue: DecrementCounter,
            ReviseCounterTitle: ReviseTitle
    },
    store.dispatch
)
function Store(){
    return configureStore({
        reducer: {
            
            BasketData: basketSlice.reducer,
            ProductData: productCatalogSlice.reducer,
            FiltersData:filterSlice.reducer,
            CounterData: CounterReducer,
            CounterToolkitData: counterSlice.reducer,
        }
    });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useGeneralStoreDispatch = () => useDispatch<AppDispatch>();
export const useStorePropertySelector: TypedUseSelectorHook<RootState> = useSelector;
export {store, storeBoundShorts}