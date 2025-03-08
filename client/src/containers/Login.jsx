import React, { useState } from "react";
import { loginBg, logo } from "../assets";
import { LoginInput } from "../components";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons/index.js";
import { motion } from "framer-motion";
import { ButtonClick } from "../animations";
import { useNavigate } from "react-router-dom";
import { setUserDetails } from "../context/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { alertInfo, alertWarning } from "../context/actions/alertActions";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";

export const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  //const alert = useSelector((state) => state.alert);

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data));
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  const signUpWithEmailPass = async () => {
    if (userEmail === "" || password === "" || confirm_password === "") {
      // alert message
      dispatch(alertInfo("Required field should not be empty!"));
    } else {
      if (password === confirm_password) {
        setUserEmail("");
        setPassword("");
        setConfirm_password("");
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          password
        ).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        });
        //console.log("Equal");
      } else {
        // alert message
        dispatch(alertWarning("Password doesn't match!"));
      }
    }
  };

  const signInWithEmailPass = async () => {
    if (userEmail !== "" && password !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    } else {
      //alert message
      dispatch(alertWarning("Password doesn't match!"));
    }
  };

  if (user) return navigate("/", { replace: true });

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      {/*Background Image*/}
      <img
        src={loginBg}
        className="w-full h-full object-cover absolute top-0 left-0"
        alt=""
      />

      {/* Contents Box*/}
      <div className="flex flex-col items-center bg-gray-400 bg-opacity-50 w-[80%] md:w-460 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-2">
        {/* Top Logo */}
        <div className="flex items-center justify-start gap-4 w-full">
          <img src={logo} className="w-9" alt="" />
          <p className="text-headingColor font-semibold text-2xl">City</p>
        </div>

        {/* Welcome Text */}
        <p className="text-3xl font-semibold text-headingColor -mt-2">
          {" "}
          Welcome Back{" "}
        </p>
        <p className="text-xl text-textColor -mt-3">
          {!isSignUp ? "Sign In" : "Sign Up"} with following
        </p>

        {/* Input Section */}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeHolder={"Email Here"}
            icon={<FaEnvelope className="text-xl text-textColor" />}
            inputState={userEmail}
            inputStateFunc={setUserEmail}
            type="email"
            isSignUp={isSignUp}
          />

          <LoginInput
            placeHolder={"Password Here"}
            icon={<FaLock className="text-xl text-textColor" />}
            inputState={password}
            inputStateFunc={setPassword}
            type="password"
            isSignUp={isSignUp}
          />

          {isSignUp && (
            <LoginInput
              placeHolder={"Confirm Password Here"}
              icon={<FaLock className="text-xl text-textColor" />}
              inputState={confirm_password}
              inputStateFunc={setConfirm_password}
              type="password"
              isSignUp={isSignUp}
            />
          )}

          {!isSignUp ? (
            <p>
              Don't have an account: {""}
              <motion.button
                {...ButtonClick}
                className="text-red-400 bg-transparent underline"
                onClick={() => setIsSignUp(true)}
              >
                Create One
              </motion.button>
            </p>
          ) : (
            <p>
              Already have an account:{""}
              <motion.button
                {...ButtonClick}
                className="text-red-400 bg-transparent underline"
                onClick={() => setIsSignUp(false)}
              >
                Sign-In here
              </motion.button>
            </p>
          )}

          {/* Button Section */}
          {isSignUp ? (
            <motion.buttonClick
              {...ButtonClick}
              className="w-full text-center px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
              onClick={signUpWithEmailPass}
            >
              Sign Up
            </motion.buttonClick>
          ) : (
            <motion.buttonClick
              {...ButtonClick}
              className="w-full text-center px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
              onClick={signInWithEmailPass}
            >
              Sign In
            </motion.buttonClick>
          )}
        </div>

        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
          <p className="text-white">or</p>
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
        </div>

        <motion.div
          {...ButtonClick}
          className="flex items-center justify-center px-20 py-2 bg-white bg-opacity-50 backdrop-blur-md cursor-pointer rounded-3xl gap-4 "
          onClick={loginWithGoogle}
        >
          <FcGoogle className="text-3xl" />
          <p className="capitalize text-base text-headingColor">
            Sign in with Google
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
