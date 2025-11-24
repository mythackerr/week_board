"use client";
import { createContext, ReactNode, useContext, useState } from "react";

const DialogContext = createContext({
  open: false,
  setOpen: (p: boolean): void => {},
});

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, _setOpen] = useState(true);
  return (
    <DialogContext.Provider
      value={{
        open,
        setOpen: (p) => {
          _setOpen(p);
        },
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) throw Error("useDialog context error");
  return context;
}
