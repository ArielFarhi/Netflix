import React from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "../context/Authentication.jsx";
import Footer from "../components/Footer";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { mutate: loginUser, isLoading, isError } = useLogin();

  const handleLogin = (formData) => {
    loginUser(formData);
  };

  return (
    <div
      className="overflow-x-hidden max-w-screen min-h-screen flex flex-col justify-center items-center bg-[rgb(20,20,20)] bg-cover bg-center relative"
      style={{ backgroundImage: "url('/Background.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <img
        src="/Logo.png"
        alt="Netflix Logo"
        className="w-28 h-10 absolute top-10 left-20 right-0"
      />

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="mt-28 h-3/4 m-5 relative bg-black/50 p-8 rounded-lg shadow-lg flex flex-col gap-4 w-10/12 lg:w-1/4 max-w-md text-white"
      >
        <h2 className="text-2xl font-medium">Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full h-12 p-3 border border-gray-600 rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          className="w-full h-12 p-3 border border-gray-600 rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password.message}</span>
        )}

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            {...register("rememberMe")}
            className="form-checkbox text-red-600"
          />
          Remember Me
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        {isError && (
          <div className="text-red-500 text-sm">
            Login failed. Please check your credentials.
          </div>
        )}

        <p className="text-sm text-gray-400 text-center mt-8">
          New to Netflix?{" "}
          <a href="/signup" className="text-white font-semibold hover:underline">
            Sign up now.
          </a>
        </p>
      </form>
      <Footer />
    </div>
  );
};

export default SignIn;
