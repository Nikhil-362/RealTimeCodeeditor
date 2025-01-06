import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { store } from "./Redux/store";
import { Provider } from "react-redux";
import store, { persistor } from "./Redux/presist/localst";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <main className="dark text-foreground bg-background">
            <App />
          </main>
        </GoogleOAuthProvider>
      </Provider>
    </PersistGate>
  </NextUIProvider>
);
