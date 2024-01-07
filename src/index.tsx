/* eslint-disable react/no-deprecated */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import { LoginPage } from "./pages/LoginPage/LoginPage.jsx";
import WorkSpace from "./pages/WorkspacePage/WorkspacePage.jsx";
import { AuthControlRoute } from "./components/auth/AuthControlRoute";

import { useAuthState } from "react-firebase-hooks/auth";
import { DonationPage } from "./pages/DonationPage/DonationPage.jsx";
import { OverlayPage } from "./pages/OverlayPage/OverlayPage.jsx";
import { InitStore } from "./components/utils/InitStore.jsx";
import { useAppStore } from "./stores/appStore";

/* Если пользователь уже авторизован и перезагружает страницу компонент рендерится 4 раза
1: Пользователь не авторизован, переадрессация на Login
2: Пользователь авторизован, переадрессация на WorkSpace
3: 
*/

function App(): JSX.Element {
  console.log("re-render");
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
              <AuthControlRoute requireAuth={false}>
                <LoginPage />
              </AuthControlRoute>
            }
          />
          <Route
            path="/workspace"
            element={
              <AuthControlRoute requireAuth={true}>
                <WorkSpace />
              </AuthControlRoute>
            }
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
