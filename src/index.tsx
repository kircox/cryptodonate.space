/* eslint-disable react/no-deprecated */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import "./styles.css";
import Login from "./pages/LoginPage/LoginPage.jsx";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import WorkSpace from "./pages/WorkspacePage/WorkspacePage.jsx";
import { RequireAuth } from "./components/auth/RequireAuth";
import { RequireNoAuth } from "./components/auth/RequireNoAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import { DonationPage } from "./pages/DonationPage/DonationPage.jsx";
import Overlay from "./pages/OverlayPage/OverlayPage.jsx";
import { InitStore } from "./components/utils/InitStore.jsx";
import { firebaseConfig } from "../config";

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

function App(): JSX.Element {
  const [user] = useAuthState(auth);
  return (
    <>
      {user !== null && <InitStore user={user} />}
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
            element={<RequireAuth>{<WorkSpace />}</RequireAuth>}
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
