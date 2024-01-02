/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, getFirestore, doc } from "firebase/firestore";
import { useAppStore } from "../../stores/appStore.js";
import { type User } from "firebase/auth";

interface InitStoreProps {
  user: User;
}

export function InitStore(props: InitStoreProps): null {
  const { app, setUserCollection, setTicketsCollection, setUser } = useAppStore(
    (state) => state,
  );

  const [userCollection] = useDocument(
    doc(getFirestore(app), "users", props.user.uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );
  const [ticketsCollection] = useCollection(
    collection(getFirestore(app), "users", props.user.uid, "tickets/"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  useEffect(() => {
    if (userCollection !== undefined && ticketsCollection !== undefined) {
      setUserCollection(userCollection);
      setTicketsCollection(ticketsCollection);
    }
  }, [userCollection, ticketsCollection]);

  return null;
}
