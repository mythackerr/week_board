"use client";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  LockIcon,
  MoreVerticalIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { type ReactNode, useState, createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import { createTask, TaskGroup } from "@/lib/DataTypes";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { atom, useAtom } from "jotai";
import { projectStore } from "@/store/store";
import { useDroppable } from "@dnd-kit/core";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const OpenContext = createContext({
  open: false,
  setOpen: (p: boolean): boolean => false,
});

export const dialogAtom = atom(false);
export function TGContainer({ children }: { children: ReactNode }) {
  const [open, setOpen] = useAtom(dialogAtom);
  // useEffect(() => {
  //   console.log("hi");
  // }, [open]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex flex-col items-center">{children}</div>
    </Dialog>
  );
}

export function TG({
  children,
  className,
  tg,
}: {
  children: ReactNode;
  className?: string;
  tg: TaskGroup;
}) {
  const [open, setOpen] = useState(false);

  const { isOver, setNodeRef } = useDroppable({
    id: tg.name,
    data: {
      taskGroup: tg,
    },
  });

  const value: { open: boolean; setOpen: (p: boolean) => boolean } = {
    open: open,
    setOpen: setOpen as (p: boolean) => boolean,
  };

  return (
    <OpenContext value={value}>
      <div
        ref={setNodeRef}
        className={cn("w-full p-5", isOver ? "bg-gray-300" : "", className)}
      >
        {children}
      </div>
    </OpenContext>
  );
}

export function TGHeader({ tg }: { tg: TaskGroup }) {
  const { open, setOpen } = useContext(OpenContext);
  const [dOpen, setDOpen] = useState(false);
  const [dOpen1, setDOpen1] = useState(false);
  const [tgTitle, setTGTitle] = useState(tg.name);
  const [taskTilte, setTaskTitle] = useState("Untitled Task");
  const [taskDesciption, setTaskDescription] = useState(
    "A beaultiful task description goes here..."
  );

  function Delete() {
    return (
      <DropdownMenuItem
        className="cursor-pointer"
        onClick={() => {
          projectStore.removeTaskGroup(tg);
        }}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <Trash2Icon className="size-4" />
          <div>Delete</div>
        </div>
      </DropdownMenuItem>
    );
  }

  function Default() {
    return (
      <DropdownMenuItem className="cursor-help">
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center gap-2 cursor-help">
              <LockIcon className="size-4" />
              <div>Default</div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>You can&apos;t delete a default group</p>
          </TooltipContent>
        </Tooltip>
      </DropdownMenuItem>
    );
  }

  return (
    <div className="flex justify-between items-center my-3">
      <div
        className="flex items-center gap-2 flex-1 select-none text-sm cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <ChevronUp className="size-4" />
        ) : (
          <ChevronDown className="size-4" />
        )}

        {tg?.name}
      </div>

      <div className="flex justify-between items-center gap-x-1">
        <Dialog open={dOpen1} onOpenChange={setDOpen1}>
          <DialogTrigger asChild>
            <Button size={"icon-sm"} className="w-12">
              <PlusIcon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Task</DialogTitle>
            </DialogHeader>
            <DialogDescription asChild>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="task-name">Task Name</Label>
                  <Input
                    id="task-name"
                    className="text-black"
                    value={taskTilte}
                    onChange={(e) => setTaskTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="desciption">Description</Label>
                  <Textarea
                    id="description"
                    className="text-black"
                    value={taskDesciption}
                    onChange={(e) => setTaskDescription(e.target.value)}
                  />
                </div>
                <div className="flex gap-3">
                  <DialogClose asChild>
                    <Button variant={"secondary"}>Cancel</Button>
                  </DialogClose>
                  <Button
                    onClick={() => {
                      projectStore.addTask(
                        tg,
                        createTask(taskTilte, taskDesciption)
                      );
                      setDOpen1(false);
                    }}
                  >
                    Done <ArrowUpRight />
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>

        <Dialog open={dOpen} onOpenChange={setDOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon-sm"} variant={"outline"}>
                <MoreVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {
                // eslint-disable-next-line react-hooks/static-components
                tg.def ? <Default /> : <Delete />
              }

              <DialogTrigger asChild>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={(e) => e.preventDefault()}
                >
                  <div className="flex items-center gap-2 cursor-pointer">
                    <PencilIcon />
                    <div>Edit</div>
                  </div>
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Task Group</DialogTitle>
                </DialogHeader>
                <DialogDescription asChild>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="task-name">Task Group Name</Label>
                      <Input
                        id="task-name"
                        className="text-black"
                        value={tgTitle}
                        onChange={(e) => setTGTitle(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-3">
                      <DialogClose asChild>
                        <Button variant={"secondary"}>Cancel</Button>
                      </DialogClose>
                      <Button
                        onClick={() => {
                          projectStore.updateTaskGroup(tg, {
                            ...tg,
                            name: tgTitle,
                          });
                          setDOpen(false);
                        }}
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                </DialogDescription>
              </DialogContent>
            </DropdownMenuContent>
          </DropdownMenu>
        </Dialog>
      </div>
    </div>
  );
}

export function TGButton({ children }: { children: ReactNode }) {
  return <div className="">{children}</div>;
}

export function TaskContainer({ children }: { children: ReactNode }) {
  const { open } = useContext(OpenContext);
  return (
    <div className={cn(open ? "block" : "hidden")}>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}
