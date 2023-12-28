import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import axiosErrorTriggers from "../app/apihelpers/axiosErrorTriggers";
import { useState } from "react";

export default function About() {
    
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function triggerValidationError() {
        axiosErrorTriggers.errorTriggers.triggerValidationError()
        .catch(error => {setValidationErrors(error)});
    
    }
    return (
        <>
            <Container>
                <Typography 
                gutterBottom
                variant="h2">Testing Error Triggers</Typography>
                <ButtonGroup fullWidth>
                    <Button variant="contained" 
                    color="primary" onClick={
                        () => axiosErrorTriggers.errorTriggers.triggerNotFoundError().catch((error) => {
                            console.log(error);
                        })
                    }>Not Found Error</Button>

                    <Button variant="contained" 
                    color="primary" onClick={
                        () => axiosErrorTriggers.errorTriggers.triggerBadRequestError().catch((error) => {
                            console.log(error);
                        })
                    }>Bad Request Error</Button>
                    
                    <Button variant="contained" 
                    color="primary" onClick={
                        () => axiosErrorTriggers.errorTriggers.triggerUnauthorizedError().catch((error) => {
                            console.log(error);
                        })
                    }>Unauthorized Error</Button>
                    
                    <Button variant="contained" 
                    color="primary" onClick={triggerValidationError}>Validation Error</Button>
                    
                    <Button variant="contained" 
                    color="primary" onClick={
                        () => axiosErrorTriggers.errorTriggers.triggerServerError().catch((error) => {
                            console.log(error);
                        })
                    }>Server Error</Button>
                    
                    <Button variant="contained" 
                    color="primary" onClick={
                        () => axiosErrorTriggers.errorTriggers.triggerDatabaseError().catch((error) => {
                            console.log(error);
                        })
                    }>Database Error</Button>
                </ButtonGroup>

                {validationErrors.length > 0 &&
                    <Alert severity="error">
                        <AlertTitle>Validation Errors</AlertTitle>
                            <List>
                                {validationErrors.map((error) => {
                                    return <ListItem key={error}>
                                                <ListItemText>{error}</ListItemText>
                                            </ListItem>                                
                                })}

                            </List>                    
                    </Alert>
                    }
            </Container>
        </>
    )
}