"use client";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { ReactNode, useState, createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import { TaskGroup } from "@/lib/DataTypes";
import { projectStore } from "@/app/store";

const OpenContext = createContext({
  open: false,
  setOpen: (p: boolean): boolean => false,
});
interface PropsTGContainer {
  children: ReactNode;
  className?: string;
}

export function TGContainer({ children, className }: PropsTGContainer) {
  const [open, setOpen] = useState(false);

  const value: { open: boolean; setOpen: (p: boolean) => boolean } = {
    open: open,
    setOpen: setOpen as (p: boolean) => boolean,
  };

  return (
    <OpenContext value={value}>
      <div className={cn("m-5 rounded-md overflow-hidden", className)}>
        {children}
      </div>
    </OpenContext>
  );
}

export function TGHeader({
  tg,
  action,
}: {
  tg: TaskGroup;

  action: ReactNode;
}) {
  const { open, setOpen } = useContext(OpenContext);

  return (
    <div className="flex justify-between items-center ">
      <div
        className="select-none text-sm flex gap-3 flex-1 p-1 items-center"
        onClick={() => setOpen(!open)}
      >
        {open ? <ChevronUp /> : <ChevronDown />}

        {tg?.name}
      </div>
      <div className="flex justify-between items-center gap-x-5">
        <div
          className="cursor-pointer"
          onClick={() => {
            projectStore.removeTaskGroup(tg);
          }}
        >
          <Trash2 className="size-4" />
        </div>
        <div>{action}</div>
      </div>
    </div>
  );
}

export function TGButton({ children }: { children: ReactNode }) {
  return <div className="">{children}</div>;
}

export function TaskContainer({ children }: { children: ReactNode }) {
  const { open } = useContext(OpenContext);
  return (
    <div className={cn(open ? "block" : "hidden")}>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}
