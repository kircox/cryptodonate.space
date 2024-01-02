/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React from "react";
import { Input } from "@nextui-org/react";
import { useDonationStore } from "../../../../stores/donationStore";

export function NameInput(): JSX.Element {
  const { setSenderName } = useDonationStore((state) => state);
  return (
    <Input
      onChange={(e) => setSenderName(e.target.value)}
      size="md"
      width="300px"
      type={"text"}
      labelLeft={"Name"}
    />
  );
}
