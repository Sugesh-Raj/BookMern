import React from "react";
import { useGetOrderByEmailQuery } from "../../redux/features/orders/ordersApi";
import { getAuth } from "firebase/auth";

const OrderPage = () => {

  const auth = getAuth();
  const user = auth.currentUser;

  const email = user?.email;

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useGetOrderByEmailQuery(email, {
    skip: !email, // prevents undefined query
  });

  if (!email) {
    return <h2>Please login to see your orders</h2>;
  }

  if (isLoading) {
    return <h2>Loading orders...</h2>;
  }

  if (isError) {
    return <h2>Error loading orders</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders ({email})</h1>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px 0",
            }}
          >
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ₹{order.totalPrice}</p>
            <p>
              <strong>Status:</strong>{" "}
              {order.isDelivered ? "Delivered" : "Pending"}
            </p>

            <h4>Items:</h4>
            {order.orderItems?.map((item, index) => (
              <div key={index}>
                {item.name} × {item.qty} = ₹{item.price}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default OrderPage;
