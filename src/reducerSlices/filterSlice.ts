import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { retrieveBrandsAndCategories } from "./filtersAsyncThunkMethods";
import { ProductFilters } from "../app/models/brandAndCategory";
import { RootState } from "../store";

const filterAdapter = createEntityAdapter<ProductFilters>()

export const filterSlice = createSlice({
    name: 'productFilters',
    initialState: filterAdapter.getInitialState(
        {
            Status: 'idle',
            productBrands: [],
            productCategories: [],
            filtersLoaded: false,
            filterLoadError: false
        }
    ),
    reducers:{},
    extraReducers: builder => {
        builder
        .addCase(retrieveBrandsAndCategories.pending, (state) => {
            state.Status = 'Loading of filters and categories is in progress';
            state.filtersLoaded = false;
            state.filterLoadError = false;
        })
        .addCase(retrieveBrandsAndCategories.fulfilled, (state, action) => {
            state.Status = 'Filters and categories have been loaded';
            state.filtersLoaded = true;
            state.filterLoadError = false;
            state.productBrands = action.payload.productBrands;
            state.productCategories = action.payload.productCategories;

        })
        .addCase(retrieveBrandsAndCategories.rejected, (state, action) => {
            state.Status = 'Error loading filters and categories';
            state.filtersLoaded = false;
            state.filterLoadError = true;
            console.log(action.payload)
        })
    }
});

export const filterSelectors = filterAdapter.getSelectors((state: RootState) => state.FiltersData);