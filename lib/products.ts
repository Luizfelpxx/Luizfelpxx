export type ColorOption = {
  name: string
  hex: string
}

export type Product = {
  slug: string
  name: string
  price: number
  category: 'Camisetas' | 'Calças' | 'Jaquetas' | 'Vestidos' | 'Acessórios'
  gender: 'Feminino' | 'Masculino' | 'Unissex'
  isNew?: boolean
  isBestSeller?: boolean
  onSale?: boolean
  oldPrice?: number
  images: string[]
  colors: ColorOption[]
  sizes: string[]
  shortDescription: string
  description: string
  care: string[]
  measurements: { label: string; value: string }[]
}

export const products: Product[] = [
  {
    slug: 'camiseta-essential',
    name: 'Camiseta Essential',
    price: 149,
    category: 'Camisetas',
    gender: 'Unissex',
    isBestSeller: true,
    images: ['/products/camiseta-essential-1.png', '/products/camiseta-essential-2.png'],
    colors: [
      { name: 'Off-white', hex: '#EDEAE3' },
      { name: 'Preto', hex: '#1A1A1A' },
      { name: 'Areia', hex: '#C9BBA6' },
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    shortDescription: 'Algodão pima de gramatura pesada com caimento reto.',
    description:
      'A base do guarda-roupa NOIR. Confeccionada em algodão pima de gramatura pesada, a Camiseta Essential tem caimento reto e toque encorpado que resiste ao uso diário sem perder a forma. Um clássico atemporal pensado para durar temporadas.',
    care: [
      'Lave à máquina com água fria',
      'Não use alvejante',
      'Seque à sombra',
      'Passe em temperatura média',
    ],
    measurements: [
      { label: 'P', value: 'Busto 96cm · Comprimento 68cm' },
      { label: 'M', value: 'Busto 102cm · Comprimento 70cm' },
      { label: 'G', value: 'Busto 108cm · Comprimento 72cm' },
      { label: 'GG', value: 'Busto 114cm · Comprimento 74cm' },
    ],
  },
  {
    slug: 'calca-alfaiataria',
    name: 'Calça Alfaiataria',
    price: 389,
    category: 'Calças',
    gender: 'Feminino',
    isBestSeller: true,
    images: ['/products/calca-alfaiataria-1.png', '/products/calca-alfaiataria-2.png'],
    colors: [
      { name: 'Areia', hex: '#C9BBA6' },
      { name: 'Preto', hex: '#1A1A1A' },
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    shortDescription: 'Modelagem pantalona com prega e cintura alta.',
    description:
      'Estruturada e fluida ao mesmo tempo. A Calça Alfaiataria tem cintura alta, prega frontal e caimento pantalona que alonga a silhueta. Um coringa entre o dia e a noite, do escritório ao jantar.',
    care: [
      'Lavagem a seco recomendada',
      'Não torça',
      'Passe do avesso',
      'Guarde pendurada',
    ],
    measurements: [
      { label: 'P', value: 'Cintura 66cm · Comprimento 104cm' },
      { label: 'M', value: 'Cintura 72cm · Comprimento 106cm' },
      { label: 'G', value: 'Cintura 78cm · Comprimento 108cm' },
      { label: 'GG', value: 'Cintura 84cm · Comprimento 110cm' },
    ],
  },
  {
    slug: 'jaqueta-oversized',
    name: 'Jaqueta Oversized',
    price: 599,
    category: 'Jaquetas',
    gender: 'Masculino',
    isNew: true,
    images: ['/products/jaqueta-oversized-1.png', '/products/jaqueta-oversized-2.png'],
    colors: [
      { name: 'Grafite', hex: '#3A3A3C' },
      { name: 'Preto', hex: '#1A1A1A' },
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    shortDescription: 'Sarja encorpada com ombros caídos e caimento amplo.',
    description:
      'Peça-declaração da nova coleção. A Jaqueta Oversized combina sarja encorpada, ombros caídos e volume generoso para um streetwear refinado. Feita para ser usada por cima de tudo.',
    care: [
      'Lave à máquina com água fria',
      'Não use alvejante',
      'Seque à sombra',
      'Passe em temperatura baixa',
    ],
    measurements: [
      { label: 'P', value: 'Peito 116cm · Comprimento 70cm' },
      { label: 'M', value: 'Peito 122cm · Comprimento 72cm' },
      { label: 'G', value: 'Peito 128cm · Comprimento 74cm' },
      { label: 'GG', value: 'Peito 134cm · Comprimento 76cm' },
    ],
  },
  {
    slug: 'camisa-linho',
    name: 'Camisa de Linho',
    price: 329,
    category: 'Camisetas',
    gender: 'Masculino',
    isNew: true,
    images: ['/products/camisa-linho-1.png', '/products/camisa-linho-2.png'],
    colors: [
      { name: 'Areia', hex: '#C9BBA6' },
      { name: 'Off-white', hex: '#EDEAE3' },
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    shortDescription: 'Linho puro com caimento relaxado e respirável.',
    description:
      'Leveza e sofisticação em linho puro. A Camisa de Linho tem caimento relaxado, respirável e ideal para os dias quentes, com acabamento amassado natural que é a assinatura do tecido.',
    care: [
      'Lave à mão ou ciclo delicado',
      'Não use alvejante',
      'Seque à sombra',
      'Passe ainda úmida',
    ],
    measurements: [
      { label: 'P', value: 'Peito 104cm · Comprimento 72cm' },
      { label: 'M', value: 'Peito 110cm · Comprimento 74cm' },
      { label: 'G', value: 'Peito 116cm · Comprimento 76cm' },
      { label: 'GG', value: 'Peito 122cm · Comprimento 78cm' },
    ],
  },
  {
    slug: 'vestido-slip',
    name: 'Vestido Slip',
    price: 459,
    oldPrice: 589,
    onSale: true,
    category: 'Vestidos',
    gender: 'Feminino',
    isBestSeller: true,
    images: ['/products/vestido-slip-1.png', '/products/vestido-slip-2.png'],
    colors: [
      { name: 'Champagne', hex: '#D9C7AE' },
      { name: 'Preto', hex: '#1A1A1A' },
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    shortDescription: 'Cetim fluido com corte enviesado e alças finas.',
    description:
      'Elegância minimalista em cetim de toque acetinado. O Vestido Slip tem corte enviesado que acompanha o corpo com fluidez e alças finas reguláveis. Do brunch ao evento noturno.',
    care: [
      'Lavagem a seco recomendada',
      'Não torça',
      'Seque na horizontal',
      'Passe em temperatura baixa',
    ],
    measurements: [
      { label: 'P', value: 'Busto 88cm · Comprimento 128cm' },
      { label: 'M', value: 'Busto 94cm · Comprimento 130cm' },
      { label: 'G', value: 'Busto 100cm · Comprimento 132cm' },
      { label: 'GG', value: 'Busto 106cm · Comprimento 134cm' },
    ],
  },
  {
    slug: 'moletom-premium',
    name: 'Moletom Premium',
    price: 279,
    category: 'Camisetas',
    gender: 'Unissex',
    images: ['/products/moletom-premium-1.png', '/products/moletom-premium-2.png'],
    colors: [
      { name: 'Cru', hex: '#E7E0D3' },
      { name: 'Grafite', hex: '#3A3A3C' },
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    shortDescription: 'Moletom felpado de gramatura pesada com capuz.',
    description:
      'Conforto elevado. O Moletom Premium é feito em felpa de gramatura pesada com interior macio, capuz estruturado e caimento levemente oversized. O aconchego que combina com tudo.',
    care: [
      'Lave à máquina com água fria',
      'Não use alvejante',
      'Seque à sombra',
      'Não passe sobre a estampa',
    ],
    measurements: [
      { label: 'P', value: 'Peito 110cm · Comprimento 66cm' },
      { label: 'M', value: 'Peito 116cm · Comprimento 68cm' },
      { label: 'G', value: 'Peito 122cm · Comprimento 70cm' },
      { label: 'GG', value: 'Peito 128cm · Comprimento 72cm' },
    ],
  },
  {
    slug: 'bolsa-estruturada',
    name: 'Bolsa Estruturada',
    price: 789,
    category: 'Acessórios',
    gender: 'Feminino',
    isNew: true,
    images: ['/products/bolsa-estruturada-1.png', '/products/bolsa-estruturada-2.png'],
    colors: [
      { name: 'Caramelo', hex: '#B08658' },
      { name: 'Preto', hex: '#1A1A1A' },
    ],
    sizes: ['Único'],
    shortDescription: 'Couro legítimo com estrutura firme e alça removível.',
    description:
      'Acabamento de atelier. A Bolsa Estruturada é confeccionada em couro legítimo com estrutura firme, ferragens discretas e alça transversal removível. Espaço interno organizado para o dia a dia.',
    care: [
      'Limpe com pano seco e macio',
      'Evite contato com água',
      'Guarde na dust bag',
      'Hidrate o couro periodicamente',
    ],
    measurements: [{ label: 'Único', value: 'Largura 28cm · Altura 20cm · Profundidade 12cm' }],
  },
  {
    slug: 'oculos-acetato',
    name: 'Óculos de Acetato',
    price: 249,
    oldPrice: 329,
    onSale: true,
    category: 'Acessórios',
    gender: 'Unissex',
    images: ['/products/oculos-acetato-1.png', '/products/oculos-acetato-2.png'],
    colors: [
      { name: 'Tartaruga', hex: '#7A5230' },
      { name: 'Preto', hex: '#1A1A1A' },
    ],
    sizes: ['Único'],
    shortDescription: 'Armação em acetato italiano com lentes com proteção UV.',
    description:
      'Design atemporal. Os Óculos de Acetato têm armação italiana leve, dobradiças reforçadas e lentes com proteção UV400. Um acessório que finaliza qualquer look com atitude.',
    care: [
      'Limpe com flanela apropriada',
      'Guarde no estojo rígido',
      'Evite calor extremo',
      'Não use produtos abrasivos',
    ],
    measurements: [{ label: 'Único', value: 'Lente 52mm · Ponte 20mm · Haste 145mm' }],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const current = products.find((p) => p.slug === slug)
  if (!current) return products.slice(0, limit)
  return products
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (a.category === current.category ? -1 : 1))
    .slice(0, limit)
}
