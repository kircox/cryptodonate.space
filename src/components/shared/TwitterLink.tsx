import { Link } from "@nextui-org/react";
import React, { type ReactElement } from "react";

export function TwitterLink(): ReactElement {
  return (
    <Link
      css={{}}
      icon
      block
      color="primary"
      onClick={() => window.open("https://twitter.com/_cryptodonate_")}
    >
      Twitter
    </Link>
  );
}
