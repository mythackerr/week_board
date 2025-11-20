import leadZero from "@/lib/myutils";

interface IDateContainer {
  dateNumber: number;
  dayNumber: number;
  isToday: boolean;
}
export default function DateContainer({
  dateNumber,
  dayNumber,
  isToday,
}: IDateContainer) {
  const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return (
    <div className={`${isToday ? "text-black" : "text-gray-400"}`}>
      <div className="text-5xl font-bold">{leadZero(dateNumber)}</div>
      <div className="text-sm font-medium">{weekName[dayNumber]}</div>
      {/*Indicator*/}
      <div className="border border-gray-400 mt-3 h-4 rounded-full mx-[50%]"></div>
    </div>
  );
}
