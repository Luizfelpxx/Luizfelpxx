import Image from 'next/image'
import Link from 'next/link'

export function CampaignBanner() {
  return (
    <section id="campanha" className="relative scroll-mt-24">
      <div className="relative h-[80vh] min-h-[520px] w-full overflow-hidden">
        <Image
          src="/editorial/campaign.png"
          alt="Editorial NOIR Studio — coleção Concrete"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-foreground/35" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="text-[0.7rem] uppercase tracking-luxe text-background/90">
            Editorial 01
          </p>
          <h2 className="mt-5 max-w-2xl text-balance font-serif text-5xl font-light leading-[0.95] text-background md:text-7xl">
            Concrete Minimal
          </h2>
          <p className="mt-5 max-w-lg text-pretty text-sm leading-relaxed text-background/85">
            Uma ode às formas puras e à sobriedade. Linhas retas, volumes generosos
            e uma paleta que respira. A nova coleção nasce do concreto.
          </p>
          <Link
            href="/#colecao"
            className="mt-8 border border-background/70 px-10 py-4 text-[0.7rem] uppercase tracking-wide-sm text-background transition-colors hover:bg-background hover:text-foreground"
          >
            Descobrir a coleção
          </Link>
        </div>
      </div>
    </section>
  )
}
