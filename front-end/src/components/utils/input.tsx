type prps = {
  id: string;
  label: string;
  type: string;
  error: string | undefined;
  placeholder: string;
  [key: string]: unknown;
};

function Input({ id, label, type, error,placeholder,...res }: prps) {
  return (
    <div key={id} className="mb-2">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder??label}
        {...res}
        className={`w-full p-2 border border-gray-200 shadow-sm rounded bg-gray-50 focus:outline-none ${
          error ? "border-red-500" : " focus:border-primary focus:ring-primary"
        }`}
        aria-describedby={`${id}-error`}
      />
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
