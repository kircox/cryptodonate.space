/* eslint-disable react/no-deprecated */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import Favicon from "react-favicon";
import "./styles.css";

import Login from "./pages/LoginPage/LoginPage.jsx";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import WorkSpace from "./pages/WorkspacePage/WorkspacePage.jsx";
import { RequireAuth } from "./components/routing/auth/RequireAuth.jsx";
import { RequireNoAuth } from "./components/routing/auth/RequireNoAuth.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { DonationPage } from "./pages/DonationPage/DonationPage.jsx";
import Overlay from "./pages/OverlayPage/OverlayPage.jsx";
import icon from "../public/Favicon.ico";
import { InitStore } from "./components/utils/InitStore.jsx";
import { firebaseConfig } from "../config";
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Favicon url={icon} />
      {user && <InitStore user={user} />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireNoAuth>
                <Login />
              </RequireNoAuth>
            }
          />

          <Route
            path="/workspace"
            element={<RequireAuth>{user && <WorkSpace />}</RequireAuth>}
          />
          <Route path="user/:id" element={<DonationPage />} />
          <Route
            path="overlay/:id"
            element={
              <div id="overlay">
                <Overlay />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
ReactDOM.render(<App />, document.getElementById("app"));
