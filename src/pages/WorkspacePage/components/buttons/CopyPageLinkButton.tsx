import React, { useState, useEffect } from "react";
import Copy from "@spectrum-icons/workflow/Copy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, Tooltip } from "@nextui-org/react";
import { useAppStore } from "../../../../stores/appStore.js";

export function CopyPageLinkButton(): JSX.Element {
  const [copiedPageLink, setCopiedPageLink] = useState(false);
  const user = useAppStore((state) => state.user);
  useEffect(() => {
    if (copiedPageLink) {
      setTimeout(() => {
        setCopiedPageLink(false);
      }, 2000);
    }
  }, [copiedPageLink]);
  return (
    <>
      {user !== undefined && (
        <CopyToClipboard
          text={"http://cryptodonate.space/user/" + user.uid}
          onCopy={() => {
            setCopiedPageLink(true);
          }}
        >
          {copiedPageLink ? (
            <Button color="success" flat auto size="xs">
              <Copy marginEnd={"size-100"} />
              Copied!
            </Button>
          ) : (
            <Tooltip
              color="invert"
              placement="bottom"
              content={"Don't forget to share this link"}
            >
              <Button color={"secondary"} auto size="xs">
                <Copy marginEnd={"size-100"} />
                Profile Link
              </Button>
            </Tooltip>
          )}
        </CopyToClipboard>
      )}
    </>
  );
}
