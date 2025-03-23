export interface OrderData {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    state: string;
    zipcode: string;
}

export interface Address {
    city: string;
    country: string;
    state: string;
    zipcode: string;
}

export interface OrderPayload {
    name: string;
    email: string;
    address: Address;
    phone: string;
    productIds: string[];
    totalPrice: number;
}

export interface FormState {
    error?: string;
    fieldErrors?: Partial<OrderData>;
}