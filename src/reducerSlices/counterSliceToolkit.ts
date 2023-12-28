import { createSlice } from "@reduxjs/toolkit/react";

export interface CounterState {
    count: number;
    title: string;
}

const initialState: CounterState = {
    count: 22,
    title: 'Redux Store Counter Redux Toolkit Example'
}

export const counterSlice = createSlice(
    {
        name: 'counter',
        initialState,
        reducers: {
            incrementCounter(state) {
                state.count += 1;
            },
            decrementCounter(state) {
                state.count -= 1;
            },
            incrementByAmount(state, action) {
                state.count += action.payload;
            },
            decrementByAmount(state, action) {
                state.count -= action.payload;
            },
            reviseTitle(state, action) {
                state.title = action.payload;
            }
        }
    });
    export const { incrementCounter, decrementCounter, incrementByAmount, decrementByAmount, reviseTitle } = counterSlice.actions;