import { getImgUrl } from "../../utils/url";
import { Link, useNavigate } from "react-router";
import { Book } from "../../types";
import { cartAddItem } from "../../actions/cart";
import { useCart } from "../../context/cartContext";
import CartAddButton from "../cart/cartAddButton";

interface BookCardProps {
  book: Book;
}
const BookCard = ({ book }: BookCardProps) => {
  const {
    dispatch,
    state: { cartItems },
  } = useCart();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/books/${book._id}`, {
      state: {
        book,
      },
    });
    window.scrollTo(0, 0);
  };

  return (
    <div className="rounded-lg transition-shadow shadow duration-300 hover:shadow-lg pt-2 sm:pt-0">
      <div className="flex flex-col sm:flex-row sm:h-72  sm:justify-center gap-2 ">
        <div
          onClick={handleClick}
          className="sm:h-72 sm:flex-shrink-0 lg:w-52 mx-auto  overflow-hidden rounded-md border border-gray-200"
        >
          <img
            src={`${getImgUrl(book?.coverImage)}`}
            alt={book.title}
            className="w-full h-[100%] bg-cover p-1 transition-transform duration-200 hover:scale-105 cursor-pointer"
          />
        </div>

        <div className="flex flex-col  justify-between flex-grow p-2 ">
          <div>
            <Link
              onClick={() => window.scrollTo(0, 0)}
              to={`/books/${book._id}`}
            >
              <h3 className="text-lg font-semibold hover:text-secondary mb-1 line-clamp-2">
                {book?.title}
              </h3>
            </Link>
            <p className="text-gray-600 text-sm mb-2 line-clamp-4">
              {book?.description}
            </p>
            <p className="font-medium text-sm mb-2">
              ${book?.newPrice}{" "}
              <span className="line-through text-gray-500 ml-2 text-xs">
                ${book?.oldPrice}
              </span>
            </p>
          </div>

          <CartAddButton
            isAdded={cartItems.some((item) => item._id === book._id)}
            add={() => dispatch(cartAddItem(book))}
          />
        </div>
      </div>
    </div>
  );
};

export default BookCard;
