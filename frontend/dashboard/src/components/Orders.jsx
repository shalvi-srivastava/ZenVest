// import { orders } from "../data/data";
import React, { useState, useEffect } from "react";
import axios from "axios";
function Orders() {
  const [orders, setOrders] = useState([]);
  // useEffect(() => {
  //   axios.get("/dashboard/api/orders").then((res) => {
  //     setOrders(res.data);
  //   });
  // }, []); // 👈 THIS LINE IS CRUCIAL
  useEffect(() => {
    axios
      .get("/dashboard/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("ORDERS DATA 👉", res.data); // optional but useful
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Orders fetch failed ❌", err);
      });
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const statusColor = {
    COMPLETED: "bg-success",
    PENDING: "bg-warning",
    CANCELLED: "bg-danger",
  };

  if (orders.length === 0) {
    return (
      <div className="container-fluid orders-section">
        <h2 className="mb-4 text-center">Orders</h2>

        <div className="card shadow-sm  text-center mx-5 empty-card">
          <div className="card-body text-center py-5">
            <h5>No orders yet</h5>
            <p className=" mb-0">You haven’t placed any buy or sell orders.</p>
            <p>Start by exploring stocks from your watchlist.</p>
          </div>
        </div>
      </div>
    );
  }

  // normal orders table
  return (
    <div className="container-fluid orders-section">
      <h2 className="mb-4 text-center">Orders</h2>

      <div className="card shadow-sm table-card text-center mx-5">
        <div className="card-body p-2">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Price</th>
                {/* <th>Status</th> */}
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td
                    className={
                      order.mode === "BUY"
                        ? "text-success fw-semibold"
                        : "text-danger fw-semibold"
                    }
                  >
                    {order.mode}
                  </td>
                  <td>{order.qty}</td>
                  <td>₹{order.price}</td>
                  {/* <td>
                    <span className={`badge ${statusColor[order.status]}`}>
                      {order.status}
                    </span>
                  </td> */}

                  <td>{formatDate(order.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
