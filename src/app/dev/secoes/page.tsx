import { notFound } from "next/navigation";
import { Vitrine } from "./vitrine";

export const metadata = { title: "Vitrine de componentes | Retrieve" };

export default function VitrinePage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <Vitrine />;
}
