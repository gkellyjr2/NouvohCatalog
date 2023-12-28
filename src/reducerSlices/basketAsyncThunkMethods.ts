import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosBasketHelpers from "../app/apihelpers/axiosBasketHelpers";
import { basket } from "../app/models/basket";

export const addBasketItemAsync = createAsyncThunk<basket, {productId: number, quantity?: number}>(
    "basket/addBasketItemAsync",
        async ({productId, quantity = 1}) => {
            try{
                
                return await axiosBasketHelpers.basketApis.addToBasket(productId, quantity);
            }
            catch (error: any){
                console.log(error);
                return thunkAPI.rejectWithValue({error: error.data, productId: productId, errorMessage: 'Item could not be added to cart!'});
            }
            finally{
                toast.success('Item added to cart!');
            }
    }
);
export const deleteBasketItemAsync = createAsyncThunk<basket, {productId: number, quantity?: number}>(
    "basket/deleteBasketItemAsync",
        async ({productId, quantity = 1}) => {
            try{
                return await axiosBasketHelpers.basketApis.deleteFromBasket(productId, quantity);
            }
            catch (error: any){
                 console.log(error);
                 return thunkAPI.rejectWithValue({error: error.data, productId: productId, errorMessage: 'Item could not be deleted from cart!'});
            }
            finally{
                if (quantity === 1)
                    toast.success('Item removed from cart!');
                else
                toast.success('Item removed!');
            }
    }
);

export const getBasketAsync = createAsyncThunk<basket>(
    "basket/getBasketAsync",
        async () => {
            try{
                return await axiosBasketHelpers.basketApis.getBasket();
            }
            catch (error: any){
                 console.log(error);
                 return thunkAPI.rejectWithValue({error: error.data, errorMessage: 'Basket could not be retrieved!'});
            }
    }
);

