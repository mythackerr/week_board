import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronsUpDown } from "lucide-react";
import { width } from ".";
import { useAtom } from "jotai";
import { useProjectStore } from "@/store/ProjectStore";
import { useProject } from "@/store/store";

export default function Trigger() {
  const { activeProject } = useProject();
  return (
    <DropdownMenuTrigger
      style={{ width }}
      className={`border rounded-sm flex items-center px-2 py-3 hover:bg-accent cursor-pointer`}
    >
      <div className="flex-1 text-sm font-medium text-left overflow-hidden">
        {activeProject.name}
      </div>
      <ChevronsUpDown className="ml-2 size-4" />
    </DropdownMenuTrigger>
  );
}
