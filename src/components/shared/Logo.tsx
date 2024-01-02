/* eslint-disable react/prop-types */
import React from "react";
import { View, Flex, ActionButton } from "@adobe/react-spectrum";
import GlobeOutline from "@spectrum-icons/workflow/GlobeOutline";
import { Link } from "@nextui-org/react";
import { useAppStore } from "../../stores/appStore.js";

interface LogoProps {
  fontSize: string;
  pageLink: boolean;
}

export function Logo(props: LogoProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  const user = useAppStore((state) => state.user);

  return (
    <Flex direction={"row"} justifyContent="center">
      <View justifySelf={"center"}>
        <Link
          color={"error"}
          css={{
            fontSize: props.fontSize,
            fontWeight: "$bold",
          }}
        >
          CryptoDonate
        </Link>
      </View>
      {props.pageLink && (
        <>
          <ActionButton
            marginStart={"size-125"}
            isQuiet
            onPress={() =>
              window.open("http://cryptodonate.space/user/" + user?.uid)
            }
          >
            <GlobeOutline />
          </ActionButton>
        </>
      )}
    </Flex>
  );
}
