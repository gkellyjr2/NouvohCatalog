import { Button, ButtonGroup, Typography } from "@mui/material";
import { useGeneralStoreDispatch, useStorePropertySelector } from "../store";
import { decrementCounter, incrementByAmount, incrementCounter } from "../reducerSlices/counterSliceToolkit";

export default function ContactUs() {
    const {count, title} = useStorePropertySelector(state => state.CounterToolkitData);
    const dispatch = useGeneralStoreDispatch();

    // const dispatch = useDispatch();
    // const incrementCounter = () => {
    //     dispatch({type: 'counter/increment'});
    // }
    // const decrementCounter = () => {
    //     //dispatch({type: 'counter/decrement'});
    //     storeBoundShorts.DecrementCounterValue();

    // }

    return (
        <>
            <Typography variant='h2'>
                The Title of this page is: {title}
            </Typography>
            <Typography variant='h4'>
                The current count is: {count}
            </Typography>
            <ButtonGroup>
                <Button variant='contained' color='secondary' onClick={() => dispatch(incrementCounter())}>Increment</Button>
                <Button variant='contained' color='error' onClick={() => dispatch(decrementCounter())}>Decrement</Button>
                <Button variant='contained' color='info' onClick={() => dispatch(incrementByAmount(3))}>Increment By 3</Button>
            </ButtonGroup>        
        </>
    )
}