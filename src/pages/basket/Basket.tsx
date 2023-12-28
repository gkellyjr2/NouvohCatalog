import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableContainer, TableHead} from "@mui/material";
import { AddCircleOutlineSharp, Delete, Remove } from "@mui/icons-material";
import LoadingIndicator from "../loading/loadingIndicator";
import BasketSummary from "./BasketSummary";
import { StyledTableRow, StyledTableCell } from "../../app/constants/tableStyles";
import { USDollarFomat } from "../../app/constants/generalConstants";
import { NavLink } from "react-router-dom";
import { useStorePropertySelector } from "../../store";
import { basket } from "../../app/models/basket";
import { useGeneralStoreDispatch } from "../../store";
import { deleteBasketItemAsync, addBasketItemAsync } from "../../reducerSlices/basketAsyncThunkMethods";

export default function Basket() {
  const currentBasket: basket = useStorePropertySelector(state => state.BasketData.Basket);
  const dispatch = useGeneralStoreDispatch();
  const status = useStorePropertySelector(state => state.BasketData.Status);
  const basketCount = useStorePropertySelector(state => state.BasketData.BasketCount);
  const basketTotal = useStorePropertySelector(state => state.BasketData.BasketTotal);

   

    if (currentBasket?.contents.length === 0) return <h1>Your basket is curently empty.</h1>
    if (!currentBasket) return <h1>There was a problem loading your basket.</h1>
    if (status.includes('pending')) return <LoadingIndicator LoadingMessage="Updating cart....Please wait." />;

    return (
        <>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Product</StyledTableCell>
                    <StyledTableCell align="center">Brand</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                    <StyledTableCell align="center">Quantity</StyledTableCell>
                    <StyledTableCell align="right">Subtotal</StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {currentBasket.contents.map(item => (
                    <StyledTableRow key={item.id}>
                      <StyledTableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img src={item.imagePath} alt={item.productName}
                                style={{height:60, marginRight:20}} />
                                <span style={{fontSize:16}}>{item.productName}</span>

                          </Box>
                      </StyledTableCell>
                      <StyledTableCell style={{fontSize:16}} align="center">{item.brandID}</StyledTableCell>
                      <StyledTableCell style={{fontSize:16}} align="center">{USDollarFomat.format(item.unitPrice)}</StyledTableCell>
                      <StyledTableCell style={{fontSize:16}} align="center">
                      <Box sx={{ borderStyle:"double", border:"1", display: 'flex', justifyContent: 'center',
                                  alignItems: 'center',
                                  height:40, maxWidth:100, marginLeft:30}}>
                                <IconButton color="error" onClick={() => dispatch(deleteBasketItemAsync({productId: item.id}))}>
                                  <Remove />
                                </IconButton>
                                {item.quantity}
                                <IconButton color="success" onClick={() => dispatch(addBasketItemAsync({productId: item.id}))}>
                                  <AddCircleOutlineSharp/>
                                </IconButton></Box>
                      </StyledTableCell>
                      <StyledTableCell style={{fontSize:16}} align="right">{USDollarFomat.format(item.quantity * item.unitPrice)}</StyledTableCell>
                      <StyledTableCell align="right">
                        <IconButton color="error" onClick={() => dispatch(deleteBasketItemAsync({productId: item.id, quantity: item.quantity}))}>
                            <Delete style={{fontSize:28}} />
                        </IconButton>
                        </StyledTableCell>
                    </StyledTableRow>
                  ))}
                  <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                      
                  </StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="center" style={{fontSize:20}}>{'Total Items: ' + basketCount}</StyledTableCell>
                  <StyledTableCell align="right" style={{fontSize:20}}>{'Basket Total - '+ USDollarFomat.format(basketTotal)}</StyledTableCell>
                  <StyledTableCell align="right">
                  </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
          </TableContainer>
          <Grid container>
            <Grid item xs={8} />
            <Grid item xs={4}>
              <BasketSummary />
            <Button
                component={NavLink}
                to='/checkout'
                variant='contained'
                size="large"
                fullWidth>
                Check Out
            </Button>
            </Grid>
          </Grid>
        </>
    )
}