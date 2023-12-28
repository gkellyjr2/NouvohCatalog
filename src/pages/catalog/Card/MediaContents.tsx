import { CardMedia, NoSsr} from "@mui/material";
import { Product } from "../../../app/models/product";
import GoogleFont from 'react-google-fonts'

interface Props{
    product: Product;
}
export default function MediaContents({product}: Props){
    return(
        <>
            <NoSsr>
                <GoogleFont href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,500&display=swap' />
                <GoogleFont href='https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;700&display=swap' />
                <GoogleFont href='https://fonts.googleapis.com/css2?family=Spartan:wght@200;400;700&display=swap' />
                <GoogleFont href='https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;500&display=swap' />
            </NoSsr>
            <CardMedia
                    sx={{ height: 215,  backgroundSize:'contain'}}
                    image={product.imagePath}
                    title = {product.productName}
                    key={product.id}
                />
        </>
    )
}