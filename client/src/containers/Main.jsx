import React, { useEffect } from "react";
import { Header, Home, HomeSlider, FilterSection, Cart } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";

export const Main = () => {
  const products = useSelector((state) => state.products);
  const isCart = useSelector((state) => state.isCart);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-white">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-10 pb-24">
        <Home />
        <HomeSlider />
        <FilterSection />
      </div>

      {isCart && <Cart />}
    </main>
  );
};

export default Main;
