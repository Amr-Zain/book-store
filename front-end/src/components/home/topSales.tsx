import {  useState } from 'react';
import { Book, Category } from '../../types';
import BooksSlider from './booksSlider';


const slides: Book[] = [
    {_id:'1',title: 'dskflj',coverImage:'book-1.png',description:'dfskl fhseh eeop cmxlk', newPrice:250,oldPrice:300,category:'Business' },
    {_id:'2',title: 'dskflj',coverImage:'book-2.png',description:'dfskl fhseh eeop cmxlak', newPrice:250,oldPrice:300,category:'Business'},
    {_id:'3',title: 'dskflj',coverImage:'book-3.png',description:'dfskl fhseh eeop cmxlk', newPrice:250,oldPrice:300 ,category:'Business'},
    {_id:'4',title: 'dskflj',coverImage:'book-4.png',description:'dfskl fhseh eeop cmxlk', newPrice:250,oldPrice:300,category:'Business' },
    {_id:'5',title: 'dskflj',coverImage:'book-1.png',description:'dfskl fhseh eeop cmxlk', newPrice:250,oldPrice:300,category:'Business' },
    {_id:'6',title: 'dskflj',coverImage:'book-2.png',description:'dfskl fhseh eeop cmxlak', newPrice:250,oldPrice:300,category:'Business' },
    {_id:'7',title: 'dskflj',coverImage:'book-3.png',description:'dfskl fhseh eeop cmxlk', newPrice:250,oldPrice:300,category:'Business' },
    {_id:'8',title: 'dskflj',coverImage:'book-4.png',description:'dfskl fhseh eeop cmxlk', newPrice:250,oldPrice:300,category:'Business' },
];

type CategoriesList = Category | "Choose a categ";

const categories: CategoriesList[] = ["Choose a categ", "Business", "Fiction", "Horror", "Adventure"]

const TopSellers = () => {
    
    const [selectedCategory, setSelectedCategory] = useState("Choose a categ");


    const filteredBooks = selectedCategory === "Choose a categ" ? slides : null
    
    console.log(categories,selectedCategory)

    return (
        <div className='py-5'>
            <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
            <div className='mb-8 flex items-center'>
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category" id="category" className='border bg-blackBG border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
                    {
                        categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))
                    }
                </select>
            </div>
            <BooksSlider books={filteredBooks}/>
        </div>
    )
}

export default TopSellers