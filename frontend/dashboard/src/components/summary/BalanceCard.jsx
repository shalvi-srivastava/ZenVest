export default function BalanceCard({ availableBalance, investedAmount }) {
  return (
    <div>
      <div>
        <h6 className="text-center mb-3">Balance</h6>

        <h5 className="mb-2">₹{availableBalance.toFixed(2)}</h5>
        <p className=" mb-0">Available balance</p>

        <hr />

        <p className="mb-1 fw-semibold">
          Invested: ₹{investedAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
