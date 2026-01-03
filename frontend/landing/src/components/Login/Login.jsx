import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function LoginSection() {
  const [formError, setFormError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

      // navigate("/dashboard"); // 👈 THIS LINE ONLY
    } catch (err) {
      console.log("LOGIN ERROR 👉", err);
      console.log("RESPONSE 👉", err.response);
      console.log("MESSAGE 👉", err.response?.data?.message);

      setFormError(err.response?.data?.message || "Invalid email or password");
    }
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   // setFormError("");

  //   try {
  //     const res = await axios.post("http://localhost:5000/auth/login", {
  //       email,
  //       password,
  //     });

  //     localStorage.setItem("token", res.data.token);
  //     navigate("/dashboard");
  //   } catch (err) {
  //     console.log("LOGIN ERROR", err.response?.data);
  //     setFormError(err.response?.data?.message || "Invalid credentials");
  //   }
  // };

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

          <form noValidate className="needs-validation" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* {formError && (
              <div className="invalid-feedback" style={{ display: "block" }}>
                {formError.toLowerCase().includes("email")
                  ? formError
                  : "Please enter a valid email address."}
              </div>
            )} */}
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
            New here? <Link to="/signup">Create an account</Link>
          </span>
        </div>
      </div>
    </section>
  );
}
