import React, { useState } from "react";
import Header from "./Header.jsx";

const Login = () => {
  const [isSignupPage, setIsSignupPage] = useState(true);
  const toggleSign = ()=>{
    setIsSignupPage(!isSignupPage)
  }
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_medium.jpg"
          alt="background"
        />
      </div>
      <form className="text-white w-3/12 bg-black/70 absolute p-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg">
  <h1 className="font-bold pb-4 text-3xl">{isSignupPage?"Sign Up" :"Sign In"}</h1>

 {isSignupPage  && <input className="p-4 my-3 w-full bg-gray-900/80" placeholder="Full Name" /> }
  <input className="p-4 my-3 w-full bg-gray-900/80" placeholder="email" />
  <input className="p-4 my-3 w-full bg-gray-900/80" placeholder="password" />
  <button className="p-4 my-6 bg-red-900 w-full rounded-lg">{isSignupPage?"Sign Up" :"Sign In"}</button>
  <p onClick={()=>toggleSign()} className="p-4 my-4 cursor-pointer">{isSignupPage?"Already a User ? Sign in Now" :"New to Netflix? Sign up Now"}</p>
</form>

    </div>
  );
};

export default Login;
