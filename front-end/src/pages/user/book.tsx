import { useLocation, useParams } from "react-router-dom";
import { getImgUrl } from "../../utils/url";
import { useCart } from "../../context/cartContext";
import CartAddButton from "../../components/cart/cartAddButton";
import { cartAddItem } from "../../actions/cart";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBook } from "../../api";
import { FiAlertTriangle } from "react-icons/fi";

const Book = () => {
  const { id } = useParams();
  const {
    dispatch,
    state: { cartItems },
  } = useCart();
  const location = useLocation();
  const queryClient = useQueryClient();
  if (location.state?.book) {
    queryClient.setQueryData(["books", id], location.state.book);
  }
  const {
    isPending,
    error,
    data: book,
  } = useQuery({
    queryKey: ["books", id],
    queryFn: () => getBook(id!),
  });

  // Loading state
  if (isPending) {
    return (
      <div className="max-w-lg mx-auto p-5">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto p-5">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-700">
            <FiAlertTriangle className="text-lg" />
            <h2 className="text-lg font-semibold">Failed to load that book</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-lg p-5">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
          <h2 className="text-lg font-semibold text-yellow-800">
            Book not found
          </h2>
          <p className="mt-1 text-sm text-yellow-700">
            The requested book does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg shadow-md p-5 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">{book.title}</h1>

      <div>
        <div className="mb-6">
          <img
            src={getImgUrl(book.coverImage).toString()}
            alt={book.title}
            className="w-full h-64 object-contain mb-4 rounded"
          />
        </div>

        <div className="mb-6 space-y-3">
          <p className="text-gray-700">
            <strong className="text-gray-900">Author:</strong>{" "}
            {book.author || "Unknown"}
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-900">Published:</strong>
            {new Date(book.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 capitalize">
            <strong className="text-gray-900">Category:</strong> {book.category}
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-900">Description:</strong>
            <span className="block mt-1">{book.description}</span>
          </p>
        </div>

        <CartAddButton
          isAdded={cartItems.some((item) => item._id === book._id)}
          add={() => dispatch(cartAddItem(book))}
        />
      </div>
    </div>
  );
};

export default Book;
