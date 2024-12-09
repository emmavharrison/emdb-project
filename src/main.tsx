import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { NavBar } from "./app/components/navigation/NavBar.tsx";
import { LandingPage } from "./app/pages/LandingPage/LandingPage.tsx";
import { CollectionsPage } from "./app/pages/Collections/Collections.tsx";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
        </Routes>
      </BrowserRouter>
    </Authenticator>
  </React.StrictMode>
);
