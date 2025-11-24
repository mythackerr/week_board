import { useProjectStore } from "@/store/ProjectStore";
import { DialogTrigger } from "@/components/ui/dialog";
import { LockIcon, Trash2Icon } from "lucide-react";
import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Project } from "@/lib/DataTypes";
import { projectStore, useProject } from "@/store/store";

export function ProjectItem({ project }: { project: Project }) {
  // const { projects, removeProject, setActiveProject, activeProject } =
  const { projects, activeProject } = useProject();

  function Delete() {
    return (
      <button
        className=" relative cursor-pointer hover:text-red-700"
        onClick={() => {
          if (activeProject.name === project.name)
            projectStore.setActiveProject(project);
          projectStore.deleteProject(project);
        }}
      >
        <Trash2Icon className="size-4" />
      </button>
    );
  }

  function Default() {
    return (
      <div>
        <Tooltip>
          <TooltipTrigger>
            <LockIcon className="size-4" />
          </TooltipTrigger>
          <TooltipContent>
            <p>You can&apos;t delete a default project</p>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }

  function handleOnSelect() {
    // setActiveProject(project);
    projectStore.setActiveProject(project);
  }
  return (
    <Item>
      <button
        onClick={handleOnSelect}
        className="cursor-pointer  block w-full text-left"
      >
        {project.name}
      </button>
      {
        // eslint-disable-next-line react-hooks/static-components
        project.def ? <Default /> : <Delete />
      }
    </Item>
  );
}

export function AddProject() {
  return (
    <div className="px-1">
      <DialogTrigger asChild>
        <button className="p-2 bg-primary text-primary-foreground hover:bg-primary/90 w-full mt-3 rounded-md text-sm cursor-pointer">
          Add Project
        </button>
      </DialogTrigger>
    </div>
  );
}

function Item({ children }: { children: ReactNode }) {
  return (
    <DropdownMenuItem className="outline-0 flex justify-between items-center rounded-md text-sm hover:bg-secondary overflow-hidden *:p-2">
      {children}
    </DropdownMenuItem>
  );
}
