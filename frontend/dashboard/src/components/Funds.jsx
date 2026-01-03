import axios from "axios";
import { useEffect, useState } from "react";
function Funds({refreshKey}) {
  const [funds, setFunds] = useState({
    totalBalance: 0,
    investedAmount: 0,
    availableBalance: 0,
  });

  useEffect(() => {
    axios
      .get("/dashboard/api/funds", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setFunds(res.data);
      });
  }, [{refreshKey}]);

  const { totalBalance, investedAmount, availableBalance } = funds;

  return (
    <div className="container-fluid">
      <h2 className="mb-4 text-center">Funds</h2>

      <div className="card-grid">
        {/* Available Balance */}
        <div className="summary-card">
          <div className="">
            <div className="">
              <h6 className="">Available Balance</h6>
              <h4 className="mb-2">₹{availableBalance.toFixed(2)}</h4>
              <p className=" mb-0">Funds available for trading</p>
            </div>
          </div>
        </div>

        {/* Invested Amount */}
        <div className="summary-card">
          <div className="">
            <div className="">
              <h6 className="">Invested Amount</h6>
              <h4 className="mb-2">₹{investedAmount.toFixed(2)}</h4>
              <p className=" mb-0">Amount currently invested</p>
            </div>
          </div>
        </div>

        {/* Total Balance */}
        <div className="summary-card">
          <div className="">
            <div className="">
              <h6 className="">Total Balance</h6>
              <h4 className="mb-2">₹{totalBalance.toFixed(2)}</h4>
              <p className=" mb-0">Overall account balance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Funds;
