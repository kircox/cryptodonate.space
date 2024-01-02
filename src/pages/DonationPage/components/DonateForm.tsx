/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React from "react";
import { FormHeader } from "./FormHeader";
import { CurrencySelection } from "./CurrencySelection";
import { NameInput } from "./inputs/NameInput";
import { AmountInput } from "./inputs/AmountInput";
import { MessageInput } from "./inputs/MessageInput";
import { Amount } from "./Amount";
import { Wallet } from "./Wallet";
import QRCode from "react-qr-code";
import {
  Text,
  Card,
  Button,
  Container,
  Modal,
  Spacer,
  useModal,
} from "@nextui-org/react";
import { Flex } from "@adobe/react-spectrum";
import { useAppStore } from "../../../stores/appStore";
import { useDonationStore } from "../../../stores/donationStore";
import { TwitterLink } from "../../..//components/shared/TwitterLink";
import { CryptoDonateLink } from "../../../components/shared/CryptoDonateLink";
import { createTicket } from "../../../utils/utils";

export function DonateForm(): JSX.Element | null {
  const db = useAppStore((state) => state.db);
  const {
    recipientUserCollection,
    timestamp,
    btcAmount,
    usdAmount,
    ticketId,
    senderName,
    message,
    setStatus,
  } = useDonationStore((state) => state);
  const { setVisible, bindings } = useModal();
  if (recipientUserCollection !== undefined) {
    return (
      <>
        <Flex
          justifyContent={"center"}
          alignItems="center"
          height={"90vh"}
          direction="column"
          gap="size-1000"
        >
          <Flex direction="column">
            <Container
              css={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormHeader />
              <Spacer y={0.2} />
              <CurrencySelection />
            </Container>
            <Spacer y={0.2} />
          </Flex>

          <Spacer y={1.8} />

          <NameInput />
          <Spacer y={1.5} />

          <AmountInput />
          <Spacer y={1.5} />

          <MessageInput />
          <Spacer y={2} />

          <Flex direction={"column"} justifyContent="center">
            <Button
              css={{
                width: "200px",
              }}
              auto
              flat
              onClick={() => {
                setVisible(true);
              }}
            >
              Send
            </Button>

            <Modal
              closeButton
              width="600px"
              blur
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
              {...bindings}
            >
              <Modal.Header></Modal.Header>
              <Modal.Body>
                <Flex
                  direction={"column"}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text h3 id="modal-description">
                    Send
                  </Text>
                  <Spacer y={0.2} />

                  <Amount />

                  <Spacer y={1} />

                  <Text h3 id="modal-description">
                    to Bitcoin adress
                  </Text>
                  <Spacer y={0.3} />
                  <Wallet />
                  <Card
                    css={{
                      width: "min-content",
                      marginTop: "$4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <QRCode
                      size={100}
                      value={recipientUserCollection.data()?.wallet}
                    />
                  </Card>
                </Flex>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  flat
                  auto
                  color="error"
                  onClick={() => {
                    setVisible(false);
                  }}
                >
                  Refuse
                </Button>
                <Button
                  onClick={() => [
                    setVisible(false),
                    setStatus(true),
                    createTicket(
                      senderName,
                      btcAmount,
                      usdAmount,
                      message,
                      recipientUserCollection.id,
                      timestamp,
                      ticketId,
                      db,
                    ),
                  ]}
                  size={"sm"}
                >
                  I`ve paid
                </Button>
              </Modal.Footer>
            </Modal>
          </Flex>

          <Spacer />
          <Spacer />

          <CryptoDonateLink />
          <Spacer y={0} />
          <TwitterLink />
        </Flex>
      </>
    );
  } else {
    return null;
  }
}
