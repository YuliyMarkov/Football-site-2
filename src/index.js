// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Добавляем PersistGate
import App from "./App";
import store, { persistor } from "./Store/Store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> {/* Используем PersistGate */}
      <App />
    </PersistGate>
  </Provider>
);
