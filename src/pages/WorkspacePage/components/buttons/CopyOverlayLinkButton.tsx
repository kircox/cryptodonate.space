/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

import Copy from "@spectrum-icons/workflow/Copy";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, type ButtonVariantsProps, Tooltip } from "@nextui-org/react";
import { useAppStore } from "../../../../stores/appStore.js";

interface ButtonProps {
  size: ButtonVariantsProps["size"];
}

export function CopyOverlayLinkButton(props: ButtonProps): JSX.Element {
  const user = useAppStore((state) => state.user);
  const [copiedOverlayLink, setCopiedOverlayLink] = useState(false);
  useEffect(() => {
    if (copiedOverlayLink) {
      setTimeout(() => {
        setCopiedOverlayLink(false);
      }, 2000);
    }
  }, [copiedOverlayLink]);
  return (
    <>
      {user !== undefined && (
        <CopyToClipboard
          text={"http://cryptodonate.space/overlay/" + user.uid}
          onCopy={() => {
            setCopiedOverlayLink(true);
          }}
        >
          {copiedOverlayLink ? (
            <Button
              css={{
                marginRight: "$10",
              }}
              flat
              color="success"
              auto
              size={props.size}
            >
              <Copy marginEnd={"size-100"} />
              Copied!
            </Button>
          ) : (
            <Tooltip
              color="invert"
              placement="bottom"
              content={"Use this link as browser source in OBS Studio."}
            >
              <Button
                css={{
                  marginRight: "$10",
                }}
                color="secondary"
                auto
                size={props.size}
              >
                <Copy marginX={"size-100"} />
                Overlay Link
              </Button>
            </Tooltip>
          )}
        </CopyToClipboard>
      )}
    </>
  );
}
