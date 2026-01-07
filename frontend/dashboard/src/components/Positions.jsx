function Positions() {
  // EMPTY STATE
  return (
    <div className="container-fluid">
      <h2 className="mb-4 text-center">Positions</h2>

      <div className="card shadow-sm text-center mx-5 empty-card">
        <div className="card-body text-center py-5">
          <h5>No open positions</h5>
          <p>
            Positions are generated when trades meet position-creation criteria.
            Currently, ZenVest focuses on delivery-based simulated trades.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Positions;
