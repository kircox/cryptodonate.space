/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Button,
  Spacer,
  Text,
  Input,
  Card,
  Container,
} from "@nextui-org/react";
import { Flex } from "@adobe/react-spectrum";

interface SignInCardProps {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setCreateUser: (createUser: boolean) => void;
  signInWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<void>;
  email: string;
  password: string;
  backButton: JSX.Element;
}
export function SignInCard(props: SignInCardProps): JSX.Element {
  return (
    <>
      <Card
        css={{
          padding: "$10",
          width: "fit-content",
          backgroundColor: "$accents1",
        }}
      >
        <Container css={{ width: "max-content" }} justify="center">
          <Text
            h2
            css={{
              fontWeight: "$bold",
              textGradient: "0deg, $pink800 -40%, $pink500 50%",
            }}
          >
            Sign in with Email
          </Text>
        </Container>
        <Spacer y={3} />

        <Input
          status="default"
          labelPlaceholder="Email"
          bordered
          value={props.email}
          onChange={(e) => {
            props.setEmail(e.target.value);
          }}
        />
        <Spacer y={2.5} />
        <Input.Password
          bordered
          labelPlaceholder="Password"
          type="password"
          value={props.password}
          onChange={(e) => {
            props.setPassword(e.target.value);
          }}
        />
        <Spacer y={3} />
        <Flex justifyContent={"space-around"} alignItems="center">
          <Button
            css={{
              fontSize: "$sm",
              fontWeight: "$bold",
            }}
            rounded
            color={"default"}
            onClick={async () => {
              await props.signInWithEmailAndPassword(
                props.email,
                props.password,
              );
            }}
          >
            Sign in
          </Button>
        </Flex>

        <Container css={{ width: "max-content" }} justify="center">
          <Spacer y={2} />
          <Button
            onClick={() => {
              props.setCreateUser(true);
            }}
            flat
            css={{
              fontSize: "$md",
              fontWeight: "$bold",
            }}
            color="success"
          >
            Create account
          </Button>
        </Container>
      </Card>
      <Spacer />
      {props.backButton}
    </>
  );
}
