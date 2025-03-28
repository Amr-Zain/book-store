import { useState } from "react";
import { Category } from "../../types";
import BooksSlider from "./booksSlider";
import { useQuery } from "@tanstack/react-query";
import { listBooks } from "../../api";
import { FiAlertTriangle } from "react-icons/fi";
import SliderItemsSkeleton from "./sliderItemsSkeleton";

type CategoriesList = Category | "Choose a categ";

const categories: CategoriesList[] = [
  "Choose a categ",
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
];

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    Category | "Choose a categ"
  >("Choose a categ");

  const { isPending, error, data } = useQuery({
    queryKey: ["trending-books", selectedCategory],
    queryFn: () => listBooks(selectedCategory, true),
    staleTime: 0,
  });
  return (
    <div className="py-5">
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) =>
            setSelectedCategory(e.target.value as Category | "Choose a categ")
          }
          value={selectedCategory}
          className="w-full max-w-xs px-4 py-2 text-md border border-gray-700 rounded-lg text-gray-900 
            cursor-pointer transition-all hover:border-gray-500 focus:outline-none appearance-none"
        >
          {categories.map((category, index) => (
            <option
              key={index}
              value={category}
              className="bg-gray-100 text-gray-900 hover:bg-gray-500"
            >
              {category}
            </option>
          ))}
        </select>
      </div>
      {error ? (
        <div className="text-red-600">
          Failed to load top sales: {error.message}
        </div>
      ) : null}
      {data?.length === 0 && (
        <div className="mt-4">
          <p className="inline-flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-lg border border-red-100 text-sm">
            <FiAlertTriangle className="text-lg" />
            No books found in{" "}
            <span className="font-medium ml-1">{selectedCategory}</span>
          </p>
        </div>
      )}{" "}
      {isPending ?  <SliderItemsSkeleton /> : <BooksSlider books={data || []} />}
    </div>
  );
};

export default TopSellers;

