import axios from 'axios';
import { Category, FullBookInfo } from '../types';
const baseUrl = 'http://localhost:3030/api/v1';


const api = axios.create({
    baseURL: baseUrl,
    timeout: 2500,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export const listBooks = async(category?: Category|'Choose a categ', trending?: boolean):Promise<FullBookInfo[]>=>{
    let url ='books/?';

    if(category && category !== 'Choose a categ')url+=`category=${category}`;
    if(trending)url+=`trending=1`;

    const { data:{books} } = await api.get(url);
    return books 
}
export const getBook = async(id: string):Promise<FullBookInfo> => {
    const {data:{ book }} = await api.get(`books/${id}`);
    console.log(book)
    return book;
}