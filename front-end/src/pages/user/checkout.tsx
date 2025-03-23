import { useEffect } from "react";
import CheckoutForm from "../../components/checkout/checkoutForm";
import CheckoutHeader from "../../components/checkout/header";

const CheckoutPage = () => {
    useEffect(()=>{
        document.title = 'Book Store|Checkout'
    })
return (
    <section className="min-h-screen p-6 bg-blackBG rounded shadow my-4 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
            <CheckoutHeader />
            <div className="bg-white rounded shadow-lg p-8">
                <h2 className="text-2xl text-gray-900 font-bold mb-4">Checkout</h2>
                <CheckoutForm />
            </div>
        </div>
    </section>
);
};

export default CheckoutPage;