import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { NoticeProvider } from "./context/NoticeContext.jsx";
import Test from "./test.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NoticeProvider>
          {/* <App /> */}
          <Test />
        </NoticeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
