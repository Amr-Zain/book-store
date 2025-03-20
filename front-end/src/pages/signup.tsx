import { Link, useNavigate } from 'react-router';
import { FaGoogle } from "react-icons/fa";
import { useActionState } from "react";

interface RegisterState {
  error?: string;
}

const Signup = () => {
  const navigate = useNavigate();

  const handleRegister = async (prevState: RegisterState | null, formData: FormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const email = formData.get('email');
      const password = formData.get('password');
      console.log(email,password)
      navigate('/');
      return { error: undefined };

    } catch (error) {
      let errorMessage = 'Registration failed. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return { error: errorMessage, success: false };
    }
  };

  const [state, dispatch, isPending] = useActionState(handleRegister, { error: undefined });

  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center '>
      <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-xl text-center font-semibold mb-4'>Sign Up</h2>

        <form action={dispatch}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder='Email Address'
              required
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder='Password'
              required
              minLength={6}
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
            />
          </div>

          {state?.error && (
            <p className="text-red-500 text-sm mb-4">{state.error}</p>
          )}

          <div>
            <button 
              type="submit"
              disabled={isPending}
              className={`bg-blue-500 hover:bg-blue-700 text-white cursor-pointer font-bold py-2 px-8 rounded focus:outline-none ${
                isPending ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isPending ? 'signing up...' : 'Signup'}
            </button>
          </div>
        </form>

        <p className='align-baseline font-medium mt-4 text-sm'>
          Have an account? Please {' '}
          <Link to="/login" className='text-blue-500 hover:text-blue-700'>Login</Link>
        </p>

        <div className='mt-4'>
          <button 
            type="button"
            className='w-full flex flex-wrap gap-1 items-center justify-center bg-blue-500 cursor-pointer
                hover:bg-secondry text-white font-bold py-2 px-4 rounded focus:outline-none'
          >
            <FaGoogle className='mr-2'/>
            Sign in with Google
          </button>
        </div>

      </div>
    </div>
  );
};

export default Signup;