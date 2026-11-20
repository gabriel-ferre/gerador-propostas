"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  proposalFormSchema,
  slugify,
  paymentOptionsSchema,
  channelSchema,
  proposalStatusSchema,
  CHANNEL_LABELS,
  PROPOSAL_STATUS_LABELS,
  type ProposalFormValues,
  type PaymentOptions,
} from "@/lib/schemas";
import { SITE_URL } from "@/lib/site";
import {
  createProposal,
  updateProposal,
} from "@/app/admin/propostas/actions";

export type FormOptions = {
  pains: { id: string; channel: string; text: string }[];
  cases: { id: string; name: string; niche: string }[];
  plans: { id: string; name: string; payment_options: unknown }[];
};

const CHANNELS = channelSchema.options.map((value) => ({
  value,
  label: CHANNEL_LABELS[value],
}));

const STATUSES = proposalStatusSchema.options.map((value) => ({
  value,
  label: PROPOSAL_STATUS_LABELS[value],
}));

const FORMAS: Record<string, string> = {
  avista: "À vista",
  cartao: "Cartão",
  boleto: "Boleto",
};

const NONE = "__none__";

function planDefaults(
  plans: FormOptions["plans"],
  planId: string | null | undefined,
): PaymentOptions {
  const plan = plans.find((p) => p.id === planId);
  const parsed = paymentOptionsSchema.safeParse(plan?.payment_options);
  return parsed.success ? parsed.data : [];
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-sm text-destructive">
      {message}
    </p>
  );
}

