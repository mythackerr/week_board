"use client";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import customTheme from "../../../components/CustomTheme";
import DateContainer from "@/components/DateContainer";
import DraftedTodo from "@/components/DraftedTodo";
import interactionPlugin from "@fullcalendar/interaction";

export default function Page() {
  return (
    <div className="p-5">
      <DraftedTodo name="This is imporatnt" />

      <FullCalendar
        allDaySlot={false}
        headerToolbar={false}
        plugins={[timeGridPlugin, customTheme, interactionPlugin]}
        themeSystem="customTheme"
        initialView="timeGridWeek"
        allDayClassNames={"label_with_line"}
        allDayContent="all day"
        slotLabelClassNames={"label_with_line"}
        eventClassNames={"event"}
        droppable={true}
        editable={true}
        dayHeaderContent={(arg) => {
          return (
            <DateContainer
              dateNumber={arg.date.getDate()}
              dayNumber={arg.date.getDay()}
              isToday={arg.isToday}
            />
          );
        }}
      />
    </div>
  );
}
