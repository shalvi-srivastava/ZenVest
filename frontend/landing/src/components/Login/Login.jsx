import { useState } from "react";
import axios from "axios";

export default function LoginSection({ onSwitch }) {
  const [formError, setFormError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.assign(window.location.origin + "/dashboard");
    } catch (err) {
      console.log("LOGIN ERROR 👉", err);
      setFormError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <section className="signup-section">
      <div className="signup-container">
        {/* Left content */}
        <div className="signup-content heading-subheading">
          <h1>
            Invest smarter,
            <br />
            <span>not harder.</span>
          </h1>
          <p>
            Create your ZenVest account and learn, track, and grow your
            investments — all in one simple place.
          </p>
        </div>

        {/* Right form */}
        <div className="signup-card">
          <h3>Login to your account</h3>

          <form noValidate onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {formError && (
              <div className="invalid-feedback d-block">{formError}</div>
            )}

            <button type="submit">Login</button>
          </form>

          <span className="signup-text">
            New here?{" "}
            <a className="signup-link" onClick={onSwitch}>
              Create an account
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
