import React, { useState, useEffect, useCallback } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ListingItem from "../components/ListingItem";
import useHttp from "../hooks/useHttp";
import { BASE_URL } from "../urls";
import { listingActions } from "../store/slices/listing-slice";
const ListingPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { items: listings } = useSelector((state) => state.listing);
  const { items: categories } = useSelector((state) => state.category);
  const param = useParams();

  const { isPending, httpError, fetchData } = useHttp();
  const dispatch = useDispatch();
  const handleFetchData = useCallback(
    async (data) => {
      console.log(data.length);
      if (data) {
        const datalist = Object.keys(data).map((key) => ({
          ...data[key],
          dbId: key,
        }));
        dispatch(listingActions.setListings(datalist));
      } else {
        dispatch(listingActions.setListings([]));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData(`${BASE_URL}listing.json`, {}, handleFetchData);
  }, [handleFetchData, fetchData]);

  useEffect(() => {
    setData(listings);
    if (param && param.cat) {
      console.log("category set");
      setSelectedCategories([param.cat]);
    }
  }, [listings, param]);

  useEffect(() => {
    handleFilter();
  }, [minPrice, maxPrice, selectedCategories, data]);

  const handleFilter = () => {
    let filtered = data.filter(
      (item) =>
        item.price >= minPrice &&
        item.price <= maxPrice &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(item.category))
    );
    setFilteredData(filtered);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div>
      <Container className="mt-4 d-flex">
        {/* Filter Section */}
        <div className="filter-section me-5">
          <h4>Filter</h4>

          <Form.Group className="mb-3">
            <Form.Label>Min Price</Form.Label>
            <Form.Control
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Max Price</Form.Label>
            <Form.Control
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </Form.Group>

          <h5>Category</h5>
          {categories.map((category) => (
            <Form.Check
              key={category.dbId}
              type="checkbox"
              label={category.name}
              checked={selectedCategories.includes(category.name)}
              onChange={() => handleCategoryChange(category.name)}
            />
          ))}

          <Button variant="primary" onClick={handleFilter} className="mt-3">
            Apply Filters
          </Button>
        </div>

        {/* Results Section */}
        <div className="results-section">
          <h4>Results</h4>
          {filteredData.map((item) => (
            <ListingItem listingItem={item} key={item.dbId} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ListingPage;
