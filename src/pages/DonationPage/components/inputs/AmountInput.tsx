/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { Input } from "@nextui-org/react";
import React from "react";
import { useDonationStore } from "../../../../stores/donationStore";

export function AmountInput(): JSX.Element {
  const { setUsdAmount } = useDonationStore((state) => state);

  return (
    <Input
      onChange={(e) => [
        // setAmount(USDtoBTC(e.target.value)),
        setUsdAmount(Number(e.target.value)),
      ]}
      size="md"
      width="300px"
      type={"number"}
      labelLeft={"$"}
    />
  );
}
