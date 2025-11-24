"use client";
import { Showcase } from "@/components/Showcase";
import { TGContainer, TGHeader, TG } from "@/components/TaskGroup";
import TGAction from "@/components/TaskGroup/TGAction";
import { TGCreationDialog } from "@/components/TaskGroup/TGCreationDialog";
import { createGroup } from "@/lib/DataTypes";

export default function page() {
  return (
    <Showcase>
      <TGContainer>
        <TG className="w-[400px]" tg={createGroup("another", true)}>
          <TGHeader tg={createGroup("test", true)} />
        </TG>

        <hr />

        <TG tg={createGroup("another")}>
          <TGHeader tg={createGroup("another")} />
        </TG>

        <TGAction />
        <TGCreationDialog />
      </TGContainer>
    </Showcase>
  );
}
