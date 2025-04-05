import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { deleteBook } from "../../../api";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  selectedBookId: string | null;
  removeModel: () => void;
}

const DeleteConfirmationModal: FC<DeleteConfirmationModalProps> = ({
  isOpen,
  selectedBookId,
  removeModel,
}) => {
  const queryClient = useQueryClient();
  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      removeModel();
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (err) => {
      console.error("Failed to delete book:", err);
    },
  });

  if (!isOpen) return null;

  const handleDeleteConfirmation = () => {
    if (selectedBookId) {
      mutate(selectedBookId);
    }
  };
  return (
    <div className="fixed inset-0 backdrop-blur-[1.25px] flex items-center justify-center z-50">
      <div className="bg-purple-50 p-6 rounded-lg max-w-md w-full mx-4 text-gray-900 shadow-2xl">
        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>

        <p className="mb-2">
          Are you sure you want to delete this book? This action cannot be
          undone.
        </p>
        {isError && <p className="text-red-600 mb-2">{error.message}</p>}
        <div className="flex justify-end space-x-3">
          <button
            onClick={removeModel}
            className="px-4 py-2 cursor-pointer rounded-lg transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleDeleteConfirmation}
            disabled={isPending}
            className={`px-4 py-2 bg-red-500 cursor-pointer text-white hover:bg-red-600 rounded-lg transition-colors ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
