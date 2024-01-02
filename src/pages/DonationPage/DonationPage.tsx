/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getFirestore, doc } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { NextUIProvider } from "@nextui-org/react";
import { useAppStore } from "../../stores/appStore";
import { useDonationStore } from "../../stores/donationStore";
import { darkThemeNext } from "../../utils/utils";
import { DonateCard } from "./components/DonateCard";

export function DonationPage(): JSX.Element {
  const app = useAppStore((state) => state.app);
  const { id } = useParams();

  const {
    setRecipientUserCollection,
    setRecipientTicketsCollection,
    setCurrentTicket,
    currentTicket,
  } = useDonationStore((state) => state);
  const [recipientUserCollection] = useDocument(
    doc(getFirestore(app), "users", id ?? ""),
  );
  const [recipientTicketsCollection] = useCollection(
    collection(getFirestore(app), "users", id ?? "", "tickets/"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  useEffect(() => {
    if (recipientUserCollection !== undefined) {
      setRecipientUserCollection(recipientUserCollection);
    }
    if (recipientTicketsCollection !== undefined) {
      setRecipientTicketsCollection(recipientTicketsCollection);
    }
    setCurrentTicket();
    fetch("https://server-express-tpo4.onrender.com/", {
      mode: "no-cors",
    }).catch((err) => console.log(err));
  }, [recipientTicketsCollection]);

  useEffect(() => {
    console.log(currentTicket);
  }, [currentTicket]);

  return (
    <>
      <NextUIProvider theme={darkThemeNext}>
        <div>
          <DonateCard />
        </div>
      </NextUIProvider>
    </>
  );
}
