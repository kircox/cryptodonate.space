import React from "react";
import { Button } from "@nextui-org/react";
import GlobeOutline from "@spectrum-icons/workflow/GlobeOutline";
import { useAppStore } from "../../../../stores/appStore.js";

export function OpenPageButton(): JSX.Element {
  const user = useAppStore((state) => state.user);
  return (
    <Button
      onClick={() => window.open("http://cryptodonate.space/user/" + user?.uid)}
      css={{
        marginRight: "$9",
      }}
      color={"gradient"}
      auto
      size="xs"
    >
      <GlobeOutline marginEnd={"size-100"} />
      Go to Donate Page
    </Button>
  );
}
