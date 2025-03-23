
export interface OrderAbstact {
    _id: string;
    createdAt: string;
    totalPrice: number;
    productIds: string[];
}
interface Address {
    city: string;
    state: string;
    country: string;
    zipcode: string;
}
export interface OrderInfo {
    name: string;
    email: string;
    phone: string;
    address: Address
}

/* checkoutform */
export type OrderInfoForm = Omit<OrderInfo, "address">  & Address & {
    address: string;
    name: string;
    email: string;
    phone: string;
}
export interface FormState {
    error?: string ;
    fieldErrors?: Partial<OrderInfo>;
}
export interface Order extends OrderAbstact, OrderInfo{}