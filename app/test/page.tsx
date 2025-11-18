"use client";
import CalendarView from "@/components/CalendarView";
import DraftedTodo from "@/components/DraftedTodo";
import { TaskContainer, TGContainer, TGHeader } from "@/components/TaskGroup";

export default function Page() {
  return (
    <div>
      <div>
        <TGContainer>
          <TGHeader name="Some Group" onAdd={() => alert("hi")} />
          <TaskContainer>
            <DraftedTodo task_id="uniqueid" name="TEST #1" />
            <DraftedTodo task_id="uniqueid" name="TEST #1" />
            <DraftedTodo task_id="uniqueid2" name="TEST #2" />
          </TaskContainer>
        </TGContainer>
      </div>
      <CalendarView />
    </div>
  );
}
