import React, { useState, useEffect } from "react";
import axios from "axios";
// import { holdings } from "../data/data";

function Holdings() {
  const [holdings, setHoldings] = useState([]);
  const fetchHoldings = () => {
    axios
      .get("/dashboard/api/holdings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setHoldings(res.data);
      });
  };

  useEffect(() => {
    fetchHoldings();
  }, []);

  // EMPTY STATE
  if (holdings.length === 0) {
    return (
      <div className="container-fluid holdings-section">
        <h2 className="mb-4 text-center">Holdings</h2>

        <div className="card shadow-sm text-center mx-5 empty-card">
          <div className="card-body text-center py-5">
            <h5>No holdings yet</h5>
            <p className="">You don’t own any stocks yet.</p>
          </div>
        </div>
      </div>
    );
  }

  // NORMAL STATE
  return (
    <div className="container-fluid holdings-section">
      <h2 className="mb-4 text-center">Holdings</h2>

      <div className="card shadow-sm table-card text-center mx-5">
        <div className="card-body p-2">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Qty</th>
                <th>Avg Price</th>
                <th>LTP</th>
                <th>Current Price</th>
                <th>P&L</th>
                <th>Net</th>
                <th>Day</th>
              </tr>
            </thead>

            <tbody>
              {holdings.map((stock) => {
                const curValue = stock.price * stock.qty;
                const isProfit = curValue - stock.avg * stock.qty >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";
                const investedValue = stock.avg * stock.qty;
                const currentValue = stock.price * stock.qty;

                const pnl = currentValue - investedValue;
                const netPercent = (pnl / investedValue) * 100;

                return (
                  <tr key={stock.name}>
                    <td className="stock-name">{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>₹{stock.avg.toFixed(2)}</td>
                    <td>₹{stock.price.toFixed(2)}</td>
                    <td>₹{curValue.toFixed(2)}</td>
                    <td className={profClass}>
                      {(curValue - stock.avg * stock.qty).toFixed(2)}
                    </td>
                    <td className={pnl >= 0 ? "text-success" : "text-danger"}>
                      ₹{pnl.toFixed(2)}
                    </td>

                    <td
                      className={
                        netPercent >= 0 ? "text-success" : "text-danger"
                      }
                    >
                      {netPercent.toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Holdings;
