import placeholderData from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const placeholderImages: ImagePlaceholder[] = placeholderData.placeholderImages;


const findImage = (id: string): ImagePlaceholder => {
  const image = placeholderImages.find(img => img.id === id);
  if (!image) {
      console.warn(`Image with id ${id} not found. Using default.`);
      return {
        id: 'default',
        description: 'Default placeholder',
        imageUrl: 'https://picsum.photos/seed/default/600/400',
        imageHint: 'placeholder'
      }
  }
  return image;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category: 'Panni' | 'Accessori' | 'Parti di Ricambio' | 'Kit';
  image: ImagePlaceholder;
  details: string[];
};

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Panno Pro Anti-Pelucchi',
    description: 'Panno in microfibra ad alto assorbimento e anti-alone per tutte le superfici.',
    category: 'Panni',
    image: findImage('product-cloth-1'),
    details: ['300 GSM', 'Dimensioni 40x40 cm', 'Bordi tagliati a ultrasuoni'],
  },
  {
    id: 'p2',
    name: 'Panni per Pulizia Profonda (5 pz)',
    description: 'Doppio lato per strofinare e lucidare. Ideale per lo sporco difficile.',
    category: 'Panni',
    image: findImage('product-cloth-2'),
    details: ['Codifica a colori per compiti diversi', 'Resistenti e di lunga durata', 'Lavabili in lavatrice'],
  },
  {
    id: 'p3',
    name: 'Spruzzino con Impugnatura Ergonomica',
    description: 'Spruzzino professionale da 1L con ugello regolabile.',
    category: 'Accessori',
    image: findImage('product-accessory-1'),
    details: ['Materiali resistenti agli agenti chimici', 'Design ergonomico', 'Indicatori di misura laterali'],
  },
  {
    id: 'p4',
    name: 'Tergivetro Professionale 45cm',
    description: 'Tergivetro in acciaio inox per vetri perfetti e senza aloni.',
    category: 'Accessori',
    image: findImage('product-accessory-2'),
    details: ['Lama in gomma sostituibile', 'Manico con impugnatura comoda', 'Adatto a prolunghe standard'],
  },
  {
    id: 'p5',
    name: 'Gruppo Filtro per Modello X-100',
    description: 'Filtro di ricambio OEM per la lavasciuga pavimenti serie X-100.',
    category: 'Parti di Ricambio',
    image: findImage('product-equipment-1'),
    details: ['Codice #EQP-45-2B', 'Filtrazione di classe HEPA', 'Facile da installare'],
  },
  {
    id: 'p6',
    name: 'Kit Iniziale per Detailing Auto',
    description: 'Tutto il necessario per iniziare con il detailing professionale di auto.',
    category: 'Kit',
    image: findImage('product-kit-1'),
    details: ['Include 5 tipi di panni', 'Include guanto e panno per asciugatura', 'Perfetto per clienti B2B'],
  },
];

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  company: string;
  image: ImagePlaceholder;
};

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Mario Rossi',
    company: 'Autolavaggio Splendido S.r.l.',
    quote: 'Lint Microfibra ha trasformato la nostra efficienza. I loro panni durano più a lungo e hanno prestazioni migliori di qualsiasi altro marchio che abbiamo provato. Il processo di ordine B2B è impeccabile.',
    image: findImage('testimonial-1'),
  },
  {
    id: 't2',
    name: 'Giulia Bianchi',
    company: 'Hotel Magnifico',
    quote: 'La qualità dei prodotti in microfibra è eccezionale. Il nostro personale delle pulizie è entusiasta e i nostri ospiti notano la differenza. Altamente raccomandato per qualsiasi attività Ho.Re.Ca.',
    image: findImage('testimonial-2'),
  },
  {
    id: 't3',
    name: 'Carlos Rodriguez',
    company: 'Detailing Auto di Lusso',
    quote: 'Mi affido ai loro kit di detailing per tutti i miei clienti di alta gamma. I risultati sono costantemente impeccabili. Il configuratore di kit personalizzato è una svolta per trovare gli strumenti giusti.',
    image: findImage('testimonial-1'),
  },
];

export const productCategories = ['Panni', 'Accessori', 'Parti di Ricambio', 'Kit'] as const;
