import { holdings, positions } from "../../data/data";

import BalanceCard from "./BalanceCard";
import PerformanceCard from "./PerformanceCard";
import AllocationCard from "./AllocationCard";

export default function Summary() {
  // total invested = sum(avg * qty)
  const investedAmount = holdings.reduce(
    (total, stock) => total + stock.avg * stock.qty,
    0
  );

  // current value = sum(price * qty)
  const currentValue = holdings.reduce(
    (total, stock) => total + stock.price * stock.qty,
    0
  );

  // profit / loss
  const totalPnL = currentValue - investedAmount;

  // counts
  const totalHoldings = holdings.length;
  const totalPositions = positions.length;

  // simple assumption (dummy wallet logic)
  const availableBalance = 50000 - investedAmount;

  return (
    <div className="container-fluid ">
      <h2 className="mb-4 text-center">Account Summary</h2>

      <div className="card-grid">
        <div className="summary-card ">
          <BalanceCard
            availableBalance={availableBalance}
            investedAmount={investedAmount}
          />
        </div>

        <div className="summary-card">
          <PerformanceCard currentValue={currentValue} totalPnL={totalPnL} />
        </div>

        <div className="summary-card">
          <AllocationCard
            totalHoldings={totalHoldings}
            totalPositions={totalPositions}
          />
        </div>
      </div>
    </div>
  );
}
