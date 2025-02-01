// Sample input:
const inputData = [
  { day: "Tuesday", from: "09:00", to: "17:00" },
  { day: "Wednesday", from: "09:00", to: "17:00" },
  { day: "Thursday", from: "09:00", to: "17:00" },
  { day: "Friday", from: "09:00", to: "17:00" },
  { day: "Saturday", from: "10:00", to: "14:00" },
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const outputData = daysOfWeek.map((day) => {
  const record = inputData.find((item) => item.day === day);
  if (record) {
    // 同じ時間帯が連続している場合にまとめる処理を追加する必要があります
    return `${record.day}: ${record.from} - ${record.to}`;
  } else {
    return `${day}: Closed`;
  }
});

const outData = daysOfWeek.map((day) => {
  const record = inputData.find((item) => item.day == day);
  if (record) {
    return `${record.day}:${record.from} - ${record.to}`;
  } else {
    return `${day} : Closed`;
  }
});
console.log(outData);
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const formatDayRanges = (data) =>
  weekdays.reduce((acc, day) => {
    const dayData = data.find((d) => d.day === day);

    const hours = dayData ? `${dayData.from} - ${dayData.to}` : "Closed";

    if (acc.length && acc[acc.length - 1].hours === hours) {
      acc[acc.length - 1].days.push(day);
    } else {
      acc.push({ days: [day], hours });
    }

    return acc;
  }, []);

const result = formatDayRanges(inputData);
console.log(result);
