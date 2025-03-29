import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import Input from "../../components/utils/input";
import Button from "../../components/utils/button";
import useBook from "../../hooks/useBook";
import SelectField from "../../components/utils/select";

type FormValues = {
  title: string;
  description: string;
  category: string;
  oldPrice: string;
  newPrice: string;
  trending: boolean;
  coverImage: string;
};
const UpdateBook = () => {
  const { id } = useParams();
  const { book, isPending, error } = useBook(id);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();
  useEffect(() => {
    if (book) {
      setValue("title", book.title);
      setValue("description", book.description);
      setValue("category", book?.category as string);
      setValue("trending", book.trending as boolean);
      setValue("oldPrice", book.oldPrice.toFixed(2));
      setValue("newPrice", book.newPrice.toFixed(2));
      setValue("coverImage", book.coverImage);
      document.title = "Dashboard|Update-Book";
    }
  }, [book, setValue]);

  const onSubmit = async (data: FormValues) => {
    const updateBookData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage || book?.coverImage,
    };

    console.log(updateBookData);
    reset()
  };

  useEffect(() => {}, []);
  if (isPending) return <>loading...</>;
  if (error) return <div>Error fetching book data</div>;
  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type={"text"}
          label="Title"
          id="title"
          placeholder="Enter book title"
          error={errors.title?.message}
          {...register("title", { required: "Title is required" })}
        />

        <Input
          label="Description"
          id="description"
          type="textarea"
          placeholder="Enter book description"
          error={errors.description?.message}
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 20,
              message: "Description must be at least 20 characters",
            },
          })}
        />

        <SelectField
          id={"Category"}
          label="Category"
          options={[
            { value: "", label: "Choose A Category" },
            { value: "business", label: "Business" },
            { value: "technology", label: "Technology" },
            { value: "fiction", label: "Fiction" },
            { value: "horror", label: "Horror" },
            { value: "adventure", label: "Adventure" },
          ]}
          error={errors.category?.message}
          {...register("category", { required: "Category is required" })}
        />

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
              {...register("trending")}
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Trending
            </span>
          </label>
        </div>

        <Input
          label="Old Price"
          id="oldPrice"
          type="text"
          placeholder="Enter original price"
          error={errors.oldPrice?.message}
          {...register("oldPrice", {
            required: "Old price is required",
            min: {
              value: 0,
              message: "Price cannot be negative",
            },
            pattern: {
              value: /^[0-9]+(\.[0-9]+)?$/, // Number validation pattern
              message: "Must be a valid number",
            },
          })}
        />

        <Input
          label="New Price"
          id="newPrice"
          type="text"
          placeholder="Enter discounted price"
          error={errors.newPrice?.message}
          {...register("newPrice", {
            required: "New price is required",
            min: {
              value: 0,
              message: "Price cannot be negative",
            },
            pattern: {
              value: /^[0-9]+(\.[0-9]+)?$/,
              message: "Must be a valid number",
            },
            validate: (value, { oldPrice }) =>
              Number(value) < Number(oldPrice) ||
              "New price must be lower than old price",
          })}
        />

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cover Image
          </label>
          <Input
            label="Cover Image URL"
            name="coverImage"
            type="text"
            placeholder="Cover Image URL"
            register={register}
            id={"coverImage"}
            error={undefined}
          />
          {errors.coverImage && (
            <p className="text-sm text-red-500">{errors.coverImage.message}</p>
          )}
        </div>

        {errors.root && (
          <p className="text-red-500 text-sm mb-4">{errors.root.message}</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting && "opacity-50 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Adding..." : "Add Book"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateBook;
