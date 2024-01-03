/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useEffect } from "react";
import { DonateForm } from "./DonateForm";
import { PaidTiket } from "./PaidTiket";
import { Loading } from "@nextui-org/react";
import { Flex } from "@adobe/react-spectrum";
import { useDonationStore } from "../../../stores/donationStore";

export function DonateCard(): JSX.Element {
  const {
    recipientUserCollection,
    amount,
    status,
    currentTicket,
    setBtcAmount,
  } = useDonationStore((state) => state);

  useEffect(() => {
    setBtcAmount(Number(amount.toFixed(6)));
  }, [amount]);

  if (recipientUserCollection === undefined) {
    return (
      <>
        <Flex
          justifyContent={"center"}
          alignItems="center"
          height={"100vh"}
          direction="column"
        >
          <Loading size="md" />
        </Flex>
      </>
    );
  }

  if (recipientUserCollection.data() !== undefined) {
    if (status) {
      if (currentTicket !== undefined) {
        return <PaidTiket />;
      }
    }
    return <DonateForm />;
  }

  return (
    <Flex
      justifyContent={"center"}
      gap="size-1000"
      alignItems="center"
      height={"90vh"}
    >
      <h1>User not found</h1>
    </Flex>
  );
}
