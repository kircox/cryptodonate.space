import React from "react";
import { View, Flex } from "@adobe/react-spectrum";

import { Container } from "@nextui-org/react";

import { SignOutButton } from "../Header/SignOutButton";
import { CopyPageLinkButton } from "../buttons/CopyPageLinkButton";
import { CopyOverlayLinkButton } from "../buttons/CopyOverlayLinkButton";

import { Logo } from "../../../../components/shared/Logo";

export function DesktopHeader() {
  return (
    <>
      <View marginTop={"size-75"}>
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
                <CopyOverlayLinkButton size="xs" />
                <CopyPageLinkButton />
                <View marginEnd={"size-300"}>
                  <SignOutButton />
                </View>
              </Flex>
            </View>
            <View marginStart={"size-300"}>
              <Logo fontSize={28} pageLink={true} />
            </View>
          </Flex>
        </Container>
      </View>
    </>
  );
}
