import React from "react";
import { Textarea } from "@nextui-org/react";
import { useDonationStore } from "../../../../stores/donationStore";
export function MessageInput(): JSX.Element {
  const { setMessage } = useDonationStore((state) => state);
  return (
    <Textarea
      onChange={(e) => {
        setMessage(e.target.value);
      }}
      width="300px"
      placeholder="write your message"
      minRows={3}
      maxRows={6}
    />
  );
}
