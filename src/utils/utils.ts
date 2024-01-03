/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Firestore, doc, setDoc } from "firebase/firestore";
import { createTheme } from "@nextui-org/react";
import { fiatToBitcoin } from "bitcoin-conversion";

import { validate } from "bitcoin-address-validation";
import { type User } from "firebase/auth";

export async function USDtoBTC(usd: string | number): Promise<number> {
  if (usd === "") {
    return 0;
  }
  const paymentInBtcFromUsd = await fiatToBitcoin(usd, "USD");

  return paymentInBtcFromUsd;
}

export const darkThemeNext = createTheme({
  type: "dark",
  theme: {
    colors: {
      // background: "rgba(255, 255, 255, 0)",
    },
  },
});

export function createTicket(
  name: string,
  amount: number,
  usdAmount: number,
  msg: string,
  id: string,
  ts: string,
  ticketId: string,
  db: Firestore,
): any {
  setDoc(doc(db, "users", id, "tickets/" + ts), {
    statusColor: "notice",
    status: "search",
    recipientID: id,
    name,
    amount,
    usdAmount: usdAmount.toString(),
    msg,
    time: ts,
    show: false,
    id: ticketId,
  }).catch((error: any) => {
    console.log(error);
  });
}

export function updateUsername(
  db: Firestore,
  user: User,
  username: string,
): void {
  setDoc(
    doc(db, "users", user.uid),
    {
      username,
    },
    { merge: true },
  ).catch((error: any) => {
    console.log(error);
  });
}

export function updateWallet(db: Firestore, user: User, wallet: string): void {
  if (validate(wallet)) {
    setDoc(
      doc(db, "users", user.uid),
      {
        wallet,
      },
      { merge: true },
    ).catch((error: any) => {
      console.log(error);
    });
  }
}

export function updateSetting(
  db: Firestore,
  user: User,
  selected: boolean,
  value: any,
): void {
  if (value?._document != null) {
    setDoc(
      doc(db, "users", user.uid),
      {
        showMessage: selected,
      },
      { merge: true },
    ).catch((error: any) => {
      console.log(error);
    });
  }
}

export const qrCodeDownload = (): void => {
  const svg = document.getElementById("QRCode");
  let svgData = "";
  if (svg !== null) {
    svgData = new XMLSerializer().serializeToString(svg);
  }
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx?.drawImage(img, 0, 0);
    const pngFile = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.download = "QRCode";
    downloadLink.href = `${pngFile}`;
    downloadLink.click();
  };
  img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
};

export function updateShowMessageSetting(
  db: Firestore,
  user: User,
  selected: string,
  value: any,
): void {
  if (selected !== "") {
    if (value?._document != null) {
      setDoc(
        doc(db, "users", user.uid),
        {
          showMessage: selected,
        },
        { merge: true },
      ).catch((error: any) => {
        console.log(error);
      });
    }
  }
}

export function updateAlertSetting(
  db: Firestore,
  user: User,
  alertValue: boolean,
  value: any,
): void {
  if (!alertValue) {
    if (value?._document != null) {
      setDoc(
        doc(db, "users", user.uid),
        {
          alert: alertValue,
        },
        { merge: true },
      ).catch((error: any) => {
        console.log(error);
      });
    }
  }
}

export function createUserData(
  db: Firestore,
  user: User,
  username: string,
  wallet: string,
): void {
  if (validate(wallet)) {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username,
      wallet,
      showMessage: true,
      alert: true,
    }).catch((error: any) => {
      console.log(error);
    });
  }
}
