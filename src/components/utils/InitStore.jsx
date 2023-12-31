/* eslint-disable react/prop-types */
import React, { useEffect } from "react";

import { useCollection, useDocument } from "react-firebase-hooks/firestore";

import { collection, getFirestore, doc } from "firebase/firestore";

import { useStore } from "../../store";

export function InitStore(props) {
  const { app, setValue, setTickets, setUser } = useStore((state) => state);

  const [value] = useDocument(doc(getFirestore(app), "users", props.user.uid), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const [valueTickets] = useCollection(
    collection(getFirestore(app), "users", props.user.uid, "tickets/"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );
  useEffect(() => {
    console.log(props.auth);
  }, [props.auth]);

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  useEffect(() => {
    if (value && valueTickets) {
      setValue(value);
      setTickets(valueTickets);
    }
  }, [value, valueTickets]);

  return <></>;
}
