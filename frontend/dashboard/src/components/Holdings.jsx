import { holdings } from "../data/data";

function Holdings() {
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
                <th>Current Price</th>
                <th>Net</th>
                <th>Day</th>
              </tr>
            </thead>

            <tbody>
              {holdings.map((stock) => (
                <tr key={stock.name}>
                  <td className="stock-name">{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>₹{stock.avg}</td>
                  <td>₹{stock.price}</td>

                  <td
                    className={
                      stock.net.startsWith("-")
                        ? "text-danger fw-semibold"
                        : "text-success fw-semibold"
                    }
                  >
                    {stock.net}
                  </td>

                  <td
                    className={
                      stock.day.startsWith("-") ? "text-danger" : "text-success"
                    }
                  >
                    {stock.day}
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

export default Holdings;
