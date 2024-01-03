import React, { useState, useEffect } from "react";
import { Link } from "@nextui-org/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDonationStore } from "../../../stores/donationStore";

export function Wallet(): JSX.Element {
  const [copied, setCopied] = useState(false);
  const { recipientUserCollection } = useDonationStore((state) => state);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  return (
    <CopyToClipboard
      text={recipientUserCollection?.data()?.wallet}
      onCopy={() => {
        setCopied(true);
      }}
    >
      {copied ? (
        <Link block color="warning">
          Copied!
        </Link>
      ) : (
        <Link
          css={{
            scale: 0.9,
          }}
          block
          color="warning"
          //  href='http://localhost:3000/'
        >
          {recipientUserCollection?.data()?.wallet}
        </Link>
      )}
    </CopyToClipboard>
  );
}
