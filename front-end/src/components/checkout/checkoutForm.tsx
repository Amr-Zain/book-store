import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartContext";
import CheckoutInput from "./input";
import Button from "../utils/button";
import { OrderInfoForm } from "../../types/order";
import { postOrder } from "../../api";
import { useState } from "react";
import { validateCheckOutForm } from "../../utils/validateCheckOut";

const formInputs = [
  { id: "name", label: "Full Name", type: "text" },
  { id: "email", label: "Email", type: "email" },
  { id: "phone", label: "Phone", type: "tel" },
  { id: "address", label: "Address", type: "text" },
  { id: "city", label: "City", type: "text" },
  { id: "country", label: "Country", type: "text" },
  { id: "state", label: "State", type: "text" },
  { id: "zipcode", label: "Zipcode", type: "text" },
];

function CheckoutForm() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<OrderInfoForm>>({});
  const {
    state: { cartItems, totalPrice },
  } = useCart();

  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: postOrder,
    onSuccess: () => {
      navigate("/orders");
    },
    onSettled: () => {
      console.log("settled");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const [hasError, errors, order] = validateCheckOutForm(
        formData,
        cartItems,
        totalPrice
    );
    if (hasError) {
        setFieldErrors(errors);
        return;
    }
    setFieldErrors({});
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {isError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error instanceof Error
            ? error.message
            : "Failed to place order. Please try again."}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formInputs.map((field) => (
          <CheckoutInput
            key={field.id}
            {...field}
            error={fieldErrors[field.id as keyof OrderInfoForm]}
          />
        ))}
      </div>

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

      <Button
        type="submit"
        disabled={!isChecked || isPending}
        className="w-full"
      >
        {isPending ? "Processing..." : "Place Order"}
      </Button>
    </form>
  );
}

export default CheckoutForm;
