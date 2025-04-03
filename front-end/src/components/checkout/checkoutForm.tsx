import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { useCart } from "../../context/cartContext";
import Input from "../utils/input";
import Button from "../utils/button";
import { Order, OrderInfoForm } from "../../types/order";
import { postOrder } from "../../api";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { restCart } from "../../actions/cart";

function CheckoutForm() {
  const navigate = useNavigate();
  const {
    state: { cartItems, totalPrice },
    dispatch
  } = useCart();
  const currentUser = useAuth()?.currentUser;
  
  const formInputs = [
    { id: "name", label: "Full Name", type: "text", disabled:true,placeholder:'', value: currentUser?.name},
    { id: "email", label: "Email", type: "email", disabled:true, placeholder:'', value: currentUser?.email },
    { id: "phone", label: "Phone", type: "tel", placeholder: 'Enter Your phone',required: true },
    { id: "address", label: "Address", type: "text", placeholder:'Enter your Address',required: true },
    { id: "city", label: "City", type: "text", placeholder:'Enter your City',required: true },
    { id: "country", label: "Country", type: "text", placeholder:'Enter your Country',required: true },
    { id: "state", label: "State", type: "text", placeholder:'Enter your',required: true },
    { id: "zipcode", label: "Zipcode", type: "text", placeholder:'Enter your',required: true },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderInfoForm&{terms: boolean}>({
    defaultValues: {
      email: currentUser?.email || "",
    },
  });
  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: postOrder,
    mutationKey:['orders'],
    onSuccess: () => {
      dispatch(restCart())
      navigate("/orders");
    },
    onSettled: () => {
      console.log("settled");
    },
  });

  const onSubmit = (data: OrderInfoForm) => {

    const order: Omit<Order, "_id" | "createdAt"> = {
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      productIds: cartItems.map((item) => item._id),
      totalPrice: Number(totalPrice.toFixed(2)),
      name: data.name,
      email: data.email,
      phone: data.phone
    }
    mutate(order);
  };


  if (cartItems.length === 0) {
    return (
      <p className="py-4 bg-red-100 text-red-500 rounded text-center my-8">
        Your Cart is Empty
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {isError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error instanceof Error
            ? error.message
            : "Failed to place order. Please try again."}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formInputs.map((field) => (
          <Input
            key={field.id}
            {...field}
            {...register(field.id as keyof OrderInfoForm, {
              required: field.required ? `${field.label} is required` : false,
            })}
            error={errors[field.id as keyof OrderInfoForm]?.message}
          />
        ))}
      </div>

      <div>

        <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="terms"
          {...register("terms", {
            required: "You must accept the terms and conditions",
          })}
          className="form-checkbox h-4 w-4"
        />
        <label htmlFor="terms" className="text-sm">
          I agree to the{" "}
          <Link to="/terms" className="text-blue-600 hover:underline">
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link to="/shipping" className="text-blue-600 hover:underline">
            Shipping Policy
          </Link>
        </label>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-sm mt-2">{errors.terms.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting||isPending}
        className="w-full"
      >
        {isPending ? "Processing..." : "Place Order"}
      </Button>
    </form>
  );

}

export default CheckoutForm;
