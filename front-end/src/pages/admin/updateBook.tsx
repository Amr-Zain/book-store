import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import Input from "../../components/utils/input";
import Button from "../../components/utils/button";
import useBook from "../../hooks/useBook";
import SelectField from "../../components/utils/select";
import { FullBookInfo } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBook } from "../../api";

const UpdateBook = () => {
  const { id } = useParams();
  const { book, isPending, error } = useBook(id);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    setError,
  } = useForm<Omit<FullBookInfo & { coverImage: FileList }, "author">>();
  useEffect(() => {
    if (book) {
      setValue("title", book.title);
      setValue("description", book.description);
      setValue("category", book?.category);
      setValue("trending", book.trending as boolean);
      setValue("oldPrice", +book.oldPrice.toFixed(2));
      setValue("newPrice", +book.newPrice.toFixed(2));
      document.title = "Dashboard|Update-Book";
    }
  }, [book, setValue]);
  const queryClient = useQueryClient();

  const { mutate, isSuccess } = useMutation({
    mutationFn: (formData:  Omit<FullBookInfo,'quantity'>) =>
      updateBook(formData),
    mutationKey: ["books"],
    onSuccess: () => {
      reset();
      const fileInput = document.getElementById(
        "coverImage"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      setError("root", {
        type: "manual",
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit form. Please try again.",
      });
    },
  });
  const onSubmit = async (
    data: Omit<FullBookInfo & { coverImage: FileList }, "author">
  ) => {
    const updateBookData: Omit<FullBookInfo,'quantity'> = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      author: book!.author,
      coverImage: data.coverImage[0]?.name || book!.coverImage,
      createdAt: book!.createdAt,
      _id: book!._id,
    };
    mutate(updateBookData);
  };

  useEffect(() => {
    document.title = 'Book-Store|Upate-Book';
  }, []);
  if (isPending) return <>loading...</>;
  if (error) return <div>Error fetching book data</div>;
  return (
    <div className="max-w-lg mx-auto mt-6 md:p-6 p-3 bg-white rounded-lg shadow-md">
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
          <input
            id="coverImage"
            type="file"
            accept="image/*"
            {...register("coverImage", {
              validate: {
                lessThan10MB: (files) =>
                  files[0]? files[0].size < 2000000|| "Maximum 2MB file size" : true,
                acceptedFormats: (files) =>{
                  const accept =["image/jpeg", "image/png", "image/webp"].includes(
                    files[0]?.type
                  );
                  if(accept)
                    return true;
                  else if(files[0])return "Only JPEG, PNG, and WEBP formats are supported"
                  else return true
              }},
            })}
            className="mb-2 w-full"
          />
          {errors.coverImage && (
            <p className="text-sm text-red-500">{errors.coverImage.message}</p>
          )}
        </div>

        {errors.root && (
          <p className="text-red-500 text-sm mb-4">{errors.root.message}</p>
        )}
        {isSuccess && (
          <p className="text-green-500 bg-green-200 py-2 pl-2 rounded border-1 border-green-300 text-sm mb-4">
            Book added Successfully
          </p>
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
