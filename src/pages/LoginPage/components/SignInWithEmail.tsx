/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Loading } from "@nextui-org/react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Flex } from "@adobe/react-spectrum";
import { useAppStore } from "../../../stores/appStore";
import { CreateAccountCard } from "./CreateAccountCard";
import { SignInCard } from "./SignInCard";

interface SignInWithEmailProps {
  backButton: JSX.Element;
}
export const SignInWithEmail = (props: SignInWithEmailProps): JSX.Element => {
  const { auth } = useAppStore((state) => state);
  const [createUser, setCreateUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [signInWithEmailAndPassword, user2, loading2, error2] =
    useSignInWithEmailAndPassword(auth);
  console.log(user2);
  if (error2 !== undefined) {
    return (
      <Flex direction="column" alignItems={"center"} justifyContent={"center"}>
        <p>Error: {error2.message}</p>
        {props.backButton}
      </Flex>
    );
  }
  if (loading2 !== undefined) {
    return <Loading />;
  }

  if (error !== undefined) {
    return (
      <Flex direction="column" alignItems={"center"} justifyContent={"center"}>
        <p>Error: {error.message}</p>
        {props.backButton}
      </Flex>
    );
  }
  if (loading !== undefined) {
    return <Loading />;
  }
  if (user !== undefined) {
    return (
      <div>
        <p>Registered User: {user?.user?.email}</p>
      </div>
    );
  }
  if (!createUser) {
    return (
      <SignInCard
        setEmail={setEmail}
        setPassword={setPassword}
        setCreateUser={setCreateUser}
        signInWithEmailAndPassword={signInWithEmailAndPassword}
        email={email}
        password={password}
        backButton={props.backButton}
      />
    );
  } else {
    return (
      <CreateAccountCard
        setEmail={setEmail}
        setPassword={setPassword}
        setCreateUser={setCreateUser}
        createUserWithEmailAndPassword={createUserWithEmailAndPassword}
        email={email}
        password={password}
      />
    );
  }
};
