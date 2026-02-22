"use client";

import { createContext, useContext } from "react";

const AdminPasswordContext = createContext<string>("");

export function AdminPasswordProvider({ password, children }: { password: string; children: React.ReactNode }) {
  return (
    <AdminPasswordContext.Provider value={password}>
      {children}
    </AdminPasswordContext.Provider>
  );
}

export function useAdminPassword() {
  return useContext(AdminPasswordContext);
}
