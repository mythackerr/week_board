"use client";

import { ChevronsUpDown, Plus, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createProject } from "@/lib/DataTypes";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { projectStore, useProject } from "@/app/store";

export default function ProjectSwitcher() {
  const { projects, activeProject } = useProject();
  const [untitledProject, setUntitledProject] = useState("Untitled Project");

  const [open, setOpen] = useState(false);
  const [disButton, setDisButton] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="border rounded-sm flex w-auto items-center px-2 py-3 hover:bg-gray-100 cursor-pointer">
            <div className="grid flex-1 text-left text-sm">
              <span className="font-medium">{activeProject.name}</span>
            </div>
            <ChevronsUpDown className="ml-2" />
            <div />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[250px]"
          align="start"
          side="right"
          sideOffset={4}
        >
          <DropdownMenuLabel>Projects</DropdownMenuLabel>
          {projects.map((project) => (
            <DropdownMenuItem
              key={project.name}
              className="p-0 justify-between"
            >
              <div
                onClick={() => projectStore.setActiveProject(project)}
                className="hover:bg-gray-200 p-3 rounded-sm w-full inset-0"
              >
                {project.name}
              </div>

              <div
                onClick={() => {
                  projectStore.deleteProject(project);
                }}
                className="hover:bg-gray-200 p-3 rounded-sm"
              >
                <Trash2 />
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">
                Add Project
              </div>
            </DropdownMenuItem>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Project Name</Label>
                <Input
                  id="name-1"
                  name="name"
                  value={untitledProject}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUntitledProject(value);
                    const i = projects
                      .map((p) => p.name.trim().toLowerCase())
                      .findIndex((p) => p === value.trim().toLowerCase());
                    if (i < 0) {
                      e.target.classList.remove("text-red-500");
                      setDisButton(false);
                    } else {
                      e.target.classList.add("text-red-500");
                      setDisButton(true);
                    }
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                disabled={disButton}
                type="submit"
                onClick={() => {
                  if (untitledProject) {
                    projectStore.addProject(createProject(untitledProject));

                    setOpen(false);
                  }
                }}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
}
