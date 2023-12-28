import { createSlice } from "@reduxjs/toolkit/react";
import { basket } from "../app/models/basket";
import { addBasketItemAsync, deleteBasketItemAsync, getBasketAsync } from "./basketAsyncThunkMethods";

interface BasketState {
    Basket: basket,
    BasketCount: number,
    BasketTotal: number,
    Status: string,
}

const initialState: BasketState = {
    Basket: {
        buyerId: '',
        contents: []
    },
    BasketCount: 0,
    BasketTotal: 0,
    Status: 'idle'
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.Basket = action.payload;
            state.BasketCount = state.Basket.contents!.reduce((accumulatedCount, item) => accumulatedCount + item.quantity, 0) ?? 0;
            state.BasketTotal = state.Basket.contents!.reduce((accumulatedTotal, item) => accumulatedTotal + (item.quantity * item.unitPrice), 0) ?? 0.00;
        },
        deleteBasket: (state) => {
            state.Basket = {
                buyerId: "",
                contents: []
            };
         },
        // reduceBasketItemQuantity: (state, action) => {
        //     const {productId, quantity} = action.payload;
        //     const itemIndex = state.Basket.contents!.findIndex(item => item.productId === productId);
        //     if (itemIndex === -1 || itemIndex === undefined || itemIndex === null) return;

        //     state.Basket!.contents![itemIndex].quantity -= quantity;
        //     if (state.Basket!.contents![itemIndex].quantity <= 0) 
        //         state.Basket!.contents!.splice(itemIndex, 1);

        //     state.BasketCount = state.Basket.contents!.reduce((accumulatedCount, item) => accumulatedCount + item.quantity, 0) ?? 0;
        //     state.BasketTotal = state.Basket.contents!.reduce((accumulatedTotal, item) => accumulatedTotal + (item.quantity * item.unitPrice), 0) ?? 0.00;
        // },
        getBasketCount: (state) => {
            state.BasketCount = state.Basket.contents!.reduce((accumulatedCount, item) => accumulatedCount + item.quantity, 0) ?? 0;
        },
        getBasketTotal: (state) => {
            state.BasketTotal = state.Basket.contents!.reduce((accumulatedTotal, item) => accumulatedTotal + (item.quantity * item.unitPrice), 0) ?? 0.00;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(addBasketItemAsync.pending, (state, action) => {
            state.Status = "Adding an item to basket pending ..." + action.meta.arg.productId.toString();
        })
        .addCase(addBasketItemAsync.fulfilled, (state, action) => {
            state.Status = "idle";
            state.Basket = action.payload;
            state.BasketCount = state.Basket.contents!.reduce((accumulatedCount, item) => accumulatedCount + item.quantity, 0) ?? 0;
            state.BasketTotal = state.Basket.contents!.reduce((accumulatedTotal, item) => accumulatedTotal + (item.quantity * item.unitPrice), 0) ?? 0.00;
        })
        .addCase(addBasketItemAsync.rejected, (state, action) => {
            state.Status = "idle";
            console.log("Adding an item to basket failed!");
            console.log(action.payload)
        })
        .addCase(deleteBasketItemAsync.pending, (state, action) => {
            state.Status = "Deleting an item from basket pending ..." + action.meta.arg.productId.toString();
        })
        .addCase(deleteBasketItemAsync.fulfilled, (state, action) => {
            state.Status = "idle";
            state.Basket = action.payload;
            state.BasketCount = state.Basket.contents!.reduce((accumulatedCount, item) => accumulatedCount + item.quantity, 0) ?? 0;
            state.BasketTotal = state.Basket.contents!.reduce((accumulatedTotal, item) => accumulatedTotal + (item.quantity * item.unitPrice), 0) ?? 0.00;
        })
        .addCase(deleteBasketItemAsync.rejected, (state, action) => {
            state.Status = "idle";
            console.log("Deleting an item from basket failed!");
            console.log(action.payload)
        })
        .addCase(getBasketAsync.pending, (state) => {
            state.Status = "Getting basket pending ...";
        })
        .addCase(getBasketAsync.fulfilled, (state, action) => {
            state.Status = "idle";
            state.Basket = action.payload;
            state.BasketCount = state.Basket.contents!.reduce((accumulatedCount, item) => accumulatedCount + item.quantity, 0) ?? 0;
            state.BasketTotal = state.Basket.contents!.reduce((accumulatedTotal, item) => accumulatedTotal + (item.quantity * item.unitPrice), 0) ?? 0.00;
        })
        .addCase(getBasketAsync.rejected, (state, action) => {
            state.Status = "idle";
            console.log("Getting basket failed!");
            console.log(action.payload)
        })
    }
});
export const { setBasket, deleteBasket, getBasketCount, getBasketTotal } = basketSlice.actions;