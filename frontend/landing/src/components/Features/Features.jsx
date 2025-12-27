export default function Features() {
  const features = [
    {
      title: "Smart Expense Tracking",
      desc: "Automatically organize your spending so you always know where your money goes.",
    },
    {
      title: "Clear Investment Insights",
      desc: "Understand your investments with clean visuals and easy-to-read summaries.",
    },
    {
      title: "Goal-based Planning",
      desc: "Plan savings and investments around real-life goals, not vague numbers.",
    },
    {
      title: "Secure by Design",
      desc: "Your financial data stays protected with privacy-first security practices.",
    },
  ];

  return (
    <section className="features-section">
      {/* Heading + subheading */}
      <div className="container text-center p-2 features-header heading-subheading">
        <h2>Smart features, designed for real life</h2>
        <p>
          ZenVest focuses on clarity, security, and simplicity—so managing money
          feels natural, not stressful.
        </p>
      </div>

      {/* Features list */}
      <div className="container features-list">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`feature-item ${index % 2 !== 0 ? "reverse" : ""}`}
          >
            <div className="feature-image">
              <span>Dashboard preview coming soon</span>
            </div>

            <div className="feature-text">
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
