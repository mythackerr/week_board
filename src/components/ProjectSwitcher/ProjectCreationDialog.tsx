import {
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { dialogOpenAtom } from ".";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { projectStore, useProject } from "@/store/store";
import { createProject } from "@/lib/DataTypes";

export function ProjectCreationDialog() {
  const [name, setName] = useState("");
  const [showError, setShowError] = useState(false);
  const [, setOpen] = useAtom(dialogOpenAtom);
  const { projects } = useProject();

  function validate_project_name(name: string) {
    const i = projects.findIndex((v) => v.name === name);
    if (i >= 0 || !name.length) {
      return false;
    }

    return true;
  }

  return (
    <DialogContent>
      <DialogTitle>Create a new project</DialogTitle>
      <div className="grid gap-2">
        <div className="grid gap-1.5">
          <label htmlFor="project_name" className="text-sm font-medium">
            Project Name
          </label>
          <Input
            id="project_name"
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
                  Project <u>{name}</u> already exist!
                </span>
              )}
            </p>
          )}
        </div>
        <DialogDescription asChild>
          <div className="text-sm font-normal leading-4">
            Project is a way to organize task groups. Tasks under one project
            won&apos;t be visible in the other.
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
              projectStore.addProject(createProject(name));
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
