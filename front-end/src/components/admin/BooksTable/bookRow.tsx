import { FC } from "react";
import { Link } from "react-router";
import { MdEditNote } from "react-icons/md";
import { Book } from "../../../types/index"; 

interface TableRowProps {
  book: Book;
  index: number;
  onDeleteClick: (id: string) => void;
}

const TableRow: FC<TableRowProps> = ({ book, index, onDeleteClick }) => (
  <tr>
    <td className="border-t-0 px-2 md:px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left hidden md:table-cell">
      {index + 1}
    </td>
    <td className="border-t-0 px-2 md:px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-semibold truncate max-w-[120px] md:max-w-none">
      {book.title}
    </td>
    <td className="border-t-0 px-2 md:px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 hidden md:table-cell">
      {book.category}
    </td>
    <td className="border-t-0 px-2 md:px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 hidden md:table-cell">
      ${book.newPrice}
    </td>
    <td className="border-t-0 px-2 md:px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
      <div className="flex flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <Link
          to={`/dashboard/edit-book/${book._id}`}
          className="font-medium text-gray-900 transition-all hover:text-primary-dark hover:underline underline-offset-2"
        >
          <MdEditNote className="w-5 h-5 md:w-6 md:h-6" />
        </Link>
        <button
          onClick={() => onDeleteClick(book._id)}
          className="font-medium bg-red-500 hover:bg-red-600 cursor-pointer py-1 px-3 md:px-4 rounded-full text-white text-sm"
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default TableRow;