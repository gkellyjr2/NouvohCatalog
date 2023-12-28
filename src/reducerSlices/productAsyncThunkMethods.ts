import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../app/models/product";
import axiosProductHelpers from "../app/apihelpers/axiosProductHelpers";
import { RootState } from "../store";
import { HttpGetProductsParameters } from "../app/models/HttpGetProductsParameters";
import { setPaginationData } from "./productSlice";



function getProductsSearchParams(searchParams: HttpGetProductsParameters) {
    const params = new URLSearchParams();
    params.append('sortOrder', searchParams.sortOrder);
    params.append('NumberOfItemsPerPage', searchParams.NumberOfItemsPerPage.toString());
    params.append('CurrentPage', searchParams.CurrentPage.toString());
    if(searchParams.searchName) params.append('searchName', searchParams.searchName);
    if(searchParams.brand) params.append('brand', searchParams.brand);
    if(searchParams.category) params.append('category', searchParams.category); 
    if(searchParams.selectedBrands) {
        const brandString: string = searchParams.selectedBrands.toString();
        if(brandString.length > 0) params.append('selectedBrands', searchParams.selectedBrands.toString());
    }
    if(searchParams.selectedCategories) {
        const categoryString: string = searchParams.selectedCategories.toString();
        if(categoryString.length > 0) params.append('selectedCategories', searchParams.selectedCategories.toString());
    }
    return params;
}

export const retrieveProductAsync = createAsyncThunk<Product[], void, {state: RootState}>(
    "products/retrieveProductsAsync",
    async (_, thunkAPI) => {
        const params = getProductsSearchParams(thunkAPI.getState().ProductData.HttpGetProductsParameters);
        try{
            const response = await axiosProductHelpers.catalogOfProducts.allProducts(params);
            thunkAPI.dispatch(setPaginationData(response.pagination));
            return response.data;
        }
        catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue({error: error.data, errorMessage: 'Products could not be retrieved!'});
        }
    }

);
export const retrieveProductDetailAsync = createAsyncThunk<Product, {productId: number}>(
    "products/retrieveProductDetailAsync",
    async ({productId}, thunkAPI) => {
        try{
            return await axiosProductHelpers.catalogOfProducts.productDetails(productId);
        }
        catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue({error: error.data, 
                errorMessage: 'Product details could not be retrieved!', productId: productId});
        }
    }
);