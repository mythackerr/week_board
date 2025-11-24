"use client";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import DateContainer from "./DateContainer";
import theme from "./Theme/Theme";
import { useEffect, useRef, useState } from "react";
import { createTask, Task, TaskGroup } from "@/lib/DataTypes";
import { Button } from "@/components/ui/button";
import { projectStore, useProject } from "@/store/store";

export default function Calendar() {
  const { activeProject, events } = useProject();

  const [start, setStart] = useState<Date | null>();
  const [end, setEnd] = useState<Date | null>();

  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    if (calendarRef.current) {
      const api = calendarRef.current.getApi();
      setTimeout(() => {
        api.removeAllEvents();
        events.forEach((e) => {
          api.addEvent(e);
        });
      }, 0);
    }
  }, [events]);
  function action(type: "prev" | "next" | "today") {
    const api = calendarRef.current?.getApi();

    switch (type) {
      case "prev":
        api?.prev();
        break;
      case "next":
        api?.next();
        break;
      case "today":
        api?.today();
        break;
    }
  }

  return (
    <div>
      <div className="flex gap-3 justify-end">
        <Button variant={"secondary"} onClick={() => action("prev")}>
          Prev
        </Button>
        <Button variant={"secondary"} onClick={() => action("today")}>
          Today
        </Button>
        <Button variant={"secondary"} onClick={() => action("next")}>
          Next
        </Button>
      </div>
      <FullCalendar
        // boolean
        headerToolbar={false}
        allDaySlot={false}
        droppable={true}
        editable={true}
        eventResizableFromStart={true}
        selectable={true}
        // configs
        ref={calendarRef}
        plugins={[timeGridPlugin, theme, interactionPlugin]}
        height={"90svh"}
        themeSystem="customTheme"
        initialView="timeGridWeek"
        slotLabelClassNames={"slot-label"}
        eventClassNames={"event"}
        slotLaneClassNames={"slot-lane"}
        snapDuration={{ minute: 15 }}
        // eventStartEditable={true}
        // selectMirror={true}

        // functions

        eventDidMount={(info) => {
          setStart(info.event.start!);
          setEnd(info.event.end!);
        }}
        eventReceive={(info) => {
          const { task, taskGroup } = info.event.extendedProps as {
            task: Task;
            taskGroup: TaskGroup;
          };

          task.time.assigned = true;
          task.time.start = new Date(info.event.start!);
          task.time.end = info.event.end!;
          projectStore.updateTask(taskGroup, task);
        }}
        eventContent={(e) => {
          return (
            <div>
              <div className="bg-amber-100 inline py-.5 px-1 rounded-full">
                {e.event.start?.getHours()} - {e.event.end?.getHours()}
              </div>
              <div> {e.event.title} </div>
            </div>
          );
        }}
        eventDragStop={(info) => {
          const { task, taskGroup } = info.event.extendedProps as {
            task: Task;
            taskGroup: TaskGroup;
          };

          task.time.start = start!;
          task.time.end = end!;
          projectStore.updateTask(taskGroup, task);
        }}
        eventResize={(info) => {
          const { task, taskGroup } = info.event.extendedProps as {
            task: Task;
            taskGroup: TaskGroup;
          };

          task.time.start = info.event.start!;
          task.time.end = info.event.end!;
          projectStore.updateTask(taskGroup, task);
        }}
        select={(info) => {
          const confirmation = confirm("Do you wanna create a new task?");
          if (confirmation) {
            const bar = activeProject.getAllTaskGroups();
            if (bar.length > 0) {
              const foo = createTask(
                `Untitled Task #${bar[0].getAllTasks().length}`,
                "blank description"
              );

              projectStore.addTask(bar[0], foo);
              foo.time = {
                assigned: true,
                start: info.start,
                end: info.end,
              };

              projectStore.updateTask(bar[0], foo);
            } else {
              alert(
                "There isn't any Task group in project: " + activeProject.name
              );
            }
          }
        }}
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
