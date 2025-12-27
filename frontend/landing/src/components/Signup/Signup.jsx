export default function SignupSection() {
  return (
    <section className="signup-section">
      <div className="signup-container">
        
        {/* Left content */}
        <div className="signup-content heading-subheading">
          <h1>
            Invest smarter,<br />
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

          <form>
            <input type="text" placeholder="Full name" />
            <input type="email" placeholder="Email address" />
            <input type="password" placeholder="Password" />

            <button type="submit">Get started</button>
          </form>

          <span className="login-text">
            Already have an account? <a href="#">Log in</a>
          </span>
        </div>

      </div>
    </section>
  );
}
