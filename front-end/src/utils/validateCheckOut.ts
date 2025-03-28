import { CartItemType } from "../types/cartReducer";
import { Order, OrderInfoForm } from "../types/order";

export const validateCheckOutForm = (
    formData: FormData,
    cartItems: CartItemType[],
    totalPrice: number
): [boolean, Partial<OrderInfoForm>, Omit<Order, "_id" | "createdAt">] => {


    const orderInfo: OrderInfoForm = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        country: formData.get("country") as string,
        state: formData.get("state") as string,
        zipcode: formData.get("zipcode") as string,
    };
    let hasError = false;
    const fieldErrors: Partial<OrderInfoForm> = {};

    const requiredFields: (keyof OrderInfoForm)[] = [
        "name",
        "email",
        "phone",
        "address",
        "city",
        "country",
        "state",
        "zipcode",
    ];

    requiredFields.forEach((field) => {
        if (!orderInfo[field]?.trim()) {
            fieldErrors[field] = "This field is required";
            hasError = true;
        }
    });
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(orderInfo.phone)) {
        fieldErrors.phone = "Invalid phone number format";
        hasError = true;
    }
    const newOrder: Omit<Order, "_id" | "createdAt"> = {
        ...orderInfo,
        address: {
            city: orderInfo.city,
            country: orderInfo.country,
            state: orderInfo.state,
            zipcode: orderInfo.zipcode,
        },
        productIds: cartItems.map((item) => item._id),
        totalPrice: Number(totalPrice.toFixed(2)),
    };
    return [hasError, fieldErrors, newOrder];
};