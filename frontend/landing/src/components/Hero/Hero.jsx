export default function Hero() {
  return (
    <section className="hero-section">
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
        <button className="btn btn-outline-primary">Get Started Now</button>
      </div>
      <div className="container p-2 text-center">
        <img
          src="/assets/images/image.png"
          alt="Hero Image"
          className="img-fluid"
        />
      </div>
    </section>
  );
}
