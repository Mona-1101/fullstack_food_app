import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useSelector } from "react-redux";
import { SliderCard } from "../components";

const Slider = () => {
  const products = useSelector((state) => state.products);
  const [fruits, setFruits] = useState(null);
  useEffect(() => {
    setFruits(products?.filter((data) => data.product_category === "fruits"));
    console.log(fruits);
  }, [products]);

  return (
    <div className="w-full pt-[30px]">
      <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={25}
        grabCursor={true}
        className="mySwiper"
      >
        {fruits &&
          fruits.map((data, i) => (
            <SwiperSlide key={i}>
              {" "}
              <SliderCard key={i} data={data} index={i} />{" "}
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;
