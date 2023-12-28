import {Button, Card, CardActions, Grid, NoSsr, Paper } from "@mui/material"
import { LoadingButton } from "@mui/lab";
import { Product } from "../../../app/models/product";
import GoogleFont from 'react-google-fonts'
import MediaContents from "./MediaContents";
import CardContents from "./CardContents";
import HeaderContents from "./HeaderContents";
import { Link } from "react-router-dom";
import LoadingIndicator from "../../loading/loadingIndicator";
import { useState } from "react";
import { useGeneralStoreDispatch, useStorePropertySelector } from "../../../store";
import { addBasketItemAsync } from "../../../reducerSlices/basketAsyncThunkMethods";
import ProductCardSearch from "./ProductCardSearch";
import { setHttpGetProductsParameters, setPaginationData } from "../../../reducerSlices/productSlice";
import RadioButtonGroup from "../../reusableComponents/RadioButtonGroup";
import CheckBoxGroup from "../../reusableComponents/checkBoxGroup";
import PaginationFooter from "../../reusableComponents/paginationFooter";

interface Props{
    products: Product[];

}

const sortOptions = [
    {value: 'name', label: 'Alphabetical'},
    {value: 'priceDesc', label: 'Price - Descending'},
    {value: 'price', label: 'Price - Ascending'},
];
export default function ProductCard({products}: Props)
{
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useGeneralStoreDispatch();
    const status = useStorePropertySelector(state => state.BasketData.Status);
    const {productBrands, productCategories} = useStorePropertySelector(state => state.FiltersData);
    const {HttpGetProductsParameters} = useStorePropertySelector(state => state.ProductData);
    const radioGroupLabel = 'Products Sort Order';
    const categoryGroupLabel = 'Product Categories';
    const brandGroupLabel = 'Product Brands';

    function updatePage( page: number) {
        dispatch(setPaginationData({currentPage: page}));
        dispatch(setHttpGetProductsParameters({CurrentPage: page}));
    }
    
    if (!products) () => setLoading(true);
    if (loading) return <LoadingIndicator LoadingMessage="Acquiring catalog....Please wait." />;
    
    return (
        <>
            <NoSsr>
                <GoogleFont href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,500&display=swap' />
                <GoogleFont href='https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;700&display=swap' />
                <GoogleFont href='https://fonts.googleapis.com/css2?family=Spartan:wght@200;400;700&display=swap' />
                <GoogleFont href='https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;500&display=swap' />
            </NoSsr>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Paper sx={{mb: 2, ml: 2}} elevation={3}>
                        <ProductCardSearch />
                    </Paper>
                    <Paper sx={{mb: 2, ml: 2, p:2}} elevation={3}>
                        <RadioButtonGroup 
                            sectionLabel={radioGroupLabel} 
                            radioButtonOptions={sortOptions}
                            onChange = {(e) => dispatch(setHttpGetProductsParameters({sortOrder: e.target.value}))} 
                            selectedRadioButton = {HttpGetProductsParameters.sortOrder}/>
                    </Paper>
                    <Paper sx={{mb: 2, ml: 2, p:2}} elevation={3}>
                        <CheckBoxGroup sectionLabel={categoryGroupLabel}
                        checkBoxNames = {productCategories}
                        CheckedBoxes = {HttpGetProductsParameters.selectedCategories}
                        onChange = {(BoxesChecked: string[]) => 
                            dispatch(setHttpGetProductsParameters({selectedCategories: BoxesChecked}))} />
                    </Paper>
                    <Paper sx={{mb: 2, ml: 2, p:2}} elevation={3}>
                    <CheckBoxGroup sectionLabel={brandGroupLabel}
                        checkBoxNames = {productBrands}
                        CheckedBoxes = {HttpGetProductsParameters.selectedBrands}
                        onChange = {(BoxesChecked: string[]) => 
                            dispatch(setHttpGetProductsParameters({selectedBrands: BoxesChecked}))} />
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Grid container spacing={3}>
                        {products.map(product => (
                            <Grid item xs={3}   key={product.id}>
                                <Card  key={product.id} style={{fontFamily:'sans-serif'}}>
                                    <HeaderContents product={product} />
                                    <MediaContents product={product} />
                                    <CardContents product={product} />
                                    <CardActions>
                                        <LoadingButton loading = {status.includes('pending ' + product.id)}
                                        onClick={() => dispatch(addBasketItemAsync({productId: product.id}))}
                                        size="small">Add To Cart</LoadingButton>
                                        <Button component={Link}
                                        to={`/catalog/${product.id}`}
                                        size="small">View Details</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}

                    </Grid>
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <PaginationFooter onPageChange={(page: number) => updatePage(page)}/>
            </Grid>
        </>
    )
}