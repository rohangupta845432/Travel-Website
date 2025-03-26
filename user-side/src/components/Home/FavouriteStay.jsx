import React, { useCallback, useEffect } from "react";
import FavouriteStayItem from "./FavouriteStayItem";
import ScrollableSlider from "../UI/ScrollableSlider";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../store/slices/category-slices";
import useHttp from "../../hooks/useHttp";
import { BASE_URL } from "../../urls";

const FavouriteStay = () => {
  const { isPending, httpError, fetchData } = useHttp();
  const dispatch = useDispatch();
  const handleFetchCatData = useCallback(
    async (data) => {
      console.log(data.length);
      if (data) {
        const datalist = [];
        const keys = Object.keys(data);
        keys.forEach((key) => {
          datalist.push({ ...data[key], dbId: key });
        });
        console.log(datalist);
        dispatch(categoryActions.setCategory(datalist));
      } else {
        dispatch(categoryActions.setCategory([]));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData(`${BASE_URL}category.json`, {}, handleFetchCatData);
  }, [fetchData, handleFetchCatData]);

  const categories = useSelector((state) => state.category.items);
  if (!categories) {
    return null;
  }
  return (
    <section className="favourite-stay">
      <h3 className="mb-4">Favourite Stay</h3>
      <ScrollableSlider>
        <div className="slider-item">
          <FavouriteStayItem text="All" image="../../public/cat6.png" />{" "}
        </div>
        {categories.map((item) => (
          <div key={item.id} className="slider-item">
            <FavouriteStayItem text={item.name} image={item.imageUrl} />
          </div>
        ))}
      </ScrollableSlider>
    </section>
  );
};

export default FavouriteStay;
