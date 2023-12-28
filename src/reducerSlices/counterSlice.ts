export interface CounterState {
    count: number;
    title: string;
}

const InitialState: CounterState = {
    count: 6,
    title: 'Redux Store Counter Example'
}

function CounterReducer(state = InitialState, action: any) {
    switch (action.type) {
        case 'counter/increment':
            return {
                ...state,
                    count: state.count + 1
                };
        case 'counter/decrement':
            return {
                ...state,
                    count: state.count - 1
                };
        case "counter/reviseTitle":
            return {
                ...state,
                title: action.payload
            };
        default:
            return state;
    }
}
export {CounterReducer}