import { TableContainer, Paper, TableBody, Table} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../app/constants/tableStyles";
import { USDollarFomat } from "../../app/constants/generalConstants";
import { useEffect, useState } from "react";
import { useStorePropertySelector } from "../../store";


export default function BasketSummary() {
    const basketTotal = useStorePropertySelector(state => state.BasketData.BasketTotal) ?? 0;
    const [totalTax, setTotalTax] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);
    const [basketTotalWithTax, setBasketTotalWithTax] = useState(0);

useEffect(() => {
    if (basketTotal > 200) setShippingCost(0)
    else{
        if (basketTotal < 50) setShippingCost(5.99)
        else if (basketTotal < 100) setShippingCost(7.99)
        else if (basketTotal < 200) setShippingCost(9.99)
        };
    setTotalTax(basketTotal * 0.06);
    setBasketTotalWithTax(basketTotal + totalTax + shippingCost);
}, [basketTotal]);

    return (
        <>
            <TableContainer component={Paper} variant="outlined">
                <Table>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell style={{fontSize:20}}>Subtotal</StyledTableCell>
                            <StyledTableCell align="right" style={{fontSize:20}}>{USDollarFomat.format(basketTotal)}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell style={{fontSize:20}}>Shipping <span style={{fontSize:16}}>(Free shipping with orders over $200)</span></StyledTableCell>
                            <StyledTableCell align="right" style={{fontSize:20}}>{USDollarFomat.format(shippingCost)}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell style={{fontSize:20}}>Tax</StyledTableCell>
                            <StyledTableCell align="right" style={{fontSize:20}}>{USDollarFomat.format(totalTax)}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell style={{fontSize:20}}>Total</StyledTableCell>
                            <StyledTableCell align="right" style={{fontSize:20}}>{USDollarFomat.format(basketTotalWithTax)}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>                
                </Table>
            </TableContainer>
        </>
    )
}