import { Camera } from 'lucide-react'
import Link from 'next/link'
import { storeConfig } from '@/lib/store-config'

const columns = [
  {
    title: 'Loja',
    links: ['Feminino', 'Masculino', 'Novidades', 'Coleções', 'Sale'],
  },
  {
    title: 'Ajuda',
    links: ['Trocas e devoluções', 'Guia de tamanhos', 'Envio e prazos', 'Perguntas frequentes'],
  },
  {
    title: 'Institucional',
    links: ['Sobre a NOIR', 'Sustentabilidade', 'Lojas físicas', 'Trabalhe conosco'],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="font-serif text-3xl font-light tracking-[0.2em]">
              {storeConfig.name.split(' ')[0]}
              <span className="text-muted-foreground"> Studio</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Peças essenciais de moda com estética editorial e acabamento premium.
              Feito para durar temporadas.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={`https://instagram.com/${storeConfig.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-foreground hover:text-primary-foreground"
              >
                <Camera className="size-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs uppercase tracking-wide-sm text-muted-foreground">
                {col.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="/"
                      className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {storeConfig.name}. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>{storeConfig.email}</span>
            <Link href="/" className="transition-colors hover:text-foreground">
              Política de privacidade
            </Link>
            <Link href="/" className="transition-colors hover:text-foreground">
              Termos de uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
