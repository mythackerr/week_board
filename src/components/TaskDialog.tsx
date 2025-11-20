"use client";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Dialog,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createTask, TaskGroup } from "@/lib/DataTypes";
import { DialogClose } from "@radix-ui/react-dialog";

import { ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import { projectStore } from "@/app/store";

export default function TaskDialog({ tg }: { tg: TaskGroup }) {
  const [title, setTitle] = useState("unknown task");
  const [description, setDescription] = useState("Placeholder description....");
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="bg-primary text-primary-foreground rounded-sm p-1">
          <Plus className="size-4" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
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
                  const task = createTask(title, description);
                  projectStore.addTask(tg, task);

                  setOpen(false);
                }}
              >
                Done <ArrowUpRight />
              </Button>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
