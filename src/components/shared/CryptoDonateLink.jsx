import { Link } from "@nextui-org/react";

import React from "react";

export function CryptoDonateLink() : JSX.Element {
  return (
    <Link
      css={{}}
      icon
      block
      color="error"
      onClick={() => window.open("http://cryptodonate.space/")}
    >
      CryptoDonate
    </Link>
  );
}
