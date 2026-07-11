import type { Metadata } from "next"

import SignupForm from "./_form"
import SignupIntro from "./_intro"

export const metadata: Metadata = {
  title: "Sign up",
  description:
    "Create your CallKaro AI account and take your first step to 5x business engagement with AI.",
}

export default function SignUpPage() {
  return (
    <div className="grid min-h-dvh grid-cols-1 lg:h-dvh lg:grid-cols-2 lg:overflow-hidden">
      <SignupIntro />
      <div className="flex items-center justify-center overflow-y-auto px-6 py-8 md:px-12 lg:px-16">
        <div className="w-full max-w-lg">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}
