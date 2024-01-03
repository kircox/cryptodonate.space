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
  Link,
} from "@nextui-org/react";
import { Flex } from "@adobe/react-spectrum";

interface CreateAccountCardProps {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setCreateUser: (createUser: boolean) => void;
  createUserWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<void>;
  email: string;
  password: string;
}

export function CreateAccountCard(props: CreateAccountCardProps): JSX.Element {
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
              textGradient: "0deg, $green800 -40%, $green500 50%",
            }}
          >
            Create account
          </Text>
        </Container>
        <Spacer y={1} />

        <Input
          status="default"
          label="Email"
          bordered
          value={props.email}
          onChange={(e) => {
            props.setEmail(e.target.value);
          }}
        />
        <Spacer y={1} />
        <Input.Password
          bordered
          label="Password"
          type="password"
          value={props.password}
          onChange={(e) => {
            props.setPassword(e.target.value);
          }}
        />
        <Spacer y={1} />

        <Flex
          direction={"column"}
          justifyContent={"space-around"}
          alignItems="center"
        >
          <Spacer y={2} />

          <Button
            onClick={() => {
              props.createUserWithEmailAndPassword(props.email, props.password);
            }}
            rounded
            css={{
              fontSize: "$md",
              fontWeight: "$bold",
            }}
          >
            Create
          </Button>
        </Flex>

        <Container css={{ width: "max-content" }} justify="center"></Container>
      </Card>
      <Spacer />
      <Link
        block
        onClick={() => {
          props.setCreateUser(false);
        }}
      >
        ← Sign in with Email
      </Link>
    </>
  );
}
