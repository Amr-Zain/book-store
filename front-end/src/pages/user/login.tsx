import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useActionState, useState } from "react";
import Button from "../../components/utils/button";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [googleError, setGoogleError] = useState<string | null>(null);
  const handleLogin = async (
    _prevState: { error?: string },
    formData: FormData
  ) => {
    setGoogleError(null);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const user = await auth?.login(email, password);
      console.log(auth?.currentUser)
      if(user?.role === 'user')navigate("/");
      else if(user?.role === 'admin') navigate('/dashboard')
      return { error: undefined };
    } catch (error) {
      let errorMessage = "Network error. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return { error: errorMessage };
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleError(null);
      await auth?.signInWithGoogle();
      navigate("/");
    } catch (err) {
      console.error(err)
      setGoogleError(() =>
        err instanceof Error
          ? err.message.replace("Firebase: ", "")
          : "Something went Wrong Please Try Again"
      );
    }
  };

  const [state, actionFunction, isPending] = useActionState(handleLogin, {
    error: undefined,
  });
  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center bg-gray-100 rounded shadow">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl text-gray-700 text-center font-semibold mb-4">
          Login
        </h2>

        <form action={actionFunction}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              required
              className="border border-gray-200 shadow-sm rounded bg-gray-50 appearance-none  w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              className="border border-gray-200 shadow-sm bg-gray-50 appearance-none  rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>

          {state?.error && (
            <p className="text-red-600 text-sm mb-4">{state.error}</p>
          )}
          <div>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>

        <p className="align-baseline font-medium mt-4 text-gray-700 text-sm">
          Haven't an account?{" "}
          <Link
            to="/signup"
            className="text-secondary underline hover:text-blue-700"
          >
            Sign up
          </Link>
        </p>

        <div className="mt-4">
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 "
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </Button>
          {googleError && (
            <p className="text-red-600 text-sm mb-4 mt-2">{googleError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
