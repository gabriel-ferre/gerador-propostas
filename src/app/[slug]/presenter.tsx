"use client";

import { createContext, useContext, type ReactNode } from "react";

type PresenterState = { isPresenter: boolean };

const PresenterContext = createContext<PresenterState>({ isPresenter: false });

// O servidor decide (há usuário logado?) e passa o valor pronto.
// Nada visual muda quando isPresenter é true (a tela está sendo compartilhada).
export function PresenterProvider({
  isPresenter,
  children,
}: {
  isPresenter: boolean;
  children: ReactNode;
}) {
  return (
    <PresenterContext.Provider value={{ isPresenter }}>
      {children}
    </PresenterContext.Provider>
  );
}

export function usePresenter() {
  return useContext(PresenterContext);
}
