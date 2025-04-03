import { useEffect } from "react";
import CartComponents from "../../components/cart/";




const Cart = () => {

    useEffect(()=>{
        document.title = `Book-Store|Cart`
    })

return (
        <CartComponents />
    );
  };
  
  export default Cart;