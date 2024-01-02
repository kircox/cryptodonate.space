import create from "zustand";

import {
  getFirestore,
  type Firestore,
  type DocumentData,
  type DocumentSnapshot,
  type QuerySnapshot,
} from "firebase/firestore";
import { type Auth, getAuth, type User } from "firebase/auth";
import { type FirebaseApp, initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config";

interface AppStoreState {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  user: User | undefined;
  balance: number;
  messages: boolean;
  alerts: boolean;
  userCollection: DocumentSnapshot<DocumentData> | undefined;
  ticketsCollection: QuerySnapshot<DocumentData> | undefined;
}

interface AppStoreActions {
  setUser: (user: User) => void;
  setUserCollection: (value: DocumentSnapshot<DocumentData>) => void;
  setTicketsCollection: (tickets: QuerySnapshot<DocumentData>) => void;
}

type AppStore = AppStoreState & AppStoreActions;

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDb = getFirestore(firebaseApp);

export const useAppStore = create<AppStore>((set) => ({
  app: firebaseApp,
  auth: firebaseAuth,
  db: firebaseDb,
  user: undefined,
  balance: 0,
  messages: true,
  alerts: true,
  userCollection: undefined,
  ticketsCollection: undefined,
  setUser: (user) => {
    set(() => ({ user }));
  },
  setUserCollection: (collectionValue) => {
    set(() => ({ userCollection: collectionValue }));
  },
  setTicketsCollection: (collectionValue) => {
    set(() => ({ ticketsCollection: collectionValue }));
  },
}));
