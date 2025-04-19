import React from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "../context/Authentication.jsx";
import { Link } from "react-router";
import Footer from "../components/Footer";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
  });
  const { mutate: loginUser, isLoading, isError } = useLogin();
  const handleLogin = (formData) => {
    loginUser(formData);
    reset();
  };

  return (
    <div
      className="overflow-x-hidden max-w-screen min-h-screen flex flex-col justify-center items-center bg-[rgb(20,20,20)] bg-cover bg-center relative"
      style={{ backgroundImage: "url('/SignupBackground.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <img
        src="/Logo.png"
        alt="Netflix Logo"
        className="w-28 h-10 absolute top-10 left-20 right-0"
      />
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="mt-32 h-3/4 m-5 relative bg-black/50 p-8 rounded-lg shadow-lg flex flex-col gap-4 w-10/12 lg:w-1/4 max-w-md text-white"
      >
        <h2 className="text-2xl font-medium">Sign In</h2>
        <input
          type="text"
          placeholder="Email or phone number"
          {...register("username", { required: true })}
          className="w-full h-12 p-3 border border-gray-600 rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />
        {errors.username && (
          <span className="text-red-500 text-sm">
            Please enter a valid email or phone number
          </span>
        )}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            minLength: 4,
            maxLength: 60,
          })}
          className="w-full h-12 p-3 border border-gray-600 rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            Your password must be between 4 and 60 characters.
          </span>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
        {isError && (
          <div className="text-red-500 text-sm">Login failed. Try again.</div>
        )}
        <div className="text-center font-light">Forget Password?</div>
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("remember")}
              className="w-4 h-4 bg-transparent border border-gray-400 rounded-sm appearance-none checked:text-white flex items-center justify-center before:content-['✔'] before:hidden checked:before:block before:text-white before:font-bold before:text-xs"
            />
            Remember me
          </label>
        </div>
        <div className="font-light">
          <span className="text-gray-300">New to Netflix?</span>
          <Link to="/signup" className="cursor-pointer font-semibold">
            Sign up now
          </Link>
        </div>
        <div className="text-gray-400 text-sm font-thin">
          This page is protected by Google reCAPTCHA to ensure you're not a
          robot{" "}
          <a href="/" className="text-blue-600">
            Learn more
          </a>
        </div>
      </form>

      <Footer />
    </div>
  );
}

export default SignIn;