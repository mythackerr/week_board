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
import { DialogClose } from "@radix-ui/react-dialog";

import { ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("unknown task");
  const [description, setDescription] = useState("Placeholder description....");
  return (
    <div className="p-5">
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            Add Task <Plus />
          </Button>
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
                <Button>
                  Done <ArrowUpRight />
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
