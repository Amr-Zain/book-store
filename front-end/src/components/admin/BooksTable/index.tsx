import { FC } from "react";
import TableHeader from "./tableHead";
import TableBody from "./tableBody";

interface TableProps {
  onDeleteClick: (id: string) => void;
}

const Table: FC<TableProps> = ({ onDeleteClick }) => (
  <div className="block w-full overflow-x-auto px-2">
    <table className="items-center bg-transparent w-full border-collapse bl-2">
      <TableHeader />
      <tbody>
        <TableBody  onDeleteClick={onDeleteClick} />
      </tbody>
    </table>
  </div>
);

export default Table;