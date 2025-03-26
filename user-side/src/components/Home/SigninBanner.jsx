import React from "react";
import { MdDiscount } from "react-icons/md";
const SigninBanner = () => {
  return (
    <section className="signin-banner">
      <div className="row align-items-center">
        <div className="col-md-8 d-flex">
          <i>
            <MdDiscount />
          </i>
          <p>
            Members save 10% or more on over 100,000 hotels worldwide when
            signed in
          </p>
        </div>
        <div className="col-md-4 element" style={{ textAlign: "end" }}>
          <button className="btn theme-btn-sec">Sign In</button>
        </div>
      </div>
    </section>
  );
};

export default SigninBanner;
