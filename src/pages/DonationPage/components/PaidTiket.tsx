import React from "react";
import { Progress, Text, Button, Spacer } from "@nextui-org/react";
import { Flex } from "@adobe/react-spectrum";
import { useDonationStore } from "../../../stores/donationStore";
import { TwitterLink } from "../../../components/shared/TwitterLink";
import { CryptoDonateLink } from "../../../components/shared/CryptoDonateLink";

export function PaidTiket(): JSX.Element {
  const { recipientUserCollection, currentTicket, reset } = useDonationStore(
    (state) => state,
  );

  return (
    <>
      {recipientUserCollection !== undefined && (
        <Flex
          height={"100vh"}
          justifyContent="center"
          alignItems={"center"}
          direction="column"
        >
          <Text
            h1
            size={45}
            css={{
              padding: "20px",
              textGradient: "45deg, $blue500 -20%, $pink500 50%",
            }}
            weight="bold"
          >
            Donate to {recipientUserCollection.data()?.username}
          </Text>
          <Spacer y={3} />
          {currentTicket?.show !== undefined ? (
            <>
              <Text h2 color="success">
                Transaction detected!
              </Text>
            </>
          ) : (
            <>
              <Progress
                css={{
                  marginTop: "$10",
                  minWidth: "30%",
                  maxWidth: "50%",
                }}
                shadow
                indeterminated
                color="gradient"
                status="secondary"
              />
              <Spacer y={3} />
              <Text h2 color="text">
                search transaction...
              </Text>
            </>
          )}

          <Spacer y={3} />
          <Button
            onClick={
              () => {
                reset();
              }
              // 	[
              // 	setStatus(false),
              // 	setTicketId(uuidv4()),
              // 	setAmount(0),
              // 	setBtcAmount(0),
              // ]
            }
            css={{ marginTop: "$10" }}
          >
            Send another donation
          </Button>
          <Spacer />
          <Spacer />
          <CryptoDonateLink />
          <Spacer y={0} />
          <TwitterLink />
          <Spacer />
        </Flex>
      )}
    </>
  );
}
