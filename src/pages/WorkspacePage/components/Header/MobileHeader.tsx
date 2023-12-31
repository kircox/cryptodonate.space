import React from "react";
import { View, Flex } from "@adobe/react-spectrum";
import { Container } from "@nextui-org/react";
import { SignOutButton } from "./SignOutButton";
import { Logo } from "../../../../components/shared/Logo";

export function MobileHeader(): JSX.Element {
  return (
    <>
      <Container
        css={{
          width: "98%",
          backgroundColor: "$accents1",
          borderRadius: "$lg",
          padding: "$2",
        }}
        color={"default"}
      >
        <Flex
          direction={"row-reverse"}
          alignItems="center"
          justifyContent={"space-between"}
          marginY={"size-100"}
          marginStart="size-200"
          marginEnd="size-200"
        >
          <View>
            <Flex>
              <SignOutButton />
            </Flex>
          </View>
          <Flex direction={"row"} justifyContent="center">
            <View justifySelf={"center"}>
              <Logo fontSize={25} pageLink={true} />
            </View>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}
