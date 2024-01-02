/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button, Spacer, Text, Link } from "@nextui-org/react";
import { Flex } from "@adobe/react-spectrum";
import { useAppStore } from "../../../stores/appStore";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Logo } from "../../../components/shared/Logo";
import { TwitterLink } from "../../../components/shared/TwitterLink";
import { SignInWithEmail } from "./SignInWithEmail";

export function LoginForm(): JSX.Element {
  const { auth } = useAppStore((state) => state);

  const login = async (): Promise<void> => {
    // console.log("нажата кнопка Sign in with Google");
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    if (user !== undefined) {
      // console.log(user);
      // console.log(
      // 	"Пользователь  авторизован, переадрессация на WorkSpace"
      // );
    }
  };
  const [signUpWithEmail, setSignUpWithEmail] = useState(false);

  if (!signUpWithEmail) {
    return (
      <>
        <div id="container2">
          <Flex
            direction={"column"}
            justifyContent="center"
            alignItems={"center"}
          >
            <Logo fontSize={50} pageLink={false} />
            <Spacer y={1} />

            <Text h4 css={{ color: "$accents7" }}>
              Receive donations in cryptocurrency with messages from patrons.
            </Text>
            <Text h4 css={{ color: "$accents7" }}>
              Donations alerts during live broadcast with OBS Studio.
            </Text>
          </Flex>
        </div>
        <div id="page">
          <Button shadow rounded onClick={login} id="go">
            {/* <Link to='/signin'>Sign in with Google</Link> */}
            Sign in with Google
          </Button>
          <Spacer />
          <Spacer />

          <Button
            shadow
            rounded
            color={"secondary"}
            onClick={() => {
              setSignUpWithEmail(true);
            }}
            id="go"
          >
            Sign in with Email
          </Button>
          <Spacer y={6} />
          <TwitterLink />
          <div id="footerlogin"></div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id="pageEmail">
          <SignInWithEmail
            backButton={
              <Link
                block
                color={"primary"}
                onClick={() => {
                  setSignUpWithEmail(false);
                }}
              >
                ← Сhoose a login method
              </Link>
            }
          />
        </div>
      </>
    );
  }
}
