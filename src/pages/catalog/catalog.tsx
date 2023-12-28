import {Theme, ThemeProvider, Typography} from "@mui/material";
import ProductCard from "./Card/ProductCard";
import { useEffect } from "react";
import { useGeneralStoreDispatch, useStorePropertySelector } from "../../store";
import { productSelectors } from "../../reducerSlices/productSlice";
import { retrieveProductAsync } from "../../reducerSlices/productAsyncThunkMethods";
import { retrieveBrandsAndCategories } from "../../reducerSlices/filtersAsyncThunkMethods";
import NoProductsFoundReset from "./Card/NoProductsFoundReset";

interface Props{
newTheme: Theme
}

export default function Catalog({newTheme}: Props)
{
  const dispatch = useGeneralStoreDispatch();
  const products = useStorePropertySelector(productSelectors.selectAll);
  const productsLoaded: Boolean = useStorePropertySelector(state => state.ProductData.productsLoaded);
  const productLoadError: Boolean = useStorePropertySelector(state => state.ProductData.productLoadError);
  const FiltersLoaded: Boolean = useStorePropertySelector(state => state.FiltersData.filtersLoaded);
  
 
  useEffect(() => {
    if (!productsLoaded) {
     dispatch(retrieveProductAsync());
    }
  }, [dispatch, productsLoaded])


  useEffect(() => {
    
    if (!FiltersLoaded) {
      dispatch(retrieveBrandsAndCategories());
     }
  }, [dispatch, FiltersLoaded])

if (!productsLoaded) return <h1>Please be patient...Data is now Loading...</h1>
if (!(products.length>0)) return (
              <NoProductsFoundReset />
              )
if (productLoadError) return <h1>There was an error loading the products at this time. Please re-try your request.</h1>


    return (
        <>
          <ThemeProvider theme={newTheme}>
            <Typography variant="h1" sx={{ color: 'catalogviolet.dark'}}>Feature Products</Typography>
          </ThemeProvider>
          <ProductCard products = {products} /> 
        </>
        
   )     
}