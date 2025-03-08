import { motion } from "framer-motion";
import React from "react";
import { ButtonClick, slideIn } from "../animations";
import { dispatch } from "gatsby-cli/lib/reporter/redux";
import { setCartOff } from "../context/actions/displayCartAction";
import { BiChevronsRight } from "../assets/icons";

const Cart = () => {
  return (
    <motion.div
      {...slideIn}
      className="fixed z-50 top-0 right-0 w-300 md:w-508 backdrop-blur-md shadow-md h-screen"
    >
      <div className="w-full flex items-center justify-between py-4 pb-12 px-3">
        <motion.i
          {...ButtonClick}
          className="cusror-pointer"
          onClick={() => dispatch(setCartOff())}
        >
          <BiChevronsRight className="text-[50-px] text-textColor" />
        </motion.i>
      </div>
    </motion.div>
  );
};

export default Cart;
