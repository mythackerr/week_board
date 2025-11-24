"use client";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { width } from ".";
import { AddProject, ProjectItem } from "./ProjectItem";
import { ProjectCreationDialog } from "./ProjectCreationDialog";
import { useProject } from "@/store/store";

export default function Content() {
  const { projects } = useProject();

  return (
    <DropdownMenuContent style={{ width }} className="">
      {projects.map((p) => (
        <ProjectItem project={p} key={p.name} />
      ))}
      <AddProject />
      <ProjectCreationDialog />
    </DropdownMenuContent>
  );
}
