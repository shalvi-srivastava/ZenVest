import { Routes, Route } from "react-router-dom";
import { GeneralContextProvider } from "./GeneralContext";

import WatchList from "./WatchList";
import Summary from "./Summary/Summary";
import Orders from "./Orders";
import Holdings from "./Holdings";
import Positions from "./Positions";
import Funds from "./Funds";

function Dashboard() {
  return (
    <>
      <div className="dashboard-container d-flex">
         <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>

      <div className="content flex-grow-1 p-4">
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
        </Routes>
      </div>
      </div>
    </>
  );
}

export default Dashboard;
