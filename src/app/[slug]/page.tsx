import { Fragment } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isPresenter, loadProposalPage } from "@/lib/proposal";
import { sections } from "@/components/sections";
import { DeckPage } from "@/components/ui-retrieve";
import { PresenterProvider } from "./presenter";

// Página privada, sempre dinâmica (sessão + views): permite bloquear no servidor.
// instant=false só desliga a validação; NÃO muda o status HTTP. Com Cache
// Components o shell sai antes do notFound() (200 + noindex). O 404 HTTP real
// precisa ser checado no proxy (pendente de decisão).
export const instant = false;

export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const data = await loadProposalPage(slug);
  return {
    title: data
      ? `Proposta Retrieve · ${data.proposal.companyName}`
      : "Proposta Retrieve",
    robots: { index: false, follow: false },
  };
}

export default async function ProposalPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const data = await loadProposalPage(slug);
  if (!data) notFound();
  const presenter = await isPresenter();

  return (
    <PresenterProvider isPresenter={presenter}>
      <DeckPage>
        <main>
          {sections.map((s) => (
            <Fragment key={s.key}>{s.render(data)}</Fragment>
          ))}
        </main>
      </DeckPage>
    </PresenterProvider>
  );
}
