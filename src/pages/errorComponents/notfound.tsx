import { Button, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <Container component={Paper}>
                <Typography gutterBottom 
                variant="h2"
                style={{height: 100}}>404: Not Found</Typography>
                <Divider />
                <Typography variant="h4">The resource or page you are looking for does not exist.</Typography>
                <Typography gutterBottom style={{height: 400}}>
                    <Stack spacing={2} direction="row" 
                        justifyContent="center" alignItems="center" sx={{mt: 2}}>
                        <Button href="/" variant="contained">Return to Home</Button>
                        <Button href="/catalog" variant="contained">Catalog</Button>
                        <Button component={Link} to='/about' variant="contained">About</Button>
                    </Stack>
                </Typography>
            </Container>
        </>
    )
}