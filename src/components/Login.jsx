import React, { useRef, useState } from "react";
import Header from "./Header.jsx";
import { checkValidInfo } from "../utils/Validate.jsx";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile 
} from "firebase/auth";
import { auth } from "../utils/Firebase.jsx";

import { useDispatch } from "react-redux";
import { PROFILE_URL } from "../utils/constants.js";

const Login = () => {
 
  const dispatch = useDispatch();
  const [isSignupPage, setIsSignupPage] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const name = useRef(null);
  const password = useRef(null);

  const toggleSign = () => {
    setIsSignupPage(!isSignupPage);
  };
  const handleFormValidation = () => {
    const message = checkValidInfo(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return null;

    //signup and signin
    if (isSignupPage) {
      //sign Up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName:  name.current.value,
            photoURL: {PROFILE_URL},
          })
            .then( () => {
              // Profile updated!
             
               
              const {uid,email,displayName , photoURL} = auth.currentUser;
                dispatch(addUser({uid:uid, email:email,displayName:displayName , photoURL:photoURL}))
            })
            .catch((error) => {
              // An error occurred
              // ...
               setErrorMessage( error);
            });

          console.log(user);
         
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "  " + errorMessage);
        });
    } else {
      //sign in
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
         
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "  " + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_medium.jpg"
          alt="background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="text-white w-3/12 bg-black/70 absolute p-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg"
      >
        <h1 className="font-bold pb-4 text-3xl">
          {isSignupPage ? "Sign Up" : "Sign In"}
        </h1>

        {isSignupPage && (
          <input
          ref={name}
            className="p-4 my-3 w-full bg-gray-900/80"
            placeholder="Full Name"
          />
        )}
        <input
          ref={email}
          className="p-4 my-3 w-full bg-gray-900/80"
          placeholder="email"
        />
        <input
          ref={password}
          className="p-4 my-3 w-full bg-gray-900/80"
          placeholder="password"
        />
        <p className="text-red-800 text-lg">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-900 w-full rounded-lg"
          onClick={() => handleFormValidation()}
        >
          {isSignupPage ? "Sign Up" : "Sign In"}
        </button>
        <p onClick={() => toggleSign()} className="p-4 my-4 cursor-pointer">
          {isSignupPage
            ? "Already a User ? Sign in Now"
            : "New to Netflix? Sign up Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
