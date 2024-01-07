/* eslint-disable react/no-deprecated */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import { LoginPage } from "./pages/LoginPage/LoginPage.jsx";
import WorkSpace from "./pages/WorkspacePage/WorkspacePage.jsx";
import { RequireAuth } from "./components/auth/RequireAuth";
import { RequireNoAuth } from "./components/auth/RequireNoAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import { DonationPage } from "./pages/DonationPage/DonationPage.jsx";
import { OverlayPage } from "./pages/OverlayPage/OverlayPage.jsx";
import { InitStore } from "./components/utils/InitStore.jsx";
import { useAppStore } from "./stores/appStore";

function App(): JSX.Element {
  console.log("render");
  const { auth } = useAppStore((state) => state);
  const [initialUser] = useAuthState(auth);

  return (
    <>
      {initialUser != null && <InitStore user={initialUser} />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireNoAuth>
                <LoginPage />
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
                <OverlayPage />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
ReactDOM.render(<App />, document.getElementById("app"));
