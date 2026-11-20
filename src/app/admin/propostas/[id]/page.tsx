import { notFound } from "next/navigation";
import { z } from "zod";
import { ProposalForm } from "@/components/admin/proposal-form";
import { paymentOptionsSchema, type ProposalFormValues } from "@/lib/schemas";
import { loadFormOptions, loadProposal } from "../queries";

export default async function EditarPropostaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();

  const [options, proposal] = await Promise.all([
    loadFormOptions(),
    loadProposal(id),
  ]);
  if (!proposal) notFound();

  const override = paymentOptionsSchema.safeParse(proposal.price_override);
  const initial: ProposalFormValues = {
    company_name: proposal.company_name,
    slug: proposal.slug,
    channel: proposal.channel as ProposalFormValues["channel"],
    highlighted_pain_ids: proposal.highlighted_pain_ids,
    case_id: proposal.case_id,
    plan_id: proposal.plan_id,
    price_override:
      override.success && override.data.length > 0 ? override.data : null,
    status: proposal.status as ProposalFormValues["status"],
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold">Editar proposta</h1>
      <ProposalForm options={options} proposalId={proposal.id} initial={initial} />
    </div>
  );
}
