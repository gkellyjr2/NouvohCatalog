import { Grid, Box, Typography, Pagination } from "@mui/material";
import { useStorePropertySelector } from "../../store";

interface Props {
    onPageChange: (page: number) => void;
}


export default function PaginationFooter({onPageChange}: Props) {
    const {paginationData} = useStorePropertySelector(state => state.ProductData.HttpGetProductsParameters);
    const {numberOfPages, currentPage, numberOfItemsFromQuery} = paginationData;

    //const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    //    dispatch(setHttpGetProductsParameters({currentPage: value}));
   // };

    return (
        <Grid item xs={9}>
            <Box display='flex' justifyContent='space-around' alignItems='center'
                sx={{mb:5}}>
                <Typography>{numberOfItemsFromQuery} Items Available - Page: {currentPage} of {numberOfPages}</Typography>
                <Pagination count={numberOfPages} 
                variant="outlined" 
                color="primary" 
                onChange={(_event, value) => onPageChange(value)}
                page={currentPage}
                />
            </Box>
        </Grid>
    );
}