import { useState, useEffect } from "react";
import { watchlist } from "../data/data";
import { Tooltip, Grow } from "@mui/material";
import {
  ShoppingCartOutlined,
  SellOutlined,
  BarChartOutlined,
  MoreHoriz,
} from "@mui/icons-material";

function WatchList() {
  const [width, setWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;

      setWidth(() => {
        const newWidth = e.clientX;
        if (newWidth < 200) return 200;
        if (newWidth > 420) return 420;
        return newWidth;
      });
    };

    const handleMouseUp = () => setIsResizing(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div
      style={{
        width: `${width}px`,
        borderRight: "1px solid #fff",
        padding: "12px",
        minHeight: "100vh",
        position: "relative",
      }}
      className="watchlist-container"
    >
      <div className="search-container mb-2">
        <form class="d-none d-lg-flex mx-auto search-bar">
          <input
            class="form-control"
            type="search"
            placeholder="Search stocks..."
            aria-label="Search"
          />
          <button class="btn" type="submit">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        {/* <span className="counts">{watchlist.length}</span> */}
      </div>

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
                <button className="action-btn buy">Buy</button>
              </Tooltip>

              <Tooltip title="Sell" arrow TransitionComponent={Grow}>
                <button className="action-btn sell">Sell</button>
              </Tooltip>

              <Tooltip title="Analytics" arrow TransitionComponent={Grow}>
                <button className="action-btn">
                  <BarChartOutlined fontSize="small" />
                </button>
              </Tooltip>

              <Tooltip title="More" arrow TransitionComponent={Grow}>
                <button className="action-btn">
                  <MoreHoriz fontSize="small" />
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

      {/* ✅ RESIZER — ONLY ONCE, MAP KE BAHAR */}
      <div
        onMouseDown={() => setIsResizing(true)}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "4px",
          height: "100%",
          cursor: "col-resize",
          backgroundColor: "transparent",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
      />
    </div>
  );
}

export default WatchList;
