import type { Metadata } from "next"
import Link from "next/link"

import LoginForm from "./_form"

export const metadata: Metadata = {
  title: "Log in",
  description:
    "Log in to your CallKaro AI account to manage your always-on AI voice agents.",
}

export default function LoginPage() {
  return (
    <div className="grid min-h-dvh grid-cols-1 lg:h-dvh lg:grid-cols-2 lg:overflow-hidden">
      {/* Visual panel — background image from /public */}
      <div className="dark relative hidden overflow-hidden bg-background text-foreground lg:block">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/login-bg.jpg)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/25"
        />

        <div className="relative flex h-full flex-col justify-between p-12">
          <Link href="/" className="flex w-fit items-center gap-2.5">
            <span className="text-xl font-medium tracking-tight">
              CallKaro AI
            </span>
          </Link>

          <div className="max-w-md">
            <h2 className="text-3xl leading-[1.1] font-light tracking-tight text-balance lg:text-4xl">
              Welcome back to <span className="text-accent">always-on</span>{" "}
              voice AI.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/75">
              Every call answered, every lead captured — pick up right where you
              left off.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center overflow-y-auto px-6 py-8 md:px-12 lg:px-16">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
