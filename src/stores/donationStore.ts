import create from "zustand";
import {
  type DocumentData,
  type DocumentSnapshot,
  type QuerySnapshot,
  Timestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { ticketFilter } from "./storeUtils";

interface DonationStoreState {
  recipientUserCollection: DocumentSnapshot<DocumentData> | undefined;
  recipientTicketsCollection: QuerySnapshot<DocumentData> | undefined;
  timestamp: string;
  status: boolean;
  ticketId: string;
  currentTicket: DocumentData | undefined | null;
  senderName: string;
  message: string;
  amount: number;
  btcAmount: number;
  usdAmount: number;
}

interface DonationStoreActions {
  setRecipientUserCollection: (value: DocumentSnapshot<DocumentData>) => void;
  setRecipientTicketsCollection: (value: QuerySnapshot<DocumentData>) => void;
  setTicketId: (id: string) => void;
  setCurrentTicket: () => void;
  setStatus: (status: boolean) => void;
  setAmount: (amount: number) => void;
  setUsdAmount: (amount: number) => void;
  setBtcAmount: (amount: number) => void;
  setSenderName: (name: string) => void;
  setMessage: (message: string) => void;
  reset: () => void;
}

type DonationStore = DonationStoreState & DonationStoreActions;

export const donationStore = create<DonationStore>((set) => ({
  recipientUserCollection: undefined,
  recipientTicketsCollection: undefined,
  timestamp: Timestamp.fromDate(new Date()).seconds.toString(),
  status: false,
  ticketId: uuidv4(),
  currentTicket: undefined,
  senderName: "anonym",
  message: "",
  amount: 0,
  btcAmount: 0,
  usdAmount: 0,
  setRecipientUserCollection: (value) => {
    set(() => ({ recipientUserCollection: value }));
  },
  setRecipientTicketsCollection: (value) => {
    set(() => ({ recipientTicketsCollection: value }));
  },
  setStatus: (value) => {
    set(() => ({ status: value }));
  },
  setTicketId: (id) => {
    set(() => ({ ticketId: id }));
  },
  setCurrentTicket: () => {
    set((state) => ({
      currentTicket: ticketFilter(
        state.recipientTicketsCollection,
        state.timestamp,
        state.ticketId,
      ),
    }));
  },
  setAmount: (value) => {
    set(() => ({ amount: value }));
  },
  setUsdAmount: (value) => {
    set(() => ({ usdAmount: value }));
  },
  setBtcAmount: (value) => {
    set(() => ({ btcAmount: value }));
  },
  setSenderName: (name) => {
    set(() => ({ senderName: name }));
  },
  setMessage: (msg) => {
    set(() => ({ message: msg }));
  },
  reset: () => {
    set(() => ({
      status: false,
      senderName: "anonym",
      message: "",
      ticketId: uuidv4(),
      amount: 0,
      btcAmount: 0,
    }));
  },
}));
