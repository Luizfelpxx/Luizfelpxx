import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
      <Image
        src="/editorial/hero.png"
        alt="Campanha NOIR Studio — coleção primavera"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-foreground/10 to-foreground/20" />

      <div className="relative flex h-full flex-col items-center justify-end pb-20 text-center md:items-start md:pb-24 md:pl-16 md:text-left">
        <div className="animate-fade-in-up px-6 md:px-0" style={{ animationDelay: '200ms' }}>
          <p className="text-[0.7rem] uppercase tracking-luxe text-background/90">
            Coleção Primavera 2026
          </p>
          <h1 className="mt-4 max-w-xl text-balance font-serif text-5xl font-light leading-[0.95] text-background md:text-7xl">
            O essencial, reimaginado
          </h1>
          <p className="mx-auto mt-5 max-w-md text-pretty text-sm leading-relaxed text-background/85 md:mx-0">
            Alfaiataria contemporânea e peças atemporais em tecidos nobres.
            Feito para acompanhar cada gesto.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start">
            <Link
              href="/#colecao"
              className="w-full bg-background px-10 py-4 text-center text-[0.7rem] uppercase tracking-wide-sm text-foreground transition-opacity hover:opacity-90 sm:w-auto"
            >
              Ver coleção
            </Link>
            <Link
              href="/#campanha"
              className="w-full border border-background/60 px-10 py-4 text-center text-[0.7rem] uppercase tracking-wide-sm text-background transition-colors hover:bg-background hover:text-foreground sm:w-auto"
            >
              A campanha
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
