"use client";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function TGAction() {
  return (
    <div className="w-full p-5">
      <DialogTrigger asChild>
        <Button className="w-full cursor-pointer">Add Task Group</Button>
      </DialogTrigger>
    </div>
  );
}
