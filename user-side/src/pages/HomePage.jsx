import React, { useCallback, useEffect, useState } from "react";
import ListCard from "../components//ListCard";
import CategoryFilter from "../components//CategoryFilter";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { listingActions } from "../store/slices/listing-slice";
import { categoryActions } from "../store/slices/category-slices";
import useHttp from "../hooks/useHttp";
import { BASE_URL } from "../urls";

const dummyListings = [
  {
    id: 1,
    name: "Luxury Villa",
    address: "123 Beachside, Miami",
    price: 200,
    image: "https://via.placeholder.com/300",
    category: "Villa",
  },
  {
    id: 2,
    name: "Cozy Apartment",
    address: "456 Downtown, New York",
    price: 150,
    image: "https://via.placeholder.com/300",
    category: "Apartment",
  },
  {
    id: 3,
    name: "Houseboat Experience",
    address: "789 Riverside, Kerala",
    price: 180,
    image: "https://via.placeholder.com/300",
    category: "Houseboat",
  },
];

const dummyCategories = [
  { id: 1, name: "Villa" },
  { id: 2, name: "Apartment" },
  { id: 3, name: "Houseboat" },
];

const HomePage = () => {
  const { isPending, httpError, fetchData } = useHttp();
  const dispatch = useDispatch();
  const { items: listings } = useSelector((state) => state.listing);
  const { items: categories } = useSelector((state) => state.category);
  const catData = useSelector((state) => state.category.items);
  const handleFetchData = useCallback((data) => {
    console.log(data.lenght);
    if (data) {
      const datalist = [];
      const keys = Object.keys(data);
      keys.forEach((key) => {
        datalist.push({ ...data[key], dbId: key });
      });
      console.log(datalist);
      dispatch(listingActions.setListings(datalist));
      dispatch(categoryActions.setCategory(catData));
    } else {
      dispatch(categoryActions.setCategory([]));
      dispatch(categoryActions.setCategory(catData));
    }
  }, []);

  useEffect(() => {
    fetchData(`${BASE_URL}listing.json`, {}, handleFetchData);
  }, [fetchData, handleFetchData, dispatch]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredListings = selectedCategory
    ? listings.filter((listing) => listing.category === selectedCategory)
    : listings;

  return (
    <div>
      <CategoryFilter
        categories={categories}
        onSelectCategory={setSelectedCategory}
      />
      <div className="container mt-4 d-flex flex-wrap gap-4">
        {filteredListings.map((listing) => (
          <ListCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
