import { FiShoppingCart } from 'react-icons/fi'
import { getImgUrl } from '../utils/url'
import { Link } from 'react-router-dom'
import { Book } from '../types'
import Button from './utils/button'
import { cartAddItem } from '../actions/cart'
import { useCart } from '../context/cartContext'

interface BookCardProps {
  book: Book
}
const BookCard = ({ book }: BookCardProps) => {
  const { dispatch } = useCart();
  return (
    <div className="rounded-lg transition-shadow duration-300 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row sm:h-72  sm:justify-center gap-3">

        <div className="sm:h-72 sm:flex-shrink-0 lg:w-52 mx-auto  overflow-hidden rounded-md border border-gray-200">
          <Link to={`/books/${book._id}`} className="block h-full">
            <img
              src={`${getImgUrl(book?.coverImage)}`}
              alt={book.title}
              className="w-full  bg-cover p-1 transition-transform duration-200 hover:scale-105 cursor-pointer"
            />
          </Link>
        </div>

        <div className="flex flex-col  justify-between flex-grow">
          <div>
            <Link to={`/books/${book._id}`}>
              <h3 className="text-lg font-semibold hover:text-secondary mb-1 line-clamp-2">
                {book?.title}
              </h3>
            </Link>
            <p className="text-gray-600 text-sm mb-2 line-clamp-4">
              {book?.description}
            </p>
            <p className="font-medium text-sm mb-2">
              ${book?.newPrice}{' '}
              <span className="line-through text-gray-500 ml-2 text-xs">
                ${book?.oldPrice}
              </span>
            </p>
          </div>

          <Button
            onClick={()=>dispatch(cartAddItem(book))}
            className="flex justify-center items-center gap-1 text-sm">
              <FiShoppingCart className="" />
              <span>Add to Cart</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BookCard