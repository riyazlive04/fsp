"use client";

import { useId, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import {
  experienceLevels,
  lookingForOptions,
  submitEnquiry,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
  type EnquiryIntent,
} from "@/lib/forms";
import { Arrow } from "@/components/ui/Arrow";
import { cn } from "@/lib/cn";

const initial: Enquiry = {
  intent: "join",
  name: "",
  email: "",
  phone: "",
  currentRole: "",
  experienceLevel: "",
  lookingFor: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

const noopSubscribe = () => () => {};

export function EnquiryForm() {
  const [data, setData] = useState<Enquiry>(initial);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Preselect "Talk to us" when arriving from a TALK TO US link (?intent=talk)
  // until the visitor picks an option themselves.
  const [chosenIntent, setChosenIntent] = useState<EnquiryIntent | null>(null);
  const urlIntent = useSyncExternalStore(
    noopSubscribe,
    () => new URLSearchParams(window.location.search).get("intent"),
    () => null,
  );
  const intent: EnquiryIntent = chosenIntent ?? (urlIntent === "talk" ? "talk" : "join");

  const set = <K extends keyof Enquiry>(key: K, value: Enquiry[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = { ...data, intent };
    const found = validateEnquiry(payload);
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    const result = await submitEnquiry(payload);
    if (result.ok) {
      setStatus("success");
      setData(initial);
    } else {
      setStatus("error");
      setErrorText(
        result.reason === "not-configured"
          ? "Online enquiries are not connected yet, so your details were not sent. Please try again later."
          : "We couldn't send your enquiry. Please check your connection and try again.",
      );
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const join = intent === "join";

  return (
    <LazyMotion features={domAnimation} strict>
      <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="form-note" className="relative">
        <fieldset>
          <legend className="eyebrow mb-3 text-muted">I want to</legend>
          <div className="grid grid-cols-2 border border-line-strong p-1">
            {(
              [
                ["join", "Join FSP"],
                ["talk", "Talk to us"],
              ] as [EnquiryIntent, string][]
            ).map(([value, label]) => (
              <label
                key={value}
                className={cn(
                  "relative flex min-h-12 cursor-pointer items-center justify-center text-xs font-semibold uppercase tracking-[0.14em] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy",
                  intent === value ? "text-white" : "text-ink hover:text-navy",
                )}
              >
                {intent === value && (
                  <m.span layoutId="intent-pill" className="absolute inset-0 bg-navy" transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} />
                )}
                <input
                  type="radio"
                  name="intent"
                  value={value}
                  checked={intent === value}
                  onChange={() => setChosenIntent(value)}
                  className="sr-only"
                />
                <span className="relative">{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-10 grid gap-x-6 gap-y-7 md:grid-cols-2">
          <Field label="Name" name="name" required error={errors.name}>
            {(p) => <input {...p} type="text" autoComplete="name" value={data.name} onChange={(e) => set("name", e.target.value)} />}
          </Field>
          <Field label="Email" name="email" required error={errors.email}>
            {(p) => <input {...p} type="email" autoComplete="email" inputMode="email" value={data.email} onChange={(e) => set("email", e.target.value)} />}
          </Field>
          <Field label="Phone" name="phone" required error={errors.phone}>
            {(p) => <input {...p} type="tel" autoComplete="tel" inputMode="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} />}
          </Field>
          <Field label="Current role" name="currentRole" error={errors.currentRole}>
            {(p) => <input {...p} type="text" autoComplete="organization-title" value={data.currentRole} onChange={(e) => set("currentRole", e.target.value)} />}
          </Field>
          <Field label="Experience level" name="experienceLevel" required error={errors.experienceLevel}>
            {(p) => (
              <select {...p} value={data.experienceLevel} onChange={(e) => set("experienceLevel", e.target.value)}>
                <option value="" disabled>
                  Select
                </option>
                {experienceLevels.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            )}
          </Field>
          <Field label="What are you looking for?" name="lookingFor" required error={errors.lookingFor}>
            {(p) => (
              <select {...p} value={data.lookingFor} onChange={(e) => set("lookingFor", e.target.value)}>
                <option value="" disabled>
                  Select
                </option>
                {lookingForOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            )}
          </Field>
          <Field label="Message" name="message" className="md:col-span-2" error={errors.message}>
            {(p) => <textarea {...p} rows={5} value={data.message} onChange={(e) => set("message", e.target.value)} />}
          </Field>
        </div>

        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p id="form-note" className="text-sm text-muted">
            Fields marked <span aria-hidden="true" className="text-navy">*</span>
            <span className="sr-only">with an asterisk</span> are required.
          </p>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="group inline-flex min-h-14 items-center justify-center gap-3 bg-navy px-8 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-ink disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : join ? "Join FSP" : "Talk to us"}
            <Arrow className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>

        <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="mt-8 outline-none">
          <AnimatePresence>
            {status === "success" && (
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="border-l-4 border-orange bg-white p-6"
              >
                <p className="text-lg font-semibold">Thank you — your interest is registered.</p>
                <p className="mt-1 text-muted">The FSP team will contact you with the relevant program details.</p>
              </m.div>
            )}
            {status === "error" && (
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="border-l-4 border-red-700 bg-white p-6"
              >
                <p className="font-semibold text-red-800">{errorText}</p>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </LazyMotion>
  );
}

type FieldProps = {
  id: string;
  name: string;
  required?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  className: string;
};

function Field({
  label,
  name,
  required,
  error,
  className,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: (props: FieldProps) => ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-navy">
            *
          </span>
        )}
      </label>
      {children({
        id,
        name,
        required,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
        className: cn(
          "block min-h-14 w-full appearance-none rounded-none border-0 border-b-2 bg-transparent px-0 py-3 text-lg outline-none transition-colors",
          "focus:border-navy focus-visible:outline-none",
          error ? "border-red-700" : "border-line-strong hover:border-ink/50",
        ),
      })}
      {error && (
        <p id={errorId} className="mt-2 text-sm font-medium text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}
