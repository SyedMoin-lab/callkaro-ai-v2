"use client"

import { type FormEvent, useCallback, useState } from "react"
import Link from "next/link"
import { Loader2, MoveUpRight } from "lucide-react"

import { Button } from "@/common/shadcnUI/button"
import { Field, FieldLabel } from "@/common/shadcnUI/field"
import { Input } from "@/common/shadcnUI/input"

type Status = "idle" | "submitting"

export default function LoginForm() {
  const [status, setStatus] = useState<Status>("idle")

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("submitting")
    // Placeholder — wire up real auth here.
    window.setTimeout(() => setStatus("idle"), 1200)
  }, [])

  const locked = status === "submitting"

  return (
    <div className="w-full">
      <h1 className="text-2xl font-light tracking-tight md:text-3xl">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Log in to your CallKaro AI account.
      </p>

      <form onSubmit={onSubmit} className="mt-7 space-y-4">
        <fieldset
          disabled={locked}
          className="space-y-4 transition-opacity disabled:opacity-60"
        >
          <Field className="gap-1.5">
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
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

          <Field className="gap-1.5">
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                href="#"
                className="text-xs text-accent underline-offset-4 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="h-10"
            />
          </Field>
        </fieldset>

        <Button type="submit" size="lg" disabled={locked} className="w-full">
          {status === "submitting" ? (
            <>
              <Loader2 className="animate-spin" />
              Logging in…
            </>
          ) : (
            <>
              Log in
              <MoveUpRight />
            </>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}
