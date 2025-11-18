"use client";
import { Button } from "@/components/ui/button";
import { createProject } from "@/lib/DataTypes";
import { v4 } from "uuid";
import { useProject, projectStore } from "../../store";

import ProjectSwitcher from "@/components/ProjectSwitcher";

export default function Page() {
  return (
    <div className="p-5 grid gap-3">
      <div className="flex gap-3">
        <ProjectSwitcher />
        <Button
          onClick={() => {
            projectStore.addProject(createProject(v4()));
          }}
        >
          Add Dummy Project
        </Button>
      </div>
      <CurrentProject />
    </div>
  );
}

function CurrentProject() {
  const { activeProject } = useProject();
  return <div>Project Name: {activeProject.name}</div>;
}
