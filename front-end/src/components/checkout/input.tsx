type prps = {
    id:string;
    label: string;
    type: string;
    error: string| undefined
}


function CheckoutInput({ id, label, type, error}:prps) {
    return (<div key={id}>
        <label htmlFor={id} className="block text-sm font-medium mb-1">
          {label}
        </label>
        <input
            id={id}
            name={id}
            type={type}
            required
            className={`w-full p-2 border rounded ${
                error ? 'border-red-500' : ''
            }`}
            aria-describedby={`${id}-error`}
        />
        {
            error&&<p id={`${id}-error`} className="text-red-500 text-sm mt-1">
            {error}
            </p>
        }
      </div>);
}

export default CheckoutInput;