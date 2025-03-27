import { useParams } from "react-router-dom"

import { getImgUrl } from '../../utils/url';
import { useEffect, useState } from "react";
import { FullBookInfo } from "../../types";
import { useCart } from "../../context/cartContext";
import CartAddButton from "../../components/cart/cartAddButton";
import { cartAddItem } from "../../actions/cart";

const Book = () => {
    const {id} = useParams();
    const [ book, setBook ] = useState<FullBookInfo |null>(null)
    const { dispatch, state:{cartItems} } = useCart();
    useEffect(()=>{
        //fetch the book
        
        const book:FullBookInfo = {_id:id ||'1',title: 'dskflj',
            coverImage:'book-1.png', 
            description:'dfskl fhseh eeop cmxlk', 
            newPrice:250,oldPrice:300,
            category:'Business',
            author:'Amr Zain',
            createdAt: Date.now()
        }
        setBook(book);
        
        document.title = 'Book-store|Book'+id;
        throw new Error('oops')     
    },[id])
    if(!book) return <h1>Book not exist</h1>


    return (
    <div className="max-w-lg shadow-md p-5 bg-white rounded ">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">{book!.title}</h1>

            <div className=''>
                <div>

                    <img
                        src={`${getImgUrl(book!.coverImage)}`}
                        alt={book!.title}
                        className="mb-8"
                    />
                </div>

                <div className='mb-5'>
                    <p className="text-gray-700 mb-2"><strong>Author:</strong> {book!.author || 'admin'}</p>
                    <p className="text-gray-700 mb-4">
                        <strong>Published:</strong> {new Date(book!.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 mb-4 capitalize">
                        <strong>Category:</strong> {book?.category}
                    </p>
                    <p className="text-gray-700"><strong>Description:</strong> {book!.description}</p>
                </div>

                <CartAddButton isAdded={cartItems.some(item=>item._id === book._id)}  add={()=>dispatch(cartAddItem(book))}/>
            </div>
        </div>
  )
}

export default Book