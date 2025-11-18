"use client";
import DraftedTodo from "@/components/DraftedTodo";
import { TaskContainer, TGContainer, TGHeader } from "@/components/TaskGroup";
import { TaskGroup } from "@/lib/DataTypes";
export default function Page() {
  return (
    <div>
      <TGContainer>
        <TGHeader
          name={"Default group name"}
          onAdd={() => {
            alert("Add task called");
          }}
        />
        <TaskContainer>
          <DraftedTodo name="Name" />
          <DraftedTodo name="Name" />
          <DraftedTodo name="Name" />
        </TaskContainer>
      </TGContainer>
    </div>
  );
}
