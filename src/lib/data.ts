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
  name: string;
  description: string;
  category: ProductCategory;
  image: ImagePlaceholder;
  details: string[];
};

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Panno Pro Anti-Pelucchi',
    description: 'Il cuore di ogni intervento di pulizia. Microfibra professionale per asciugatura ultra-rapida e pulizia senza aloni.',
    category: 'Panni',
    image: findImage('product-cloth-1'),
    details: ['300 GSM', 'Dimensioni 40x40 cm', 'Bordi tagliati a ultrasuoni'],
  },
  {
    id: 'p4',
    name: 'Tergivetro Professionale 45cm',
    description: 'Accessori selezionati per un lavoro impeccabile. Tergivetro in acciaio inox per vetri perfetti.',
    category: 'Accessori',
    image: findImage('product-accessory-2'),
    details: ['Lama in gomma sostituibile', 'Manico con impugnatura comoda', 'Adatto a prolunghe standard'],
  },
  {
    id: 'p5',
    name: 'Gruppo Filtro per Modello X-100',
    description: 'Ricambi per la massima continuità operativa. Filtro di ricambio OEM per lavasciuga pavimenti serie X-100.',
    category: 'Parti di Ricambio',
    image: findImage('product-equipment-1'),
    details: ['Codice #EQP-45-2B', 'Filtrazione di classe HEPA', 'Facile da installare'],
  },
  {
    id: 'p7',
    name: 'Panni in Microfibra Linea Self Car Wash',
    description: 'Panni specifici per autolavaggi, ad alta resistenza e capacità di assorbimento per un self-service di qualità.',
    category: 'Panni per Autolavaggio',
    image: findImage('product-cloth-2'),
    details: ['Ultra resistenti ai lavaggi', 'Asciugatura rapida', 'Non graffiano la carrozzeria'],
  },
  {
    id: 'p8',
    name: 'Detergente Universale Concentrato',
    description: 'Prodotti chimici professionali per una pulizia profonda. Formula ecologica ed efficace su tutte le superfici.',
    category: 'Detergenti',
    image: findImage('product-accessory-1'),
    details: ['Tanica da 5L', 'Diluizione 1:100', 'Profumazione neutra'],
  },
  {
    id: 'p6',
    name: 'Kit Detailing Auto Completo',
    description: 'Kit pronti all\'uso per professionisti. Include tutto il necessario per iniziare con il detailing di auto.',
    category: 'Kit',
    image: findImage('product-kit-1'),
    details: ['Include 5 tipi di panni', 'Guanto e panno per asciugatura', 'Perfetto per clienti B2B'],
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
