import { AppBar, Badge, Box, FormControlLabel, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { mainLinks, registrationLinks } from "../../app/constants/headerlinks";
import { mainNavStyle } from "../../app/constants/mainnavstyle";
import { useStorePropertySelector } from "../../store";

interface Props{
    toggleDarkMode: () => void
    toggleChecked: boolean
}

export default function Header({toggleDarkMode, toggleChecked}: Props) {
    const basketCount = useStorePropertySelector(state => state.BasketData.BasketCount) ?? 0;
   //const basketCount = useStoreContext().basketCount;

    return(
        <AppBar position="static">
            <Toolbar sx={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'100%'}}>
                
            <Typography variant="body1"
                    sx={{ml:(1), width:'80%'}} >
                    <FormControlLabel
                        control={<Switch
                        checked ={toggleChecked}
                        onChange={toggleDarkMode} 
                        style={{color:deepPurple[50]}}/>} 
                        label='Theme Toggle'
                        />
                </Typography>
             <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'150%'}}
              >   
                <List sx={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                    {mainLinks.map(({linkname, linkpath}) => (
                        <ListItem
                        component={NavLink}
                        to={linkpath}
                        key={linkname}
                        sx={mainNavStyle}
                        >
                            {linkname.toUpperCase()}
                        </ListItem> 
                        )    
                    )}
                
                </List>
            </Box>
            <Box sx={{display:'flex',  alignItems:'center', width:'70%'}}>
            <IconButton size="large" sx={{mr: 1}}>
                <Badge 
                    component={NavLink}
                    to ='/basket'
                    badgeContent={basketCount} 
                    sx={{color:'cornsilk', textDecoration:'none'}} >
                    <Typography sx={{fontSize:18, fontFamily:'Montserrat'}}>Cart</Typography> <ShoppingCart sx={{color:'whitesmoke'}}/>
                </Badge>
            </IconButton>
            <List sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                {registrationLinks.map(({linkname, linkpath}) => (
                    <ListItem
                    component={NavLink}
                    to={linkpath}
                    key={linkname}
                    
                    sx={mainNavStyle}
                    >
                        {linkname.toUpperCase()}
                    </ListItem> 
                    )    
                )}
            
            </List>
            </Box>
            </Toolbar>
        </AppBar>
    )
}