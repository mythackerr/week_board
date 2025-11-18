"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import { Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import DraftedTodo from "@/components/DraftedTodo";
import CalendarView from "@/components/CalendarView";
import MyAccount from "@/components/MyAccount";
import { createGroup } from "@/lib/DataTypes";
import ProjectSwitcher from "@/components/ProjectSwitcher";
import {
  TaskContainer,
  TGButton,
  TGContainer,
  TGHeader,
} from "@/components/TaskGroup";
import TaskDialog from "@/components/TaskDialog";
import { projectStore, useProject } from "./store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";

export default function Page() {
  const { projects, activeProject } = useProject();
  const [tg, setTG] = useState("Default TG");
  const [op, setOP] = useState(false);
  return (
    <div>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "450px",
          } as React.CSSProperties
        }
      >
        <Sidebar
          collapsible="icon"
          className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
        >
          {/*Branding and Account sidebar */}
          <Sidebar
            collapsible="none"
            className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
          >
            <SidebarHeader>
              <Image src="/logo.svg" width={30} height={30} alt="brand logo" />
            </SidebarHeader>
            <SidebarContent /> {/* To push SidebarFooter to the bottom */}
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <MyAccount />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>

          <Sidebar collapsible="none" className="flex-1 ">
            <SidebarHeader>
              <div className="flex justify-between">
                <h1 className="text-2xl font-medium">Draft ToDos</h1>
                {/*<Button variant={"outline"} size={"icon"}>
                  <Plus />
                </Button>*/}
              </div>
              <div className="p-3">
                <ProjectSwitcher />
              </div>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
              {/*Task Groups */}
              <div>
                {activeProject.getAllTaskGroups().length > 0 ? (
                  activeProject.getAllTaskGroups().map((tg, i) => {
                    return (
                      <TGContainer key={tg.name + i}>
                        <TGHeader tg={tg} action={<TaskDialog tg={tg} />} />

                        <TaskContainer>
                          {tg.getAllTasks().length > 0 ? (
                            tg.getAllTasks().map((t, i) => {
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
                      </TGContainer>
                    );
                  })
                ) : (
                  <div className="text-gray-400 text-sm mx-5 p-2">
                    No task group created...
                  </div>
                )}
                <TGContainer className="border-none">
                  <TGButton>
                    <Dialog open={op} onOpenChange={setOP}>
                      <DialogTrigger asChild>
                        <Button className="w-full" variant="outline">
                          Add Group <Plus />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Task Group</DialogTitle>
                        </DialogHeader>
                        <DialogDescription asChild>
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-3">
                              <Label htmlFor="tgname" asChild>
                                Name
                              </Label>
                              <Input
                                id="tgname"
                                value={tg}
                                onChange={(v) => setTG(v.target.value)}
                              />
                            </div>
                            <div className="flex gap-3">
                              <DialogClose asChild>
                                <Button variant={"secondary"}>Cancel</Button>
                              </DialogClose>
                              <Button
                                onClick={() => {
                                  projectStore.addTaskGroup(createGroup(tg));
                                  setOP(false);
                                }}
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                  </TGButton>
                </TGContainer>
              </div>

              {/* end  */}
            </SidebarContent>
          </Sidebar>
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
