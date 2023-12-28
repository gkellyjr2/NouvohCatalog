import { brown, deepPurple, grey } from "@mui/material/colors"
import { Product } from "../../../app/models/product"
import { CardHeader, Avatar } from "@mui/material"

interface Props{
product: Product
}
export default function HeaderContents({product}: Props){
    return(
        <>
            <CardHeader 
                key={product.id} 
                sx={{ bgcolor: brown[500], fontFamily: 'Nunito', color: grey[50] }}
                avatar={
                    <Avatar sx={{ background: deepPurple[600] }} >
                        {product.productName.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={'Current Inventory: ' + product.inventory.toString()}
                titleTypographyProps={{ fontFamily: 'Nunito', fontSize: 18 }}
            />
        </>
    )
}