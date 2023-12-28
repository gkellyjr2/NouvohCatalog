
import {List} from "@mui/material";
import { Product } from "../../../app/models/product";
import ProductListing from "./ProductListing";

interface Props {
    products: Product[];
}

export default function ProductList({products}: Props)
{
    return (
        <>
           <List>
            {products.map(product => (
                <ProductListing key={product.id} product={product} />
            ))}
            </List>
        </>
        
    );
}