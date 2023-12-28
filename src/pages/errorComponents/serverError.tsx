import { Container, Divider, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";

export default function ServerError() {
    const {state} = useLocation();

    return (
        <>
            <Container component={Paper}>
                {state?.error ? (
                    <>
                        <Typography 
                            gutterBottom 
                            variant="h3" 
                            color='secondary' >{state.error.title}</Typography>
                            <Divider />
                        <Typography 
                            variant="body1" 
                            color='GrayText'>{state.error.detail}</Typography>
                    </>
                ) : (
                    <>
                        <Typography 
                            gutterBottom 
                            variant="h3" 
                            color='secondary' >500 Internal Server Error!</Typography>
                            <Divider />
                        <Typography 
                            variant="body1" 
                            color='GrayText'>The 500 (Internal Server Error) status 
                            code indicates that the server encountered an unexpected 
                            condition that prevented it from fulfilling the request.</Typography>
                    </>
                    
            )}
            </Container>
        </>
    )

}