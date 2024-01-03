import React, { useState, useEffect } from "react";
import { useAppStore } from "../../../stores/appStore";
import { collection, getFirestore, doc } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { Container, Loading } from "@nextui-org/react";
import { TestDonate } from "./TestDonate";
import { ticketsConfirmFilter } from "../../../utils/stats";
import { LastDonate } from "./LastDonate";

interface DonateAlertProps {
  id: string;
}
export function DonateAlert(props: DonateAlertProps): JSX.Element {
  console.log(props.id);
  const { app } = useAppStore((state) => state);

  const [value, loading] = useDocument(
    doc(getFirestore(app), "users", props.id),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );
  const [valueTickets] = useCollection(
    collection(getFirestore(app), "users", props.id, "tickets/"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );
  const [count, setCount] = useState(0);
  const [visibility, setVisibility] = useState("hidden");

  useEffect(() => {
    if (valueTickets !== undefined) {
      setCount(ticketsConfirmFilter(valueTickets)?.length ?? 0);
    }
  });
  //
  useEffect(() => {
    console.log(valueTickets);
  }, [valueTickets]);
  //
  useEffect(() => {
    // console.log("new donate");
    setVisibility("visible");
  }, [count]);

  useEffect(() => {
    if (visibility === "visible") {
      setTimeout(() => {
        setVisibility("hidden");
      }, 8000);
    }
  }, [visibility]);

  if (loading) {
    return (
      <>
        <Container>
          <Loading size="lg" />
        </Container>
      </>
    );
  }

  if (value?.data() !== undefined && valueTickets !== undefined) {
    const confirmTickets = ticketsConfirmFilter(valueTickets);

    if (confirmTickets?.length === 0) {
      return (
        <TestDonate
          visibility={visibility}
          value={value}
          valueTickets={valueTickets}
          confirmTickets={confirmTickets}
        />
      );
    }
    return (
      <LastDonate
        visibility={visibility}
        value={value}
        valueTickets={valueTickets}
        confirmTickets={confirmTickets}
      />
    );
  }

  return <h1>Overlay not found</h1>;
}
