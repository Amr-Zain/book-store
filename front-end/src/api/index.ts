import axios from 'axios';
import { Category, FullBookInfo } from '../types';
import { Order } from '../types/order';
const baseUrl = 'http://localhost:3030/api/v1';


const api = axios.create({
    baseURL: baseUrl,
    timeout: 2500,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

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
            errorMessage = error.message || errorMessage;
        }

        return Promise.reject(new Error(errorMessage));
    }
);

export const listBooks = async (category?: Category | 'Choose a categ', trending?: boolean): Promise<FullBookInfo[]> => {
    let url = 'books/?';

    if (category && category !== 'Choose a categ') url += `category=${category}`;
    if (trending) url += `trending=1`;

    const { data: { books } } = await api.get(url);
    return books
}
export const getBook = async (id: string): Promise<FullBookInfo> => {
    const { data: { book } } = await api.get(`books/${id}`);
    console.log(book)
    return book;
}

export const postOrder = async (order: Omit<Order, '_id' | 'createdAt'>): Promise<Order> => {
    const { data } = await api.post('books', order);
    console.log(data)
    return data;
}