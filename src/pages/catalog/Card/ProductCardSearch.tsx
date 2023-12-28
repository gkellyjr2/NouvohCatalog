import { TextField, debounce } from "@mui/material";
import { useEffect, useState } from "react";
import { setHttpGetProductsParameters } from "../../../reducerSlices/productSlice";
import { useGeneralStoreDispatch, useStorePropertySelector } from "../../../store";

export default function ProductCardSearch()
{
    const productSearchParams = useStorePropertySelector(state => state.ProductData);
    const dispatch = useGeneralStoreDispatch()

    const [searchParams, setSearchParams] = useState<string>(productSearchParams.HttpGetProductsParameters.searchName);
    const [reloadCatalog, setReloadCatalog] = useState<boolean>(false);

    useEffect(() => {
        if (reloadCatalog) {
            updateCatalog();
            setReloadCatalog(false);
        }
      }, [dispatch, searchParams, reloadCatalog])

    const delaySearch = debounce(() => {
        setReloadCatalog(true);
    }, 1000)

    const updateCatalog = () => {
        dispatch(setHttpGetProductsParameters({searchName: searchParams}));
    }
    
    return (
        <>
        <TextField
            label="Search products"
            variant="outlined"
            fullWidth
            value={searchParams || ''}
            onChange={
                (event: any) => {
                    setSearchParams(event.target.value);
                    delaySearch();
                }
            }
            />
        </>
    )
}