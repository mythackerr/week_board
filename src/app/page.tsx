"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import DraftedTodo from "@/components/DraftedTodo";
import CalendarView from "@/components/TimeGrid/TimeGrid";
import ProjectSwitcher from "@/components/ProjectSwitcher";
import {
  TaskContainer,
  TG,
  TGContainer,
  TGHeader,
} from "@/components/TaskGroup";
import { projectStore, useProject } from "../store/store";
import TGAction from "@/components/TaskGroup/TGAction";
import { TGCreationDialog } from "@/components/TaskGroup/TGCreationDialog";
import { DndContext } from "@dnd-kit/core";
import { Task, TaskGroup } from "@/lib/DataTypes";

export default function Page() {
  const { activeProject } = useProject();
  // const [activeDraggingTask, setActiveDraggingTask] = useState<Task | null>();
  // const [activeDraggingTG, setActiveDraggingTG] = useState<TaskGroup | null>();
  return (
    <div>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "350px",
          } as React.CSSProperties
        }
      >
        <Sidebar className="overflow-hidden">
          <SidebarHeader>
            <div className="flex justify-between">
              <h1 className="text-2xl font-medium">Draft ToDos</h1>
            </div>
            <div className="p-3">
              <ProjectSwitcher />
            </div>
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent className="overflow-x-hidden">
            {/*Task Groups */}
            <div>
              <TGContainer>
                <DndContext
                  modifiers={[]}
                  onDragEnd={(event) => {
                    // console.log(event);

                    if (event.active.data.current) {
                      if (
                        event.active.data.current?.task &&
                        event.active.data.current?.taskGroup
                      ) {
                        const { task, taskGroup } = event.active.data
                          .current as {
                          task: Task;
                          taskGroup: TaskGroup;
                        };

                        if (event.over?.data.current?.taskGroup) {
                          const { taskGroup: newTaskGroup } = event.over?.data
                            .current as {
                            task: Task;
                            taskGroup: TaskGroup;
                          };

                          projectStore.deleteTask(taskGroup, task);
                          projectStore.addTask(newTaskGroup, task);
                          projectStore.updateTask(newTaskGroup, task);
                        }
                      }
                    }
                  }}
                >
                  {activeProject.getAllTaskGroups().length > 0 ? (
                    activeProject.getAllTaskGroups().map((tg, i) => {
                      return (
                        <div key={tg.name + i} className="w-full">
                          <TG tg={tg}>
                            <TGHeader tg={tg} />

                            <TaskContainer>
                              {tg.getAllTasks().length > 0 ? (
                                tg.getAllTasks().map((t) => {
                                  return (
                                    <DraftedTodo
                                      taskGroup={tg}
                                      task={t}
                                      key={t.id}
                                    />
                                  );
                                })
                              ) : (
                                <div className="text-gray-400 text-sm">
                                  No task created...
                                </div>
                              )}
                            </TaskContainer>
                          </TG>

                          {i !== activeProject.getAllTaskGroups().length - 1 ? (
                            <hr />
                          ) : (
                            <></>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-gray-400 text-sm mx-5 p-2">
                      No task group created...
                    </div>
                  )}

                  <TGAction />
                  <TGCreationDialog />
                </DndContext>
              </TGContainer>
            </div>

            {/* end  */}
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          {/*MAIN CONTENT */}
          <div className="p-5">
            <CalendarView />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
