import React, { useCallback, useEffect, useState } from "react";
import ListCard from "../components//ListCard";
import CategoryFilter from "../components//CategoryFilter";

import { useDispatch, useSelector } from "react-redux";
import { listingActions } from "../store/slices/listing-slice";
import { categoryActions } from "../store/slices/category-slices";
import useHttp from "../hooks/useHttp";
import { BASE_URL } from "../urls";
import ScrollableSlider from "../components/UI/ScrollableSlider";
import Hero from "../components/Home/Hero";
import SigninBanner from "../components/Home/SigninBanner";
import FavouriteStay from "../components/Home/FavouriteStay";
import PopularDestinations from "../components/Home/PopularDestinations";
import HomeBlog from "../components/Home/HomeBlog";

const HomePage = () => {
  const { items: listings } = useSelector((state) => state.listing);
  const { items: categories } = useSelector((state) => state.category);

  return (
    <div>
      <Hero />
      <SigninBanner />
      <FavouriteStay />
      <PopularDestinations />
      <HomeBlog />
      <ScrollableSlider />
    </div>
  );
};

export default HomePage;
