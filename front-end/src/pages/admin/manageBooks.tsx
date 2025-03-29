import { useEffect, useState } from "react";
import Table from "../../components/admin/BooksTable";
import DeleteConfirmationModal from "../../components/admin/BooksTable/deleteConfirmationModal";

const ManageBooks = () => {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(()=>{
    document.title = 'Dashboard|Manage-Books'
  },[])
  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  All Books
                </h3>
              </div>
            </div>
          </div>
          <Table
            onDeleteClick={(id) => {
              setSelectedBookId(id);
              setIsDeleteModalOpen(true);
            }}
          />
        </div>

        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          selectedBookId={selectedBookId}
          removeModel={() => {
            setIsDeleteModalOpen(false);
            setSelectedBookId(null);
          }}
          
        />
      </div>
    </section>
  );
};

export default ManageBooks;