export function ProposalForm({
  options,
  proposalId,
  initial,
}: {
  options: FormOptions;
  proposalId?: string;
  initial?: ProposalFormValues;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(Boolean(proposalId));
  const [usePlanPrice, setUsePlanPrice] = useState(
    !(initial?.price_override && initial.price_override.length > 0),
  );

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: initial ?? {
      company_name: "",
      slug: "",
      channel: "ecommerce",
      highlighted_pain_ids: [],
      case_id: null,
      plan_id: null,
      price_override: null,
      status: "rascunho",
    },
  });

  const slug = useWatch({ control, name: "slug" });
  const channel = useWatch({ control, name: "channel" });
  const planId = useWatch({ control, name: "plan_id" });
  const override = useWatch({ control, name: "price_override" }) ?? [];

  const orderedChannels = [
    channel,
    ...CHANNELS.map((c) => c.value).filter((c) => c !== channel),
  ];

  function onSubmit(values: ProposalFormValues) {
    setFormError(null);
    const payload: ProposalFormValues = {
      ...values,
      price_override: usePlanPrice ? null : values.price_override,
    };
    startTransition(async () => {
      const result = proposalId
        ? await updateProposal(proposalId, payload)
        : await createProposal(payload);
      if (result.ok) {
        router.push("/admin");
        router.refresh();
        return;
      }
      if (result.fieldErrors) {
        for (const [key, message] of Object.entries(result.fieldErrors)) {
          if (key === "_form") setFormError(message);
          else
            setError(key as keyof ProposalFormValues, {
              type: "server",
              message,
            });
        }
      }
      if (result.message) setFormError(result.message);
    });
  }

  function toggleUsePlanPrice(checked: boolean) {
    setUsePlanPrice(checked);
    if (checked) {
      setValue("price_override", null);
    } else {
      setValue("price_override", planDefaults(options.plans, planId));
    }
  }

  function onPlanChange(value: string | null) {
    const id = !value || value === NONE ? null : value;
    setValue("plan_id", id, { shouldValidate: Boolean(errors.plan_id) });
    if (!usePlanPrice)
      setValue("price_override", planDefaults(options.plans, id));
  }

  const caseItems = [
    { value: NONE, label: "Nenhum" },
    ...options.cases.map((c) => ({
      value: c.id,
      label: `${c.name} — ${c.niche}`,
    })),
  ];
  const planItems = [
    { value: NONE, label: "Nenhum" },
    ...options.plans.map((p) => ({ value: p.id, label: p.name })),
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-2xl space-y-8"
      noValidate
    >
      <section className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="company_name">Nome da empresa</Label>
          <Input
            id="company_name"
            autoComplete="off"
            aria-invalid={Boolean(errors.company_name)}
            {...register("company_name", {
              onChange: (e) => {
                if (!slugTouched) {
                  setValue("slug", slugify(e.target.value), {
                    shouldValidate: Boolean(errors.slug),
                  });
                }
              },
            })}
          />
          <FieldError message={errors.company_name?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Endereço da proposta</Label>
          <Input
            id="slug"
            autoComplete="off"
            aria-invalid={Boolean(errors.slug)}
            {...register("slug", { onChange: () => setSlugTouched(true) })}
          />
          <p className="break-all text-sm text-muted-foreground">
            Link: {SITE_URL}/{slug || "…"}
          </p>
          <FieldError message={errors.slug?.message} />
        </div>
      </section>

      <section className="space-y-3">
        <Label>Canal</Label>
        <Controller
          control={control}
          name="channel"
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={(v) => field.onChange(v)}
              className="flex flex-wrap gap-6"
            >
              {CHANNELS.map((c) => (
                <label key={c.value} className="flex items-center gap-2 text-sm">
                  <RadioGroupItem value={c.value} />
                  {c.label}
                </label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError message={errors.channel?.message} />
      </section>

      <section className="space-y-4">
        <Label>Dores destacadas</Label>
        <Controller
          control={control}
          name="highlighted_pain_ids"
          render={({ field }) => (
            <div className="space-y-5">
              {orderedChannels.map((ch) => {
                const list = options.pains.filter((p) => p.channel === ch);
                const label = CHANNELS.find((c) => c.value === ch)?.label;
                return (
                  <fieldset key={ch} className="space-y-2">
                    <legend className="mb-1 text-sm font-medium">{label}</legend>
                    {list.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        Nenhuma dor cadastrada para este canal.
                      </p>
                    )}
                    {list.map((p) => (
                      <label key={p.id} className="flex items-start gap-2 text-sm">
                        <Checkbox
                          checked={field.value.includes(p.id)}
                          onCheckedChange={(c) =>
                            field.onChange(
                              c
                                ? [...field.value, p.id]
                                : field.value.filter((x) => x !== p.id),
                            )
                          }
                        />
                        <span>{p.text}</span>
                      </label>
                    ))}
                  </fieldset>
                );
              })}
            </div>
          )}
        />
        <FieldError message={errors.highlighted_pain_ids?.message} />
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Case</Label>
          <Controller
            control={control}
            name="case_id"
            render={({ field }) => (
              <Select
                items={caseItems}
                value={field.value ?? NONE}
                onValueChange={(v) =>
                  field.onChange(!v || v === NONE ? null : v)
                }
              >
                <SelectTrigger
                  className="w-full"
                  aria-invalid={Boolean(errors.case_id)}
                >
                  <SelectValue placeholder="Escolha um case" />
                </SelectTrigger>
                <SelectContent>
                  {caseItems.map((i) => (
                    <SelectItem key={i.value} value={i.value}>
                      {i.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={errors.case_id?.message} />
        </div>

        <div className="space-y-2">
          <Label>Plano</Label>
          <Select
            items={planItems}
            value={planId ?? NONE}
            onValueChange={onPlanChange}
          >
            <SelectTrigger
              className="w-full"
              aria-invalid={Boolean(errors.plan_id)}
            >
              <SelectValue placeholder="Escolha um plano" />
            </SelectTrigger>
            <SelectContent>
              {planItems.map((i) => (
                <SelectItem key={i.value} value={i.value}>
                  {i.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError message={errors.plan_id?.message} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Switch
            id="use_plan_price"
            checked={usePlanPrice}
            onCheckedChange={toggleUsePlanPrice}
          />
          <Label htmlFor="use_plan_price">Usar preço padrão do plano</Label>
        </div>

        {!usePlanPrice && (
          <div className="space-y-3">
            {override.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Escolha um plano para carregar as formas de pagamento padrão.
              </p>
            )}
            {override.map((row, i) => (
              <div
                key={`${row.forma}-${i}`}
                className="grid gap-2 rounded-lg border p-3 sm:grid-cols-[8rem_1fr_9rem]"
              >
                <div className="space-y-1">
                  <Label className="text-xs">Forma</Label>
                  <p className="flex h-8 items-center text-sm">
                    {FORMAS[row.forma] ?? row.forma}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor={`po-desc-${i}`} className="text-xs">
                    Descrição
                  </Label>
                  <Input
                    id={`po-desc-${i}`}
                    {...register(`price_override.${i}.descricao`)}
                  />
                  <FieldError
                    message={errors.price_override?.[i]?.descricao?.message}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor={`po-valor-${i}`} className="text-xs">
                    Valor (R$)
                  </Label>
                  <Input
                    id={`po-valor-${i}`}
                    type="number"
                    step="0.01"
                    min="0"
                    inputMode="decimal"
                    {...register(`price_override.${i}.valor`, {
                      valueAsNumber: true,
                    })}
                  />
                  <FieldError
                    message={errors.price_override?.[i]?.valor?.message}
                  />
                </div>
              </div>
            ))}
            <FieldError message={errors.price_override?.message} />
          </div>
        )}
      </section>

      <section className="space-y-2">
        <Label>Status</Label>
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={(v) => field.onChange(v)}
              className="flex flex-wrap gap-6"
            >
              {STATUSES.map((s) => (
                <label key={s.value} className="flex items-center gap-2 text-sm">
                  <RadioGroupItem value={s.value} />
                  {s.label}
                </label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError message={errors.status?.message} />
      </section>

      {formError && (
        <p role="alert" className="text-sm text-destructive">
          {formError}
        </p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Salvando…" : "Salvar"}
        </Button>
        <Link
          href="/admin"
          className="inline-flex h-8 items-center rounded-lg border px-2.5 text-sm hover:bg-muted"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
