import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../app/models/product";
import { retrieveProductAsync, retrieveProductDetailAsync } from "./productAsyncThunkMethods";
import { RootState } from '../store';

const productsAdapter = createEntityAdapter<Product>()

function initializeHttpGetProductParameters() {
    return {
        sortOrder: 'name',
        NumberOfItemsPerPage: 8,
        CurrentPage: 1,
        searchName: '',
        selectedBrands: [],
        selectedCategories: [],
        paginationData: {
            numberOfItemsFromQuery: 0,
            numberOfPages: 0,
            numberOfItemsPerPage: 0,
            currentPage: 0,
        }
    }
}

export const productCatalogSlice = createSlice({
    name: 'productCatalog',
    initialState: productsAdapter.getInitialState({
        Status: 'idle',
        HttpGetProductsParameters: initializeHttpGetProductParameters(),
        productsLoaded: false,
        productDetailLoaded: false,
        productLoadError: false
    }),
    reducers: {
        setHttpGetProductsParameters: (state, action) => {
            state.productsLoaded = false;
            state.HttpGetProductsParameters = {...state.HttpGetProductsParameters, ...action.payload};
            //console.log(state.HttpGetProductsParameters);
        },
        resetHttpGetProductsParameters: (state) => {
            state.HttpGetProductsParameters = initializeHttpGetProductParameters();
            state.productsLoaded = false;
        },
       setPaginationData: (state, action) => {
            state.HttpGetProductsParameters.paginationData = {...state.HttpGetProductsParameters.paginationData, ...action.payload};
        }
    },
    extraReducers: builder => {
        builder
        .addCase(retrieveProductAsync.pending, (state) => {
            state.Status = "Product retrieval pending ...";
            state.productsLoaded = false;
            state.productLoadError = false;
        })
        .addCase(retrieveProductAsync.fulfilled, (state, action) => {
            state.Status = "Product retrieval successful";
            state.productsLoaded = true;
            productsAdapter.setAll(state, action.payload);
        })
        .addCase(retrieveProductAsync.rejected, (state) => {
            state.Status = "Product retrieval failed";
            state.productLoadError = true;
        })
        .addCase(retrieveProductDetailAsync.pending, (state) => {
            state.Status = "Product detail retrieval pending ...";
            state.productDetailLoaded = false;
            state.productLoadError = false;
        })
        .addCase(retrieveProductDetailAsync.fulfilled, (state, action) => {
            state.Status = "Product detail retrieval successful";
            state.productDetailLoaded = true;
            productsAdapter.upsertOne(state, action.payload);
        })
        .addCase(retrieveProductDetailAsync.rejected, (state) => {
            state.Status = "Product detail retrieval failed";
            state.productLoadError = true;
        })
    }
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.ProductData);

export const { setHttpGetProductsParameters, resetHttpGetProductsParameters, setPaginationData } = productCatalogSlice.actions;