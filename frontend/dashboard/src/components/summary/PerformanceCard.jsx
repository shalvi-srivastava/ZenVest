export default function PerformanceCard({ currentValue, totalPnL }) {
  const isProfit = totalPnL >= 0;

  return (
    <div>
      <div>
        <h6 className="text-center mb-3">Performance</h6>

        <p className="mb-1 ">Current Value</p>
        <h5 className="mb-3">₹{currentValue.toFixed(2)}</h5>

        <p
          className={`fw-semibold ${isProfit ? "text-success" : "text-danger"}`}
        >
          P/L: ₹{totalPnL.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
