
interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps  {
  label: string;
  name: string;
  options: Option[];
  error?: string;
  id: string;
  ref?: React.Ref<HTMLSelectElement>;
}

const SelectField = 
  ({ label, name, options, error, id, ref, ...props }: SelectFieldProps) => {
    return (
      <div className="mb-4">
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          {label}
        </label>
        <select
          {...props}
          ref={ref}
          name={name}
          id={id}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:border-primary focus:ring-primary"
          }`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
;


export default SelectField;
