export default function Hero({ onCTAclick }) {
  return (
    <section className="hero-section " style={{ padding: "0" }}>
      <div className="container p-2 text-center heading-subheading">
        <h1>
          Invest smart , <span>Grow smarter</span>
        </h1>
        <p>
          Turn smart investing into smarter growth — with tools built to amplify
          your wealth.
        </p>
      </div>
      <div className="container text-center p-2">
        <button
          className="btn btn-outline-primary"
          onClick={onCTAclick}
        >
          Get Started Now
        </button>
      </div>
      <div className="container p-2 text-center">
        <img
          src="/assets/images/hero-img.png"
          alt="Hero Image"
          className="img-fluid"
        />
      </div>
    </section>
  );
}
