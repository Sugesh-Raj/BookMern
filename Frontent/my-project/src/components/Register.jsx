import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../context/Auth.context";

const Register = () => {

  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // register user
  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);
      alert("User registered successfully!");
      navigate("/");
    } catch (error) {
      setMessage("Please provide a valid email and password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">

      <div className="bg-white w-full max-w-sm rounded-lg shadow-md p-6">

        <h2 className="text-xl font-semibold text-center mb-6">
          Create Account
        </h2>

        {message && (
          <p className="text-red-500 text-center text-sm mb-3">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* NAME */}
          <div className="mb-4">
            <input
              {...register("name", { required: true })}
              placeholder="Full Name"
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.name && <span className="text-red-500 text-sm">Name required</span>}
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <input
              {...register("email", { required: true })}
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.email && <span className="text-red-500 text-sm">Email required</span>}
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                Password min 6 chars
              </span>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-4">
            <input
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>

        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-2 text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md">
          <FaGoogle />
          Sign up with Google
        </button>

      </div>
    </div>
  );
};

export default Register;
