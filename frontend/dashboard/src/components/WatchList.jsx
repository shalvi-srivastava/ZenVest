import { useState } from "react";
import TradeModal from "./TradeModal";
import { watchlist } from "../data/data";
import { Tooltip, Grow } from "@mui/material";

function WatchList({ onOrderSuccess }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState("");
  const [tradeType, setTradeType] = useState("BUY");
  const [selectedPrice, setSelectedPrice] = useState(0);

  const openTradeModal = (stock, type, price) => {
    setSelectedStock(stock);
    setTradeType(type);
    setSelectedPrice(price);
    setShowModal(true);
  };

  const closeTradeModal = () => setShowModal(false);

  return (
    <div
      style={{
        width: "360px",
        borderRight: "1px solid #fff",
        padding: "12px",
        minHeight: "100vh",
        position: "relative",
      }}
      className="watchlist-container"
    >
      <h3 className="text-center mb-3 mt-3">Explore Stocks</h3>
      {watchlist.map((stock) => (
        <div
          key={stock.name}
          className="watchlist-item"
          style={{
            padding: "8px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          <div className="item-main">
            {/* LEFT: Stock name */}
            <span className="stock-name">{stock.name}</span>

            {/* MIDDLE: Hover actions */}
            <div className="mid-actions">
              <Tooltip title="Buy" arrow TransitionComponent={Grow}>
                <button
                  className="action-btn buy"
                  onClick={() => openTradeModal(stock.name, "BUY", stock.price)}
                >
                  Buy
                </button>
              </Tooltip>
              <Tooltip title="Sell" arrow TransitionComponent={Grow}>
                <button
                  className="action-btn sell"
                  onClick={() =>
                    openTradeModal(stock.name, "SELL", stock.price)
                  }
                >
                  Sell
                </button>
              </Tooltip>
            </div>

            {/* RIGHT: Price + % */}
            <div className="price-info text-end">
              <div>₹{stock.price}</div>
              <div
                style={{
                  fontSize: "12px",
                  color: stock.isDown ? "#e53935" : "#43a047",
                }}
              >
                {stock.percent}
              </div>
            </div>
          </div>
        </div>
      ))}

      <TradeModal
        show={showModal}
        onClose={closeTradeModal}
        stock={selectedStock}
        type={tradeType}
        marketPrice={selectedPrice}
        onOrderSuccess={onOrderSuccess}
      />
    </div>
  );
}

export default WatchList;
