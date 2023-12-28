import { CardContent, Typography } from "@mui/material";
import { Product } from "../../../app/models/product";
import { deepPurple } from "@mui/material/colors";
import { USDollarFomat } from "../../../app/constants/generalConstants";

interface Props{
    product: Product;
}


export default function CardContents({product}: Props){
    return(
        <>
            
                <CardContent key={product.id}>
                    <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Nunito', fontSize: 32}}>
                        {product.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{fontFamily:'Spartan', fontSize: 14}}>
                        {product.shortDescription}
                    </Typography>
                    <Typography variant="body2" sx={{mt:(2)}} style={{fontFamily:'Montserrat', fontSize: 28, color:deepPurple[200]}}>
                        {USDollarFomat.format(product.unitPrice)}
                    </Typography>
                </CardContent>
        </>
    )
}