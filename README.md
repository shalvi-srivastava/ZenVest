# ZenVest — Simulated Trading Platform

ZenVest is a **simulation-based trading platform** designed to model the internal behavior of a trading system, with a primary focus on backend logic, rule enforcement, and user-isolated portfolio management.

Instead of relying on live market data or payment flows, the project emphasizes **correctness, predictability, and explainable system behavior**.

---

## 🚀 Core Features

### Authentication & Access Control
- JWT-based authentication
- Protected frontend routes and backend APIs
- Users must explicitly log in after signup before accessing the dashboard

**Why login after signup?**  
This mirrors real-world authentication flows and ensures:
- token generation is handled only during login
- session logic remains consistent
- signup and authentication responsibilities stay clearly separated

---

## 💰 User Balance Management

### Default Account Balance
Each newly registered user is initialized with a **default virtual balance**.

**Reasoning:**
- The application does not include add-funds or transaction modules
- Providing a default balance allows new users to immediately place simulated trades
- Keeps the focus on trading logic rather than payment workflows

This balance is **virtual and simulation-only**, used strictly for enforcing order constraints.

---

## 🧠 Order Execution Logic (Primary Focus)

Orders are treated as **requests**, not simple CRUD entries.

### BUY Orders
- Validate sufficient available balance
- Create a new holding or update an existing one
- Average price recalculation handled server-side

### SELL Orders
- Validate stock ownership
- Prevent selling more quantity than owned
- Automatically remove holdings when quantity reaches zero

All portfolio changes occur **only after rule validation**, ensuring data consistency.

---

## 📊 Portfolio Representation

### Holdings
- Reflect the real-time result of executed trades
- Fully user-isolated
- Displayed using:
  - a **vertical bar chart** for quick distribution insights
  - a **detailed table** for precise quantity and price information

Holdings always remain consistent with executed orders.

---

### Watchlist (Static by Design)

The watchlist is populated using static data sourced from `data.js`.

**Why static data?**
- The watchlist is used only for UI exploration and familiarity
- No live market dependency keeps the system deterministic
- Prevents API reliability, rate-limit, and pricing inconsistencies
- Allows focus on backend trade execution rather than data fetching

The watchlist does **not** affect trading logic or portfolio calculations.

---

### Positions (Intentional Scope Limitation)

Positions are modeled as a **derived concept** and are **not created for standard delivery-based trades**.

Current behavior:
- ZenVest supports only delivery-style simulated trades
- No intraday or F&O logic is implemented
- Therefore, most users will see **“No open positions”**, which is expected and correct

This design keeps the data model clean while allowing future extensibility.

---

## 🧠 Key Engineering Decisions

### Why No Live Market APIs?
Live stock APIs were intentionally avoided to:
- focus on **business rule enforcement**
- remove third-party dependency risks
- keep system behavior predictable and testable
- avoid rate limits and inconsistent market states

The project prioritizes **how a trading system behaves**, not how prices are fetched.

---

### Orders vs Storage
Orders act as controlled entry points that:
- validate all constraints
- mutate holdings only when rules pass
- prevent invalid portfolio states

This separation avoids blind CRUD-based state corruption.

---

## 🛠 Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Data Visualization:** Charts.js (holdings overview)

---

## ⚠️ Assumptions & Limitations

- Prices are mocked for simulation purposes
- No real-time market fluctuations
- No payment or fund transaction system
- No intraday or derivatives trading
- Designed for correctness over scale

All limitations are intentional and documented.

---

## 📌 Project Status

**ZenVest v1 — Completed & Deployed**

Out of scope for v1:
- Live market data integration
- Fund deposit / withdrawal workflows
- Intraday & F&O trading
- P&L calculation
- Order state machine (PENDING / FAILED / EXECUTED)

---

## 🔗 Links

- Live App: https://zenvest-vodw.onrender.com/
- GitHub Repo: https://github.com/shalvi-srivastava/ZenVest/

---

## 👤 Author

Shalvi Srivastava  
B.Tech CSE Student  
MERN Developer
