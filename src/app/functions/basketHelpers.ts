import { toast } from "react-toastify";
import axiosBasketHelpers from "../apihelpers/axiosBasketHelpers";
import { useStoreContext } from "../contexts/storeContext";
import { useState } from "react";

    
function addItemToBasket( productId: number, quantity: number = 1){
    const {setBasket} = useStoreContext();
    const [appError, setAppError] = useState<boolean>(false);


    axiosBasketHelpers.basketApis.addToBasket(productId, quantity)
    .then((basket => setBasket(basket))) //update global basket state upon addition of items to basket
    .then(() => toast.success('Item added to cart!'))
    .catch(() => {
    setAppError(true);
    (error: any) => console.log(error);
  })
  .finally(() => {
    console.log(productId, quantity, appError);
  });
}

export default { addItemToBasket };