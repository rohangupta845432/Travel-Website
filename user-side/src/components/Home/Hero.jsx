import React from "react";
import heroImage from "../../../public/hero.jpg";
function Hero() {
  return (
    <section className="hero mt-3">
      <img className="hero-img" src={heroImage} />
      <div className="hero-text-sec">
        <h2 className="hero-text-header">The Annual Holiday Event</h2>
        <p className="hero-text-para">
          Sign in or join for free! Members save 25% or more on selected hotels
          until 31 Mar. Stay by 8 Sep 2025.
        </p>
        <button className="btn theme-btn">Unlock Deal</button>
      </div>
    </section>
  );
}

export default Hero;
