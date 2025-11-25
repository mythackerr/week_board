"use client";
import { useEffect, useRef, useState } from "react";
import { Draggable } from "@fullcalendar/interaction";
import { Task, TaskGroup } from "@/lib/DataTypes";
import { ArrowUpRight, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { projectStore } from "@/store/store";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useDraggable } from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { colors } from "@/lib/ColorsOption";

type Props = {
  taskGroup: TaskGroup;
  task: Task;
};
export default function DraftedTodo({ task, taskGroup }: Props) {
  const elem = useRef(null);
  const didInit = useRef(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [taskColor, setTaskColor] = useState<string>(task.color);

  const [open1, setOpen1] = useState(false);

  const [open, setOpen] = useState(true);
  const [d, setD] = useState<Draggable | null>(null);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: {
      taskGroup,
      task,
    },
  });

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

  const style = {
    // transform: `translate3d(${transform?.x},${transform?.y},0)`,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div style={style} {...listeners} {...attributes} ref={setNodeRef}>
      <div
        style={{ backgroundColor: task.color }}
        ref={elem}
        className="border cursor-grab active:cursor-grabbing"
      >
        <div className="flex justify-between p-3">
          <div className="font-bold">{task.title}</div>
          <div onClick={() => setOpen(!open)} className="cursor-pointer px-5">
            <ChevronDown />
          </div>
        </div>
        <div className={cn(open ? "flex" : "hidden", "p-3 flex-col gap-3")}>
          {task.time.assigned && (
            <div className="text-[12px] border border-gray-400 rounded-full inline-block w-fit px-2">
              <span>
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(task.time.start)}
              </span>
              &nbsp;-&nbsp;
              <span>
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(task.time.end)}
              </span>
            </div>
          )}
          <div>{task.description}</div>
          <div className="flex gap-2">
            <Dialog open={open1} onOpenChange={setOpen1}>
              <DialogTrigger asChild>
                <Button variant={"outline"} onClick={() => {}}>
                  <Pencil className="size-4" />
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

                    <div className="grid gap-3">
                      <Label htmlFor="color">Select Color</Label>
                      <Select
                        onValueChange={(c) => setTaskColor(c)}
                        value={taskColor}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Color" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(colors).map((c) => (
                            <SelectItem
                              value={colors[c]}
                              key={c}
                              className="cursor-pointer"
                            >
                              <div
                                className="size-4 "
                                style={{ backgroundColor: colors[c] }}
                              ></div>
                              <div>{c}</div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                            color: taskColor,
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
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
