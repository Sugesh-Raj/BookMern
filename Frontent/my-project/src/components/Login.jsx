import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/Auth.context";

const Login = () => {
  const { loginUser, signInWithGoogle } = useAuth(); // ✅ added Google sign-in
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // Email/Password login
  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      alert("Login successful!");
      navigate("/"); // redirect to home
    } catch (error) {
      setMessage("Invalid email or password");
    }
  };

  // Google login
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Login with Google successful!");
      navigate("/"); // redirect to home
    } catch (error) {
      console.error(error);
      setMessage("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-sm rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-center mb-6">
          Please Login
        </h2>

        {message && (
          <p className="text-red-500 text-center text-sm mb-3">{message}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* EMAIL */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-1 block">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-1 block">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Haven’t an account?{" "}
          <Link to="/register" className="text-blue-600">
            Please Register
          </Link>
        </p>

        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-2 text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Sign-In */}
        <button
          type="button"
          onClick={handleGoogleSignIn} // ✅ handle Google login
          className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md hover:bg-gray-900"
        >
          <FaGoogle />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
