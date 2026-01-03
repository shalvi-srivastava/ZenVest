import { useState, useEffect } from "react";
import axios from "axios";

function TradeModal({ show, onClose, stock, type, marketPrice }) {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  // Autofill market price
  useEffect(() => {
    if (marketPrice) {
      setPrice(marketPrice);
    }
  }, [marketPrice]);

  if (!show) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await axios.post(
        "/dashboard/api/newOrder",
        {
          name: stock,
          qty: qty,
          price: price,
          mode: type,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setLoading(false);
      onClose();
    } catch (err) {
      setLoading(false);

      if (err.response && err.response.data?.error) {
        alert(err.response.data.error);
      } else {
        alert("Order failed");
      }
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {type} {stock}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <p>
              You are about to <strong>{type.toLowerCase()}</strong>{" "}
              <strong>{stock}</strong>.
            </p>

            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price (per share)</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <p>Total = {price * qty}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className={`btn ${type === "BUY" ? "btn-success" : "btn-danger"}`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Processing..." : type}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradeModal;
