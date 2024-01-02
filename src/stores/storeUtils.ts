import { type DocumentData, type QuerySnapshot } from "firebase/firestore";

export function ticketFilter(
  recipientTicketsCollection: QuerySnapshot<DocumentData> | undefined,
  timestamp: string,
  ticketId: string,
): DocumentData | null {
  console.log(recipientTicketsCollection, timestamp, ticketId);
  const arr: DocumentData[] = [];
  if (recipientTicketsCollection !== undefined) {
    recipientTicketsCollection.docs.map((doc) => arr.push(doc.data()));
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === ticketId) {
      console.log(arr[i]);
      return arr[i];
    }
  }
  return null;
}
