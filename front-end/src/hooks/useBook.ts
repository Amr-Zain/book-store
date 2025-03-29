import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router";
import { getBook } from "../api";


function useBook(id: string | undefined) {
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
    if (!id) return { isPending: false, error: 'id is required', book: undefined }

    return { isPending, error, book };
}

export default useBook;