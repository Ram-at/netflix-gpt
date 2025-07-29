import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LANGUAGE_SUPPORTED, LOGO_URL } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptToggleSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
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

    const handleClick = ()=>{
      dispatch(toggleGptSearchView())
    }
      const handleLanguageChange = (e)=>{
        dispatch(changeLanguage(e.target.value))
      }
  return (
 <div className="fixed top-0 left-0 w-full z-[1000] bg-black/30 backdrop-blur-md shadow-lg py-3 px-4 sm:px-10 flex items-center justify-between border-b border-purple-500/20">
  {/* Logo & Title */}
  <div className="flex items-center gap-3 sm:gap-6">
    <span className="text-red-600 text-2xl sm:text-3xl font-black tracking-widest drop-shadow-[0_2px_4px_rgba(255,0,0,0.5)]">
      NETFLIX
    </span>
  </div>

  {/* User Section */}
  {user && (
    <div className="flex items-center gap-3 sm:gap-5">
      {/* Language Selector and -show only if the gpt search is true else not*/}
     {showGptSearch &&  <select
        className="px-3 py-2 rounded-lg bg-black/50 border border-purple-400/40 text-white text-sm focus:outline-none hover:border-purple-300"
        defaultValue="en"
        onChange={handleLanguageChange}
      >
       
        { LANGUAGE_SUPPORTED.map(lang => (
          <option key={lang.identifier} value={lang.identifier}>
            {lang.name}
          </option>
        ))}
      </select>}

      {/* GPT Search */}
      <button
        className="py-2 px-5 bg-gradient-to-r from-purple-800 via-purple-600 to-pink-500 text-white font-semibold rounded-full shadow-md hover:scale-105 active:scale-95 transition-transform duration-150 cursor-pointer"
        onClick={handleClick}
      >
       {showGptSearch?"Homepage":" GPT Search"}
      </button>

      {/* User Avatar */}
      <img
        src={user.photoURL }
       
        alt="User"
        title={user.displayName || "User"}
        className="w-10 h-10 rounded-full border-2 border-purple-500 object-cover shadow-md hover:scale-105 transition-transform duration-150"
      />

      {/* Sign Out */}
      <button
        onClick={handleSignout}
        className="px-4 py-2 text-sm sm:text-base bg-black/60 text-white border border-purple-500/60 rounded-full hover:bg-purple-700 hover:border-purple-300 transition-all duration-200"
      >
        Sign out
      </button>
    </div>
  )}
</div>



  );
};

export default Header;
