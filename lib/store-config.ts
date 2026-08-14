// Configurações da loja — troque pelos dados reais de cada cliente.
export const storeConfig = {
  name: 'NOIR Studio',
  // Número no formato internacional, apenas dígitos (DDI + DDD + número).
  whatsappNumber: '5511999999999',
  instagram: 'noir.studio',
  email: 'atelier@noirstudio.com',
  freeShippingThreshold: 499,
}

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
