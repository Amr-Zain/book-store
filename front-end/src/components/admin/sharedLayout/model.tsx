import { createPortal } from "react-dom";
import { Link } from "react-router";
import { navigationItems } from "../../../api/data";
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  return createPortal(
    <div
      className={`fixed inset-0 z-150 origin-left transition-all duration-300 ${
        isOpen ? "translate-0" : "translate-[-100%]"
      }`}
    >
      <div
        className={`fixed inset-0 backdrop-blur-[1.25px]`}
        onClick={onClose}
      />

      <div
        className={`fixed left-0 top-0 h-screen w-96 bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div className="h-full flex flex-col">
          <div className="bg-white border-b border-b-gray-200 shadow-sm">
            <div className="flex justify-between items-center px-6 py-2">
              <h3 className="text-xl text-gray-900 font-semibold">Menu</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <IoCloseOutline className="w-6 h-6 text-secondary" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <ul>
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    className="flex gap-2 mb-4 text-gray-700"
                    to={item.path}
                    onClick={onClose}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("root2")!
  );
};

export default Modal;
