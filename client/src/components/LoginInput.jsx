import React, { useState } from "react";
import { motion } from "framer-motion";
import { FadeInOut } from "../animations";

export const LoginInput = ({
  placeHolder,
  icon,
  inputState,
  inputStateFunc,
  type,
  isSignUp,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <motion.div
      {...FadeInOut}
      className={`flex items-center justify-center gap bg-white bg-opacity-70 backdrop-blur-md rounded-md w-full px-4 py-3 ${
        isFocus ? "shadow-md shadow-red-400" : "shadow-none"
      }`}
    >
      {icon}
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none pl-2"
        value={inputState}
        onChange={(e) => inputStateFunc(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </motion.div>
  );
};

export default LoginInput;
