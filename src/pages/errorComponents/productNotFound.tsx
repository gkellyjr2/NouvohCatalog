import { Container, Paper, Typography, Divider, Stack, Button } from "@mui/material";


export default function ProductNotFound() {
    return (
        <>
            <Container component={Paper}>
                <Typography gutterBottom 
                variant="h2"
                style={{height: 100}}>404: Product Not Found</Typography>
                <Divider />
                <Typography variant="h4">The product you are looking for does not exist.</Typography>
                <Typography gutterBottom style={{height: 400}}>
                    <Stack spacing={2} direction="row" 
                        justifyContent="center" alignItems="center" sx={{mt: 2}}>
                        <Button href="/catalog" variant="text">Back to Catalog</Button>
                    </Stack>
                </Typography>
            </Container>
        </>
    )
}