// import { positions } from "../data/data";
import React, { useState, useEffect } from "react";
import axios from "axios";
function Positions() {
  const [positions, setPositions] = useState([]);
  useEffect(() => {
    axios.get("/dashboard/api/positions").then((res) => {
      console.log(res.data);
      setPositions(res.data);
    });
  }, []);
  // EMPTY STATE
  if (positions.length === 0) {
    return (
      <div className="container-fluid">
        <h2 className="mb-4 text-center">Positions</h2>

        <div className="card shadow-sm table-card text-center mx-5">
          <div className="card-body text-center py-5">
            <h5>No open positions</h5>
            <p>You don’t have any active positions right now.</p>
          </div>
        </div>
      </div>
    );
  }

  // NORMAL STATE
  return (
    <div className="container-fluid">
      <h2 className="mb-4 text-center">Positions</h2>

      <div className="card shadow-sm table-card text-center mx-5">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Stock</th>
                <th>Qty</th>
                <th>Avg Price</th>
                <th>Current Price</th>
                <th>Net</th>
                <th>Day</th>
              </tr>
            </thead>

            <tbody>
              {positions.map((pos, index) => (
                <tr key={index}>
                  <td>
                    <span className="badge bg-secondary">{pos.product}</span>
                  </td>

                  <td style={{ fontWeight: "400px" }}>{pos.name}</td>
                  <td>{pos.qty}</td>
                  <td>₹{pos.avg}</td>
                  <td>₹{pos.price}</td>

                  <td
                    className={
                      pos.net.startsWith("-") ? "text-danger " : "text-success "
                    }
                  >
                    {pos.net}
                  </td>

                  <td
                    className={
                      pos.day.startsWith("-") ? "text-danger" : "text-success"
                    }
                  >
                    {pos.day}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Positions;
