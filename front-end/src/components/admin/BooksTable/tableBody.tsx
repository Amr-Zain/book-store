import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import TableRow from "./bookRow";
import { listBooks } from "../../../api";
import SkeletonRow from "./skeletonRow";

interface TableBodyProps {
  onDeleteClick: (id: string) => void;
}

const TableBody: FC<TableBodyProps> = ({ onDeleteClick }) => {

  const  { isPending, error, data: books }  = useQuery({
    queryKey: ["books"],
    queryFn: () => listBooks(undefined, false),
    staleTime: 1000 * 60 * 15,
  });

  if (isPending) {
    return (
      <>
        {[...Array(6)].map((_, index) => (
          <SkeletonRow key={`skeleton-${index}`} />
        ))}
      </>
    );
  }

  if (error) {
    return (
      <tr>
        <td colSpan={5} className="text-center py-4 text-red-500">
          Error: {error.message}
        </td>
      </tr>
    );
  }

  if (!books || books.length === 0) {
    return (
      <tr>
        <td colSpan={5} className="text-center py-4">
          No books found
        </td>
      </tr>
    );
  }

  return (
    <>
      {books.map((book, index) => (
        <TableRow
          key={book._id}
          book={book}
          index={index}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </>
  );
};

export default TableBody;