import { store } from "./utils/appStore.js";
import { Provider } from "react-redux";

import Body from "./components/Body";

function App() {
  return (
    <>
      
      <Provider store={store}>
        <Body />
      </Provider>
    </>
  );
}

export default App;
