"use client";
import {
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useProjectStore } from "@/store/ProjectStore";
import { useAtom } from "jotai";
import { dialogAtom } from ".";
import { projectStore } from "@/store/store";
import { createGroup } from "@/lib/DataTypes";

export function TGCreationDialog() {
  const [, setOpen] = useAtom(dialogAtom);
  const [name, setName] = useState("");
  const [showError, setShowError] = useState(false);

  const { projects, addProject } = useProjectStore();

  function validate_project_name(name: string) {
    const i = projects.findIndex((v) => v.name === name);
    if (i >= 0 || !name.length) {
      return false;
    }

    return true;
  }

  return (
    <DialogContent>
      <DialogTitle>Create a new Task Group</DialogTitle>
      <div className="grid gap-2">
        <div className="grid gap-1.5">
          <label htmlFor="tg_name" className="text-sm font-medium">
            Task Group Name
          </label>
          <Input
            id="tg_name"
            className={cn(showError ? "border-red-500" : "")}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setShowError(false);
            }}
            autoComplete="off"
          />
          {showError && (
            <p className="text-sm text-red-500">
              {!name.length ? (
                "Empty name not allowed!"
              ) : (
                <span>
                  Task Group <u>{name}</u> already exist!
                </span>
              )}
            </p>
          )}
        </div>
        <DialogDescription asChild>
          <div className="text-sm font-normal leading-4">
            TaskGroup is a way to organize tasks. You can drag task from one
            group to another.
          </div>
        </DialogDescription>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button
          onClick={() => {
            const valid = validate_project_name(name);
            if (valid) {
              setShowError(false);
              projectStore.addTaskGroup(createGroup(name));
              // setProjects([...projects, createProject(name)]);

              setOpen(false);
              setName("");
            } else {
              setShowError(true);
            }
          }}
        >
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
