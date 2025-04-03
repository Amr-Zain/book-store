import axios from 'axios';
import { Book, Category, FullBookInfo, Statistics } from '../types';
import { Order } from '../types/order';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 2500,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Request interceptor for auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        console.debug('API error:', {
            url: originalRequest.url,
            status: error.response?.status,
            message: error.message
        });
        let errorMessage = 'An unexpected error occurred';
        if (error.response) {
            const responseData = error.response.data;
            errorMessage = responseData?.message || responseData || error.response.statusText;
            if (typeof errorMessage !== 'string') {
                errorMessage = JSON.stringify(errorMessage);
            }
        } else if (error.request) {
            errorMessage = 'Network error. Please check your internet connection.';
        } else {
            errorMessage = error.errors[0] || error.message || errorMessage;
        }

        return Promise.reject(new Error(errorMessage));
    }
);

export const listBooks = async (category?: Category | 'Choose a categ', trending?: boolean): Promise<FullBookInfo[]> => {
    let url = 'books/?';

    if (category && category !== 'Choose a categ') url += `category=${category}&`;
    if (trending) url += `trending=1`;

    const { data: { books } } = await api.get(url);
    return books
}
export const getBook = async (id: string): Promise<FullBookInfo> => {
    const { data: { book } } = await api.get(`books/${id}`);
    console.log(book)
    return book;
}
export const deleteBook = async (id: string): Promise<void> => {
    await api.delete(`books/${id}`);
}
export const postOrder = async (order: Omit<Order, '_id' | 'createdAt'>): Promise<Order> => {
    const { data } = await api.post('orders', order);
    console.log(data)
    return data;
}
export const postBook = async (book: Omit<Book, '_id' | 'createdAt'>): Promise<Order> => {
    const { data } = await api.post('books', book);
    console.log(data)
    return data;
}
export const updateBook = async (book: Omit<Book, 'createdAt'>): Promise<Order> => {
    const { data } = await api.put(`books/${book._id}`, book);
    console.log(data)
    return data;
}

export const getOrders = async (): Promise<Order[]> => {
    const { data: { orders } } = await api.get('orders');
    console.log(orders)
    return orders;
}
export const getStat = async (): Promise<Statistics> => {
    const { data } = await api.get('admin');
    return data;
}