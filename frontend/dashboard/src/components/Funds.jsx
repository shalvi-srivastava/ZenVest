function Funds() {
  // dummy values (later from backend / context)
  const totalBalance = 50000;
  const investedAmount = 18000;
  const availableBalance = totalBalance - investedAmount;

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
