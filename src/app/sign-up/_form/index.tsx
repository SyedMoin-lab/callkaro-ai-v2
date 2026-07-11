"use client"

import { type FormEvent, useCallback, useState } from "react"
import { CheckCircle2, Loader2, MoveUpRight } from "lucide-react"

import { Button } from "@/common/shadcnUI/button"
import { Field, FieldLabel } from "@/common/shadcnUI/field"
import { Input } from "@/common/shadcnUI/input"
import { RadioGroup, RadioGroupItem } from "@/common/shadcnUI/radioGroup"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/shadcnUI/select"
import { cn } from "@/lib/utils"

const COUNTRY_CODES = [
  { code: "+91", label: "IN +91" },
  { code: "+1", label: "US +1" },
  { code: "+44", label: "UK +44" },
  { code: "+971", label: "AE +971" },
  { code: "+65", label: "SG +65" },
  { code: "+61", label: "AU +61" },
]

const INDUSTRIES = [
  "Technology / SaaS",
  "E-commerce & Retail",
  "Healthcare",
  "Education",
  "Finance & Insurance",
  "Real Estate",
  "Travel & Hospitality",
  "Marketing & Advertising",
  "Manufacturing",
  "Professional Services",
  "Other",
]

const ORG_SIZES = [
  "1-10 employees",
  "10-20 employees",
  "20-50 employees",
  "50-200 employees",
  "200+ employees",
]

type Status = "idle" | "submitting" | "success"

function RequiredMark() {
  return (
    <span aria-hidden className="text-accent">
      *
    </span>
  )
}

export default function SignupForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [orgSize, setOrgSize] = useState("")

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("submitting")
    // Simulate handing off to the secure payment step.
    window.setTimeout(() => setStatus("success"), 1200)
  }, [])

  const locked = status === "submitting" || status === "success"

  return (
    <div className="w-full">
      <h2 className="text-2xl font-light tracking-tight md:text-3xl">
        Tell Us About Your Business
      </h2>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <fieldset
          disabled={locked}
          className="space-y-4 transition-opacity disabled:opacity-60"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="name">
                Name <RequiredMark />
              </FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className="h-10"
              />
            </Field>

            <Field className="gap-1.5">
              <FieldLabel htmlFor="email">
                Email Address <RequiredMark />
              </FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                autoComplete="email"
                required
                className="h-10"
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="organisation">
                Organisation Name <RequiredMark />
              </FieldLabel>
              <Input
                id="organisation"
                name="organisation"
                placeholder="Enter your organization name"
                autoComplete="organization"
                required
                className="h-10"
              />
            </Field>

            <Field className="gap-1.5">
              <FieldLabel htmlFor="industry">
                Industry <RequiredMark />
              </FieldLabel>
              <Select name="industry" required>
                <SelectTrigger id="industry" className="h-10 w-full">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field className="gap-1.5">
            <FieldLabel htmlFor="phone">
              Phone Number <RequiredMark />
            </FieldLabel>
            <div className="flex h-10 items-center rounded-md border border-transparent bg-input/50 transition-[color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30">
              <Select name="countryCode" defaultValue="+91">
                <SelectTrigger
                  aria-label="Country dialing code"
                  className="h-10 shrink-0 rounded-e-none border-0 bg-transparent px-3 focus-visible:border-transparent focus-visible:ring-0"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRY_CODES.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span aria-hidden className="h-5 w-px bg-border" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Enter your phone number"
                required
                className="h-10 border-0 bg-transparent focus-visible:border-transparent focus-visible:ring-0"
              />
            </div>
          </Field>

          <fieldset className="space-y-2">
            <legend className="text-sm leading-snug font-medium">
              Your Organisation Size <RequiredMark />
            </legend>
            <RadioGroup
              name="organisationSize"
              value={orgSize}
              onValueChange={setOrgSize}
              required
              className="grid-cols-2 gap-2.5"
            >
              {ORG_SIZES.map((size) => {
                const selected = orgSize === size
                const id = `org-size-${size.replace(/\W+/g, "-")}`
                return (
                  <label
                    key={size}
                    htmlFor={id}
                    className={cn(
                      "flex cursor-pointer items-center gap-2.5 rounded-md border bg-background px-3 py-2 text-sm transition-colors",
                      selected
                        ? "border-accent bg-accent/10 font-medium"
                        : "border-border hover:border-accent/50"
                    )}
                  >
                    <RadioGroupItem id={id} value={size} />
                    <span>{size}</span>
                  </label>
                )
              })}
            </RadioGroup>
          </fieldset>
        </fieldset>

        {status === "success" && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-md border border-accent/30 bg-accent/10 p-3 text-sm text-foreground"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
            <span>Details received. Redirecting you to secure payment…</span>
          </div>
        )}

        <Button type="submit" size="lg" disabled={locked} className="w-full">
          {status === "submitting" ? (
            <>
              <Loader2 className="animate-spin" />
              Processing…
            </>
          ) : (
            <>
              Continue to Payment
              <MoveUpRight />
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
