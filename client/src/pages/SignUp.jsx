import React from "react";
import { useForm } from "react-hook-form";
import { useRegister } from "../context/Authentication.jsx";
import Footer from "../components/Footer";
import { toast } from "sonner";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      role: "user",
    },
  });

  const { mutate: registerUser, isLoading, isError } = useRegister();

  const handleRegister = (formData) => {
    if (!formData.email && !formData.phone) {
      toast.error("Please provide either an email or a phone number");
      return;
    }
    registerUser(formData);
    reset();
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
        onSubmit={handleSubmit(handleRegister)}
        className="mt-28 h-3/4 m-5 relative bg-black/50 p-8 rounded-lg shadow-lg flex flex-col gap-4 w-10/12 lg:w-1/4 max-w-md text-white"
      >
        <h2 className="text-2xl font-medium">Sign Up</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email format",
            },
          })}
          className="w-full h-12 p-3 border border-gray-600 rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}

        {/* Phone */}
        <input
          type="tel"
          placeholder="Phone number"
          {...register("phone", {
            pattern: {
              value: /^\d{9,15}$/,
              message: "Invalid phone number format",
            },
          })}
          className="w-full h-12 p-3 border border-gray-600 rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">{errors.phone.message}</span>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            minLength: 8,
            pattern: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
          })}
          className="w-full h-12 p-3 border border-gray-600 rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />
        {errors.password?.type === "required" && (
          <span className="text-red-500 text-sm">Password is required</span>
        )}
        {errors.password?.type === "minLength" && (
          <span className="text-red-500 text-sm">
            Password must be at least 8 characters
          </span>
        )}
        {errors.password?.type === "pattern" && (
          <span className="text-red-500 text-sm">
            Must contain at least one letter and one digit
          </span>
        )}

        <label className="text-sm">Select Role:</label>
        <select
          {...register("role", { required: true })}
          className="w-full h-12 p-3 border border-gray-600 rounded bg-transparent text-white"
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition"
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>

        {isError && (
          <div className="text-red-500 text-sm">
            Registration failed. Please try again.
          </div>
        )}

        <div className="mt-28 lg:mt-32 text-gray-400 text-sm font-thin">
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
};

export default SignUp;
