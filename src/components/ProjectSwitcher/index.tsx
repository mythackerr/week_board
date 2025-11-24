"use client";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import Trigger from "./Trigger";
import Content from "./Content";
import { Dialog } from "@/components/ui/dialog";
import { atom, useAtom } from "jotai";

export const width = "315px";
export const dialogOpenAtom = atom(false);

export default function ProjectSwitcher() {
  const [open, setOpen] = useAtom(dialogOpenAtom);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <Trigger />
        <Content />
      </DropdownMenu>
    </Dialog>
  );
}
