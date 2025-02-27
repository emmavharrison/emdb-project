import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

import "@aws-amplify/ui-react/styles.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { NavBar } from "./app/components/navigation/NavBar.tsx";
import { LandingPage } from "./app/pages/LandingPage/LandingPage.tsx";
import { CollectionsPage } from "./app/pages/Collections/Collections.tsx";
import { ProtectedRoute } from "./app/components/navigation/ProtectedRoute.tsx";
import { Authenticator } from "@aws-amplify/ui-react";
import { Home } from "./app/pages/Home/Home.tsx";
import { SignIn } from "./app/pages/SignIn/SIgnIn.tsx";
import { ProfilePage } from "./app/pages/Profile/Profile.tsx";
import { ResultsPage } from "./app/pages/Results/Results.tsx";
import { ReviewsPage } from "./app/pages/Reviews/Reviews.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

Amplify.configure(outputs);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator.Provider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results/:searchedMovie"
            element={
              <ProtectedRoute>
                <QueryClientProvider client={queryClient}>
                  <ResultsPage />
                </QueryClientProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/collections"
            element={
              <ProtectedRoute>
                <CollectionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <ProtectedRoute>
                <ReviewsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Authenticator.Provider>
  </React.StrictMode>
);
