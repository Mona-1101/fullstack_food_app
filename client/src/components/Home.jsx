import { motion } from "framer-motion";
import React from "react";
import { delivery, hero } from "../assets";
import { ButtonClick, staggerFadeInOut } from "../animations";
import { randomData } from "../utils/styles";
const Home = () => {
  return (
    <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col items-start justify-start gap-6">
        <div className="px-3 py-1 flex items-center justify-center gap-1 bg-orange-100 rounded-full">
          <p className="text-base font-semibold text-orange-500">
            Free Delivery
          </p>
          <div className="w-5 h-5 flex item-center justify-center rounded-full bg-primary shadow-md">
            <img
              src={delivery}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <p className="text-[5px] text-headingColor md:text-[30px] font-sans font-extrabold tracking-wider">
          The Fastest Delivery in
          <span className="text-orange-600"> Your City</span>
        </p>

        <p className="text-textColor text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <motion.button
          {...ButtonClick}
          className="bg-gradient-to-bl from-orange-400 to-orange-600 px-4 py-2 text-black text-base font-semibold rounded-xl"
        >
          Order Now
        </motion.button>
      </div>

      <div className="py-2 flex-1 items-center justify-end relative w-full">
        <img
          className="absolute top-0 right-0 bottom-0 md:-right-12 w-full h-[300px] md:w-auto md:h-[480px]"
          src={hero}
          alt=""
        />

        <div className="w-full md:w-508 ml-10 flex flex-wrap items-left justify-center gap-4 gap-y-14">
          {randomData &&
            randomData.map((data, i) => (
              <motion.div
                key={i}
                {...staggerFadeInOut(i)}
                className="w-32 h-36 md:h-auto md:w-190 p-4 bg-transparent backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img
                  src={data.imageURL}
                  className="w-12 h-12 md:w-32 md:h-32 md:-mt-16 object-contain"
                  alt=""
                />
                <p className="text-sm lg:text-xl font-semibold text-textColor">
                  {data.product_name.slice(0, 14)}
                </p>
                <p className="text-[12px] text-center md:text-base text-lighttextGray font-semibold capitalize">
                  {data.product_category}
                </p>
                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600">$</span>
                  {data.product_price}
                </p>
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
