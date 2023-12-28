import { Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function CheckOut() {
    return (
        <>
            <Typography
                variant="h3">
                You must be logged in to checkout.
            </Typography>
            <Button
                component={NavLink}
                to='/basket'
                variant='contained'
                size="large"
                fullWidth>
                Return to Basket
            </Button>
        </>
    )
}