import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import WatchList from "./WatchList";
import Summary from "./Summary/Summary";
import Orders from "./Orders";
import Holdings from "./Holdings";
import Positions from "./Positions";
import Funds from "./Funds";

function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshDashboard = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="dashboard-container d-flex">
      <WatchList onOrderSuccess={refreshDashboard} />

      <div className="content flex-grow-1 p-4">
        <Routes>
          <Route path="/" element={<Summary refreshKey={refreshKey} />} />
          <Route path="/orders" element={<Orders refreshKey={refreshKey} />} />
          <Route
            path="/holdings"
            element={<Holdings refreshKey={refreshKey} />}
          />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds refreshKey={refreshKey} />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
