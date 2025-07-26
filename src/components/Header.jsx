import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO_URL } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  useEffect(() => {
   const unSubscribe =  onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return ()=> unSubscribe();
  }, []);

  return (
    <div className="absolute w-screen py-2 px-7 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-50"
        src={LOGO_URL}
        alt="logo"
      />
      {user && (
        <div className="m-5">
          <img className="w-9 rounded-3xl" src={user.photoURL} alt="logo-" />
          <button onClick={handleSignout} className="text-white">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
