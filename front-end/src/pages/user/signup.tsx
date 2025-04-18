import { Link, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import { useActionState, useState } from "react";
import Button from "../../components/utils/button";
import { useAuth } from "../../context/authContext";

interface RegisterState {
  error?: string;
}

const Signup = ({ role = "user" }: { role: "user" | "admin" }) => {
  const navigate = useNavigate();
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const auth = useAuth();
  const handleRegister = async (
    _prevState: RegisterState | null,
    formData: FormData
  ) => {
    try {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      auth!.register(email, password, role, name);
      if (role === "user") navigate("/");
      else setSuccess(true);
      return { error: undefined };
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return { error: errorMessage, success: false };
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await auth?.signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };
  const [state, actionFunction, isPending] = useActionState(handleRegister, {
    error: undefined,
  });

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center bg-gray-100 rounded shadow">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl text-gray-700 text-center font-semibold mb-4">
          {role === "admin" ? "Register New Admin" : "Sign Up"}
        </h2>
        {isSuccess && (
          <p className="text-center text-md text-green-500 bg-green-200 py-2 rounded border-1 border-green-400 mb-2">
            User Registered Successfully
          </p>
        )}
        <form action={actionFunction}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Name"
              required
              className="border border-gray-200 shadow-sm rounded bg-gray-50 appearance-none w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
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
              className="border border-gray-200 shadow-sm rounded bg-gray-50 appearance-none w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
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
              minLength={6}
              className="border border-gray-200 shadow-sm rounded bg-gray-50 appearance-none w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>

          {state?.error && (
            <p className="text-red-500 text-sm mb-4">{state.error}</p>
          )}

          <div>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>

        {role === "user" && (
          <>
            <p className="align-baseline font-medium text-gray-700 mt-4 text-sm">
              Have an account?{" "}
              <Link
                to="/login"
                className="text-secondary underline hover:text-blue-700"
              >
                Login
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
