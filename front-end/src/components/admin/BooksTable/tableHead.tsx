import { FC } from "react";

const tableHead = [
  { text: "#", hide: true },
  { text: "Book Title", hide: false },
  { text: "Category", hide: true },
  { text: "Price", hide: true },
  { text: "Actions", hide: false },
];

const TableHeader: FC = () => (
  <thead>
    <tr>
      {tableHead.map((item, index) => (
        <th
          key={index}
          className={`px-2 md:px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 
                      py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                        item.hide ? "hidden md:table-cell" : ""
                      }`}
        >
          {item.text}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
