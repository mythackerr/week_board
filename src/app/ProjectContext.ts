import { Project } from "@/src/lib/DataTypes";
import { createContext, useContext } from "react";

type SigProjectContext = {
  addProject: (p: Project) => void;
  setActiveProject: (p: Project) => void;
};
const ProjectContext = createContext<SigProjectContext | null>(null);

export function useProjectContext() {
  const projectContext = useContext(ProjectContext);
  if (!projectContext)
    throw Error(
      "useProjectContext is only available to ProjectContext.Provider's children"
    );
  return projectContext;
}

export default ProjectContext;
