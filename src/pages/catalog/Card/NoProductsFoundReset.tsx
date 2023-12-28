import { resetHttpGetProductsParameters } from "../../../reducerSlices/productSlice"
import { useGeneralStoreDispatch } from "../../../store"
import { Button } from "@mui/material"


export default function NoProductsFoundReset() {
    const dispatch = useGeneralStoreDispatch()
    return (
        <>
            <h1>No products currently available for your search criteria.</h1>
            <Button
                color="primary"
                size="large"
                variant="contained"
                fullWidth
                sx={{height: '55px'}}
                onClick={() => dispatch(resetHttpGetProductsParameters())}>
                Back To Catalog
            </Button>
        </>
    )
}