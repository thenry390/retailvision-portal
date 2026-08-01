import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import App from "./App";
import { RetailDataProvider } from "./hooks/useRetailData";
import { AuthProvider } from "./features/auth/AuthContext";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#f4e81a",
          colorBgBase: "#080808",
          colorTextBase: "#f6f4ed",
          borderRadius: 4,
          fontFamily: "Inter, Arial, sans-serif"
        }
      }}
    >
      <BrowserRouter>
        <AuthProvider>
          <RetailDataProvider>
            <App />
          </RetailDataProvider>
        </AuthProvider>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
