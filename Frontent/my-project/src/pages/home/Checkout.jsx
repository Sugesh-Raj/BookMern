import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth.context";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";

const Checkout = () => {
  const { currentUser } = useAuth();
  const [isChecked, setIsChecked] = useState(false);

  const [createOrder,{isLoading}] = useCreateOrderMutation();

  const navigate = useNavigate()

  const cartItems = useSelector((state)=>state.cart.cartItems);
  const totalPrice = cartItems.reduce((acc,items)=>{
    return acc+items.newPrice;
  },0)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  const onSubmit = async(data) => {
    const newOrder = {
    name: data.name,
    email: currentUser?.email,

    address: {
      city: data.city,
      country: data.country,
      state: data.state,
      zipcode: data.zipcode,
    },

    phone: data.phone,

    productIds: cartItems.map((item) => item._id),

    totalPrice: totalPrice,

    userId : currentUser.uid

  }
  try{
    await createOrder(newOrder).unwrap();
    alert("your order is created");
    navigate("/orders");
  }catch(error){

    console.error("error place an order",error);
    alert("failed to place an order");

  }
};

if(isLoading) return <div> Loading... </div>


  

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div>
            <h2 className="font-semibold text-xl text-gray-600 mb-2">
              Cash On Delivery
            </h2>
            <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
            <p className="text-gray-500 mb-6">Items: {cartItems.length}</p>
          </div>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
            >
              {/* LEFT */}
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              {/* RIGHT */}
              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">

                  {/* FULL NAME */}
                  <div className="md:col-span-5">
                    <label>Full Name</label>
                    <input
                      type="text"
                      {...register("name", { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs">Name is required</p>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div className="md:col-span-5">
                    <label>Email Address</label>
                    <input
                      type="text"
                      {...register("email")}
                      disabled
                      defaultValue={currentUser?.email}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  {/* PHONE */}
                  <div className="md:col-span-5">
                    <label>Phone Number</label>
                    <input
                      type="number"
                      {...register("phone", { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs">Phone is required</p>
                    )}
                  </div>

                  {/* ADDRESS */}
                  <div className="md:col-span-3">
                    <label>Address / Street</label>
                    <input
                      type="text"
                      {...register("address", { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  {/* CITY */}
                  <div className="md:col-span-2">
                    <label>City</label>
                    <input
                      type="text"
                      {...register("city", { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  {/* COUNTRY */}
                  <div className="md:col-span-2">
                    <label>Country / region</label>
                    <div className="h-10 bg-gray-50 flex border rounded items-center mt-1">
                      <input
                        {...register("country", { required: true })}
                        placeholder="Country"
                        className="px-4 outline-none w-full bg-transparent"
                      />
                    </div>
                  </div>

                  {/* STATE */}
                  <div className="md:col-span-2">
                    <label>State / province</label>
                    <div className="h-10 bg-gray-50 flex border rounded items-center mt-1">
                      <input
                        {...register("state", { required: true })}
                        placeholder="State"
                        className="px-4 outline-none w-full bg-transparent"
                      />
                    </div>
                  </div>

                  {/* ZIPCODE */}
                  <div className="md:col-span-1">
                    <label>Zipcode</label>
                    <input
                      type="text"
                      {...register("zipcode", { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  {/* TERMS */}
                  <div className="md:col-span-5 mt-3">
                    <div className="inline-flex items-center">
                      <input
                        type="checkbox"
                        {...register("terms", { required: true })}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        className="form-checkbox"
                      />
                      <label className="ml-2">
                        I agree to the{" "}
                        <Link className="underline text-blue-600">
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link className="underline text-blue-600">
                          Shopping Policy
                        </Link>
                      </label>
                    </div>
                    {errors.terms && (
                      <p className="text-red-500 text-xs">
                        You must accept the terms
                      </p>
                    )}
                  </div>

                  {/* SUBMIT */}
                  <div className="md:col-span-5 text-right">
                    <button
                      disabled={!isChecked}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Place an Order
                    </button>
                  </div>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
