export default function AllocationCard({ totalHoldings, totalPositions }) {
  return (
    <div>
      <div>
        <h6 className="text-center mb-3">Allocation</h6>

        <div className="d-flex justify-content-between">
          <span>Holdings</span>
          <strong>{totalHoldings}</strong>
        </div>

        <div className="d-flex justify-content-between mt-2">
          <span>Positions</span>
          <strong>{totalPositions}</strong>
        </div>
      </div>
    </div>
  );
}
