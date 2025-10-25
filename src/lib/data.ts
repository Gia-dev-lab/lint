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

export type ProductCategory = 'Panni' | 'Accessori' | 'Parti di Ricambio' | 'Panni per Autolavaggio' | 'Detergenti' | 'Kit';

export type Product = {
  id: string;
  nome: string;
  descrizione: string;
  categoria: ProductCategory;
  imageUrl: string;
  prezzo: number;
  specifiche?: string;
  // Deprecated fields, kept for reference for other components
  name?: string;
  description?: string;
  category?: ProductCategory;
  image?: ImagePlaceholder;
  details?: string[];
};

export const products: Product[] = [];


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
    name: 'Marco Ferri',
    company: 'Impresa Pulizie Brillante',
    quote: 'Lint Professional Cleaning ha rivoluzionato la nostra efficienza. Le loro attrezzature sono robuste, performanti e ci permettono di ottimizzare i tempi. Il supporto B2B è eccezionale.',
    image: findImage('testimonial-1'),
  },
  {
    id: 't2',
    name: 'Sofia Neri',
    company: 'Grand Hotel Excelsior',
    quote: 'La qualità dei prodotti è ineguagliabile. Il nostro personale è più efficiente e gli ospiti notano la differenza nella pulizia delle stanze e delle aree comuni. Un partner affidabile per l\'Ho.Re.Ca.',
    image: findImage('testimonial-2'),
  },
  {
    id: 't3',
    name: 'Luca Esposito',
    company: 'Car Detailing Milano',
    quote: 'Mi affido ai loro kit e panni tecnici per i miei clienti più esigenti. I risultati sono sempre perfetti e la durata dei materiali è un grande vantaggio economico.',
    image: findImage('testimonial-1'),
  },
];

export const productCategories: ProductCategory[] = ['Panni', 'Accessori', 'Parti di Ricambio', 'Panni per Autolavaggio', 'Detergenti', 'Kit'];

    