import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface LoadingIndicatorProps {
    LoadingMessage?: string;
}

export default function LoadingIndicator({LoadingMessage = "Loading...Please wait."}: LoadingIndicatorProps) {
    return(
        <>
        <Backdrop invisible={true} 
            open={true}>
            <Box display="flex" 
                alignItems="center"
                justifyContent='center'
                height ='100vh'>
                <CircularProgress color="secondary"
                size={100} />
                <Typography variant='h4'
                    sx={{justifyContent: 'center',
                        position:'fixed',
                        top:'60%'}}>{LoadingMessage}
                        </Typography>
            </Box>
        </Backdrop>
        </>
    )
}