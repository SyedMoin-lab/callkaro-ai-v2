import { Marquee } from "@/common/customUI/marquee"
import { CompanyLogos } from "@/common/icons/companies"

function TrustBar({ text }: { text: string }) {
  return (
    <section className="border-t py-10 md:py-12">
      <div className="container">
        <p className="text-center font-mono text-xs tracking-[0.2em] wrap-break-word text-muted-foreground uppercase">
          {text}
        </p>
      </div>

      <div className="relative mt-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <Marquee pauseOnHover className="[--gap:3rem]">
          <CompanyLogos />
        </Marquee>
      </div>
    </section>
  )
}

export default TrustBar
