import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useActionState } from "react";
import Button from "../../components/utils/button";

const Login = () => {
  const navigate = useNavigate();
  
  const handleLogin = async (_prevState: { error?: string }, formData: FormData) => {
    try {
        const email = formData.get('email');
        const password = formData.get('password');
        console.log(email,password)
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/');
        return { error: undefined };

    } catch (error) {
        let errorMessage = 'Network error. Please try again.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return { error: errorMessage };
    }
  };

  const [state, dispatch, isPending] = useActionState(handleLogin, { error: undefined });

  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center '>
      <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-xl text-center font-semibold mb-4'>Login</h2>

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
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
            />
          </div>

          {state?.error && (
            <p className="text-red-600 text-sm mb-4">{state.error}</p>
          )}

          <div>
            <Button 
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </form>

        <p className='align-baseline font-medium mt-4 text-sm'>
          Haven't an account? {' '}
          <Link to="/signup" className='text-secondary underline hover:text-blue-700'>Sign up</Link>
        </p>

        <div className='mt-4'>
        <Button 
            type="button"
            className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 '
          >
            <FaGoogle className='mr-2'/>
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;