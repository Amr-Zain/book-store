

import { useActionState, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cartContext';
import CheckoutInput from './input';
import Button from '../utils/button';
import { Order, OrderInfoForm } from '../../types/order';

export interface FormState {
    error?: string;
    fieldErrors?: Partial<OrderInfoForm>;
}

const formInputs = [
    { id: 'name', label: 'Full Name', type: 'text' },
    { id: 'email', label: 'Email', type: 'email' },
    { id: 'phone', label: 'Phone', type: 'tel' },
    { id: 'address', label: 'Address', type: 'text' },
    { id: 'city', label: 'City', type: 'text' },
    { id: 'country', label: 'Country', type: 'text' },
    { id: 'state', label: 'State', type: 'text' },
    { id: 'zipcode', label: 'Zipcode', type: 'text' },
]
const validateForm = (formData:OrderInfoForm):[boolean,Partial<OrderInfoForm>]=>{
        let hasError = false;
        const fieldErrors: Partial<OrderInfoForm> = {};

        const requiredFields: (keyof OrderInfoForm)[] = [
            'name', 'email', 'phone', 'address', 'city', 'country', 'state', 'zipcode'
        ];
        requiredFields.forEach(field => {
            if (!formData[field]?.trim()) {
                fieldErrors[field] = 'This field is required';
                hasError = true;
            }
        });
        
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(formData.phone)) {
            fieldErrors.phone = 'Invalid phone number format';
            hasError = true;
        }
        return  [hasError,fieldErrors];
}
function CheckoutForm() {
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const { state: { cartItems, totalPrice } } = useCart();

    
    const onSubmit = async (state: FormState, data: FormData): Promise<FormState> => {
        // Form validation
        const formData: OrderInfoForm = {
            name: data.get('name') as string,
            email: data.get('email') as string,
            phone: data.get('phone') as string,
            address: data.get('address') as string,
            city: data.get('city') as string,
            country: data.get('country') as string,
            state: data.get('state') as string,
            zipcode: data.get('zipcode') as string,
        };
        
        const [hasError, fieldErrors] = validateForm(formData);
        
        if (hasError) {
            return { ...state, error: 'Please fix form errors', fieldErrors };
        }
        
        const newOrder: Omit<Order,'_id'|'createdAt'> = {
            ...formData,
            address: {
                city: formData.city,
                country: formData.country,
                state: formData.state,
                zipcode: formData.zipcode
            },
            productIds: cartItems.map(item => item._id),
            totalPrice: Number(totalPrice.toFixed(2)),
        };
        console.log(newOrder)
        try {
            // await createOrder(newOrder);
            await new Promise(resolve => setTimeout(resolve, 1000));
            navigate("/orders");
            return { error: undefined };
        } catch (error) {
            console.error("Error placing order", error);
            return { error: 'Failed to place order. Please try again.' };
        }
    };
    
    const [state, dispatch, isPending] = useActionState(onSubmit, { error: undefined });
    //const isDesabled = 
    const Inputs =  formInputs.map((field) =>  <CheckoutInput key={field.id} {...field} error={state.fieldErrors?.[field.id as keyof OrderInfoForm]} />)
    
    if(cartItems.length === 0) return <p className='py-4 bg-red-100 text-red-500 rounded text-center my-8'>Your Cart is Empty</p>
    return ( <form action={dispatch} className="space-y-6">
                {state.error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {state.error}
                    </div>
                )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Inputs}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-center gap-2">
            <input
                type="checkbox"
                id="terms"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="form-checkbox h-4 w-4"
                required
            />
            <label htmlFor="terms" className="text-sm">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:underline">
                    Terms & Conditions
                </Link>{' '}
                    and{' '}
                <Link to="/shipping" className="text-blue-600 hover:underline">
                    Shipping Policy
                </Link>
            </label>
        </div>

        <Button
            type="submit"
            disabled={!isChecked || isPending}
            className={`w-full`}
        >
            {isPending ? 'Processing...' : 'Place Order'}
        </Button>
    </form> );
}

export default CheckoutForm;