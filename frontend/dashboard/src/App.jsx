// import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
// import Summary from "./components/Summary";
// import Orders from "./components/Orders";
// import Holdings from "./components/Holdings";
// import Positions from "./components/Positions";
// import Funds from "./components/Funds";

function App() {
  return (
    <>
      <NavBar />
      <Dashboard />
      {/* <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/holdings" element={<Holdings />} />
        <Route path="/positions" element={<Positions />} />
        <Route path="/funds" element={<Funds />} />
      </Routes> */}
    </>
  );
}

export default App;
