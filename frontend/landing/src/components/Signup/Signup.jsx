import { useState } from "react";
import axios from "axios";
import {  showSuccess } from "../../utils/toast";

export default function SignupSection({ onSwitch }) {
  const [formError, setFormError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setFormError("");

    try {
      setLoading(true);

      const res = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      showSuccess(res.data.message);
      onSwitch();
    } catch (err) {
      setFormError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
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
          <h3>Create account</h3>

          <form onSubmit={handleSignup} noValidate>
            <input
              type="text"
              placeholder="Full name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {formError && (
              <div className="invalid-feedback d-block">{formError}</div>
            )}

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button disabled={loading} type="submit">
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <span className="login-text">
            Already have an account?{" "}
            <a type="button" className="btn btn-link p-0" onClick={onSwitch}>
              Log in
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
