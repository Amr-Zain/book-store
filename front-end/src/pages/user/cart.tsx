import { useEffect } from "react";
import CartComponents from "../../components/cart/";




const Cart = () => {

    useEffect(()=>{
        document.title = `Book-Store|Cart`
    })

return (
    <div className="">
        <CartComponents />
    </div>
    );
  };
  
  export default Cart;