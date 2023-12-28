import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../../../app/models/product";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import ProductNotFound from "../../errorComponents/productNotFound";
import { LoadingButton } from "@mui/lab";
import { USDollarFomat } from "../../../app/constants/generalConstants";
import { useGeneralStoreDispatch, useStorePropertySelector } from "../../../store";
import { addBasketItemAsync } from "../../../reducerSlices/basketAsyncThunkMethods";
import { productSelectors } from "../../../reducerSlices/productSlice";
import { retrieveProductDetailAsync } from "../../../reducerSlices/productAsyncThunkMethods";

export default function ProductDetails() {
    const dispatch = useGeneralStoreDispatch();
    const {id} = useParams<{ id: string }>();
    const product: Product = useStorePropertySelector(state => productSelectors.selectById(state, Number(id)));
    const productDetailLoaded: Boolean = useStorePropertySelector(state => state.ProductData.productDetailLoaded);
    const productLoadError: Boolean = useStorePropertySelector(state => state.ProductData.productLoadError);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    

    
    useEffect(() => {
        if(!productDetailLoaded){
            dispatch(retrieveProductDetailAsync({productId: Number(id)}));
        }
    },[selectedQuantity, dispatch])

        
      //--------------------------------------------------------------------------------------
   function adjustQuantityValue(event: any){
    if(event.target.value < 1){
        setSelectedQuantity(1);
    }
    else setSelectedQuantity(event.target.value);
   }

   if(!product) return <ProductNotFound/>
   if(productLoadError) return <h1>Application Error</h1>
   if (!productDetailLoaded) return <h1>Loading...</h1>

    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={3}/>
                <Grid item xs={3}>
                    <img src={product.imagePath} alt={product.productName} style={{width: '100%'}} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h3'>{product.productName}</Typography>
                    <Divider />
                    <Typography variant='h4' color="darkorchid">{USDollarFomat.format(product.unitPrice)}</Typography>
                    <Typography variant='body1' color='plum'>{product.shortDescription}</Typography>
                    <Typography variant='body1' color='plum'>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            Product name:
                                        </TableCell>
                                        <TableCell>
                                            {product.productName}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Brand:
                                        </TableCell>
                                        <TableCell>
                                            {product.brandName}
                                        </TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell>
                                            Product Category:
                                        </TableCell>
                                        <TableCell>
                                            {product.categoryName}
                                        </TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell>
                                            Description:
                                        </TableCell>
                                        <TableCell>
                                            {product.description}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Available Inventory:
                                        </TableCell>
                                        <TableCell>
                                            {product.inventory}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <TextField 
                                variant='outlined' 
                                label='Quantity' 
                                type='number' 
                                sx={{height: '40px', width: '100%'}}
                                defaultValue={1}
                                value={selectedQuantity}
                                onChange={adjustQuantityValue}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <LoadingButton
                                color="primary"
                                size="large"
                                variant="contained"
                                fullWidth
                                sx={{height: '55px'}}
                                loading={status.includes('pending ' + product.id)}
                                onClick={() => dispatch(addBasketItemAsync({productId: product.id, quantity: selectedQuantity}))}>
                                Add to Cart
                            </LoadingButton>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
            
        </>
    )
}