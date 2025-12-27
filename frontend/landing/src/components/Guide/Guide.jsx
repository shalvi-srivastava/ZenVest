import { UserPlus, LineChart, Rocket } from "lucide-react";

export default function Guide() {
  return (
    <section className="guide-section">
      <div className="container text-center p-2">
        <div className="heading-subheading">
          <h2>Your Guide to Smart Investment</h2>
          <p className="subtitle">
            Start investing with confidence in just three simple steps.
          </p>
        </div>
        <div className="guide-steps three-steps">
          <div className="guide-card">
            <UserPlus className="guide-icon" size={32} />
            <span className="step-number">01</span>
            <h3>Sign Up</h3>
            <p>
              Create your account in minutes. Set your preferences and financial
              goals with ease.
            </p>
          </div>

          <div className="guide-card">
            <LineChart className="guide-icon" size={32} />
            <span className="step-number">02</span>
            <h3>Explore Stocks</h3>
            <p>
              Discover stocks, track market trends, and learn before you invest
              — all in one place.
            </p>
          </div>

          <div className="guide-card">
            <Rocket className="guide-icon" size={32} />
            <span className="step-number">03</span>
            <h3>Start Investing</h3>
            <p>
              Make informed decisions and begin your investment journey with
              clarity and control.
            </p>
          </div>
        </div>
      </div>

      <div className="container text-center p-2">
        <button className="btn btn-outline-primary">Get Started Now</button>
      </div>
    </section>
  );
}
