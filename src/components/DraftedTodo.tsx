"use client";
import { useEffect, useRef, useState } from "react";
import { Draggable } from "@fullcalendar/interaction";
import { createTask, Task, TaskGroup } from "@/lib/DataTypes";
import { ArrowUpRight, ChevronDown, Pencil, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  PopoverContent,
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { projectStore } from "@/app/store";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { title } from "process";
import { DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type Props = {
  taskGroup: TaskGroup;
  task: Task;
};
export default function DraftedTodo({ task, taskGroup }: Props) {
  const elem = useRef(null);
  const didInit = useRef(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [open1, setOpen1] = useState(false);

  const [open, setOpen] = useState(true);
  const [d, setD] = useState<Draggable | null>(null);
  useEffect(() => {
    if (!didInit.current) {
      didInit.current = true;
      if (elem.current) {
        setD(
          new Draggable(elem.current, {
            eventData: {
              title: task.title,
              extendedProps: { task, taskGroup },
            },
          })
        );
      }
    }
  }, []);

  useEffect(() => {
    if (task.time.assigned) d?.destroy();
  }, [task.time.assigned, d]);
  return (
    <div
      ref={elem}
      className="border bg-gray-100 cursor-grab active:cursor-grabbing"
    >
      <div className="flex justify-between p-3">
        <div className="font-bold">{task.title}</div>
        <div onClick={() => setOpen(!open)} className="cursor-pointer px-5">
          <ChevronDown />
        </div>
      </div>
      <div className={cn(open ? "flex" : "hidden", "p-3 flex-col gap-3")}>
        {task.time.assigned && (
          <Popover>
            <PopoverTrigger asChild>
              <div className="text-sm border rounded-full inline-block w-fit px-3 mb-4 cursor-pointer hover:bg-gray-200">
                assigned
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 overflow-hidden"
              align="start"
            >
              <Calendar
                disableNavigation={true}
                hideNavigation={true}
                onSelect={(s, t, e) => {}}
                footer={
                  <div className="border p-4 font-bold">
                    {task.time.start?.getHours()}:
                    {task.time.start?.getMinutes()}
                    {task.time.end
                      ? `-${task.time.end?.getHours()}:${task.time.end?.getMinutes()}`
                      : ""}
                  </div>
                }
                mode="range"
                selected={{
                  from: task.time.start,
                  to: task.time.end,
                }}
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
        )}
        <div>{task.description}</div>
        <div className="flex gap-2">
          <Dialog open={open1} onOpenChange={setOpen1}>
            <DialogTrigger asChild>
              <Button variant={"outline"} onClick={() => {}}>
                <Pencil />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Task</DialogTitle>
              </DialogHeader>
              <DialogDescription asChild>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="task-name">Task Name</Label>
                    <Input
                      id="task-name"
                      className="text-black"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="desciption">Description</Label>
                    <Textarea
                      id="description"
                      className="text-black"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-3">
                    <DialogClose asChild>
                      <Button variant={"secondary"}>Cancel</Button>
                    </DialogClose>
                    <Button
                      onClick={() => {
                        projectStore.updateTask(taskGroup, {
                          ...task,
                          title,
                          description,
                        });

                        setOpen1(false);
                      }}
                    >
                      Done <ArrowUpRight />
                    </Button>
                  </div>
                </div>
              </DialogDescription>
            </DialogContent>
          </Dialog>

          <Button
            variant={"outline"}
            onClick={() => {
              projectStore.deleteTask(taskGroup, task);
            }}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
}
