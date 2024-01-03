import React, { useState, useEffect } from "react";
import { Link } from "@nextui-org/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDonationStore } from "../../../stores/donationStore";

export function Amount(): JSX.Element {
  const [copied, setCopied] = useState(false);
  const { btcAmount } = useDonationStore((state) => state);
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  return (
    <CopyToClipboard
      text={btcAmount.toString()}
      onCopy={() => {
        setCopied(true);
      }}
    >
      {copied ? (
        <Link block color="success">
          Copied!
        </Link>
      ) : (
        <Link
          block
          color="success"
          //  href='http://localhost:3000/'
        >
          {btcAmount}
        </Link>
      )}
    </CopyToClipboard>
  );
}
