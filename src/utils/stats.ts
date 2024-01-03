import { format } from "fecha";
import { type QuerySnapshot, type DocumentData } from "firebase/firestore";

export function ticketsConfirmFilter(
  valueTickets: QuerySnapshot<DocumentData> | undefined,
): DocumentData[] | undefined {
  if (valueTickets !== undefined) {
    const arr: DocumentData[] = [];
    const arrConfirm: DocumentData[] = [];
    valueTickets.docs.map((doc) => arr.push(doc.data()));
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].status === "confirm") {
        arrConfirm.push(arr[i]);
      }
    }

    return arrConfirm;
  }
}

export function sum(
  confirmTickets: DocumentData[] | undefined,
  month: string | undefined,
): number {
  if (confirmTickets !== undefined && month !== undefined) {
    const lastMounth = getLastMounthDonates(confirmTickets, month);
    // console.log(lastMounth);
    if (lastMounth?.length === 0) {
      return 0;
    }
    let sum = 0;
    if (lastMounth !== undefined && lastMounth.length > 0) {
      // console.log(lastMounth);
      for (let i = 0; i < lastMounth.length; i++) {
        sum += Number(lastMounth[i].pv);
      }
    }

    return sum;
  }
  return 0;
}

export function countDonate(
  confirmTickets: DocumentData[] | undefined,
  month: string | undefined,
): number {
  if (confirmTickets !== undefined && month !== undefined) {
    return confirmTickets.length;
  }
  return 0;
}

export function getLastMounthDonates(
  confirmTickets: DocumentData[],
  month: string,
): any {
  if (confirmTickets !== undefined && month !== undefined) {
    // console.log(confirmTickets, month);
    const arr: DocumentData[] = [];
    for (let i = 0; i < confirmTickets.length; i++) {
      const date = format(
        new Date(Number(confirmTickets[i].time) * 1000),
        "MMMM",
      );
      // console.log(date, month);
      if (date === month) {
        // console.log(date, month);

        arr.push(confirmTickets[i]);
      }
    }

    const stonksDays: string[] = [];

    for (let i = 0; i < arr.length; i++) {
      stonksDays.push(format(new Date(arr[i].time * 1000), "DD"));
    }
    const uniqueStonksDays = stonksDays.filter(function (item, pos) {
      return stonksDays.indexOf(item) === pos;
    });
    // console.log(uniqueStonksDays);
    function sumDay(day: number): { pv: number; name: string } {
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        if (
          format(new Date(arr[i].time * 1000), "DD") === uniqueStonksDays[day]
        ) {
          sum = sum + Number(arr[i].usdAmount);
        }
      }
      return { pv: sum, name: month + " " + uniqueStonksDays[day] };
    }
    const chartData = [];

    for (let i = 0; i < uniqueStonksDays.length; i++) {
      chartData.push(sumDay(i));
    }
    console.log(chartData);
    // далее необходимо заполнить график данными для каждого дня месяца

    const initData: any = [];
    for (let i = 1; i <= Number(format(new Date(), "DD")); i++) {
      initData.push({
        name: `May ${i}`,
        pv: 0,
      });
    }
    chartData.forEach((v) => {
      initData.forEach((val: any, index: number) => {
        if (v.name === val.name) {
          initData[index] = v;
        }
      });
    });
    return initData;
  }
}
