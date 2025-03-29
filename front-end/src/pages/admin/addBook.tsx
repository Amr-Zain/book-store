import { useForm } from "react-hook-form";
import Input from "../../components/utils/input";
import SelectField from "../../components/utils/selectField";
import Button from "../../components/utils/button";
import { useEffect } from "react";

type FormValues = {
  title: string;
  description: string;
  category: string;
  oldPrice: string;
  newPrice: string;
  trending: boolean;
  coverImage: FileList;
};

const AddBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("oldPrice", data.oldPrice);
      formData.append("newPrice", data.newPrice);
      formData.append("trending", String(data.trending));
      formData.append("coverImage", data.coverImage[0]);

      // await api.addBook(formData);
      console.log("Form data:", Object.fromEntries(formData));

      reset();
      const fileInput = document.getElementById(
        "coverImage"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      setError("root", {
        type: "manual",
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit form. Please try again.",
      });
    }
  };
  
    useEffect(()=>{
      document.title = 'Dashboard|Add-Book'
    },[])
  return (
    <div className="max-w-lg mx-auto mt-6 md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

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
          <input
            id="coverImage"
            type="file"
            accept="image/*"
            {...register("coverImage", {
              required: "Cover image is required",
              validate: {
                lessThan10MB: (files) =>
                  files[0]?.size < 2000000 || "Maximum 2MB file size",
                acceptedFormats: (files) =>
                  ["image/jpeg", "image/png", "image/webp"].includes(
                    files[0]?.type
                  ) || "Only JPEG, PNG, and WEBP formats are supported",
              },
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

export default AddBook;
