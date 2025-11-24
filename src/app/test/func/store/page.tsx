"use client";

import ProjectSwitcher from "@/components/ProjectSwitcher";
import { TG, TGHeader } from "@/components/TaskGroup";
import { useProject } from "@/store/store";

export default function Page() {
  const { activeProject } = useProject();
  return (
    <div className="p-5">
      <ProjectSwitcher />
      {activeProject.getAllTaskGroups().map((tg) => {
        return (
          <TG key={tg.name} tg={tg}>
            <TGHeader tg={tg} />
          </TG>
        );
      })}
    </div>
  );
}
