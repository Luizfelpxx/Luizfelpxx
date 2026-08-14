import { Camera } from 'lucide-react'
import Image from 'next/image'
import { Reveal } from '@/components/site/reveal'
import { storeConfig } from '@/lib/store-config'

const shots = [
  '/editorial/lifestyle-1.png',
  '/editorial/lifestyle-2.png',
  '/editorial/lifestyle-3.png',
  '/editorial/lifestyle-4.png',
]

export function Lifestyle() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
      <Reveal className="mb-10 text-center md:mb-14">
        <p className="text-[0.7rem] uppercase tracking-luxe text-muted-foreground">
          NOIR na rua
        </p>
        <h2 className="mt-3 font-serif text-4xl font-light md:text-5xl">
          @{storeConfig.instagram}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          Marque suas fotos e apareça no nosso feed. Inspire e seja inspirado.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {shots.map((src, i) => (
          <Reveal key={src} delay={i * 100}>
            <a
              href={`https://instagram.com/${storeConfig.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden bg-muted"
            >
              <Image
                src={src || '/placeholder.svg'}
                alt="Look NOIR Studio no Instagram"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-all duration-500 group-hover:bg-foreground/30 group-hover:opacity-100">
                <Camera className="size-7 text-background" strokeWidth={1.25} />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
