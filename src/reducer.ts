import { combineReducers } from "redux";
import {CounterReducer} from './reducerSlices/counterSlice';

const rootReducer = combineReducers(
    {
        CounterData: CounterReducer,
        //CounterToolkitData: counterSlice.reducer
    });

export {rootReducer} ;