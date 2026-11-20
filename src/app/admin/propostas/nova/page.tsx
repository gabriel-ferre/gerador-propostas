import { ProposalForm } from "@/components/admin/proposal-form";
import { loadFormOptions } from "../queries";

export default async function NovaPropostaPage() {
  const options = await loadFormOptions();
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold">Nova proposta</h1>
      <ProposalForm options={options} />
    </div>
  );
}
