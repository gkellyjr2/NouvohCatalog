import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Product } from "../../../app/models/product";

interface Props {
    product: Product;
}

export default function ProductListing({product}: Props) {
    return (
        <>
            <ListItem key={product.id}>
            <ListItemAvatar>
                <Avatar src={product.imagePath}/>
            </ListItemAvatar>
            <Typography variant='h5'>{product.productName}</Typography>
            <Typography variant='h6'>Current Price: ${product.unitPrice}</Typography>
            <Typography variant='body1'>{product.description}</Typography>
            <ListItemText>Available Inventory: {product.inventory}</ListItemText>
            </ListItem>
        </>
    )
}