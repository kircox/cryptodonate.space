import React from "react";
import { Text } from "@nextui-org/react";
import { useDonationStore } from "../../../stores/donationStore";

export function FormHeader(): JSX.Element {
  const { recipientUserCollection } = useDonationStore((state) => state);
  return (
    <Text
      h1
      size={50}
      css={{
        marginRight: "$5",
        marginTop: "$10",
        alignItems: "center",
        textGradient: "45deg, $blue500 -20%, $pink500 50%",
      }}
      weight="bold"
    >
      Donate to {recipientUserCollection?.data()?.username}
    </Text>
  );
}
