import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFilterHelpers from "../app/apihelpers/axiosFilterHelpers";

export const retrieveBrandsAndCategories = createAsyncThunk<any>(
    'products/retrieveBrandsAndCategoriesAsync',
    async (_, thunkAPI) => {
        try{
            return await axiosFilterHelpers.brandsAndCategories();
        }
        catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue({error: error.data, errorMessage: 'Brands and Categories could not be retrieved!'});
        }
    }
     
)