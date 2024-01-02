import React from "react";
import { Container, Radio } from "@nextui-org/react";
export function CurrencySelection(): JSX.Element {
  return (
    <Radio.Group size={"sm"} value="btc">
      <Container
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "$10",
        }}
      >
        <Radio color={"success"} value={"btc"}>
          BTC
        </Radio>
        <Radio disabled color={"success"} value={"eth"}>
          ETH
        </Radio>
        <Radio disabled color="success" value={"usdt"}>
          USDT
        </Radio>
      </Container>
    </Radio.Group>
  );
}
