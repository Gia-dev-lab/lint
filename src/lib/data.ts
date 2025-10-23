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
  category: 'Cloths' | 'Accessories' | 'Equipment Parts' | 'Kits';
  image: ImagePlaceholder;
  details: string[];
};

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Lint-Free Pro Cloth',
    description: 'High-absorption, streak-free microfiber cloth for all surfaces.',
    category: 'Cloths',
    image: findImage('product-cloth-1'),
    details: ['300 GSM', '16"x16" size', 'Ultrasonic cut edges'],
  },
  {
    id: 'p2',
    name: 'Heavy Duty Scrub Cloths (5-pack)',
    description: 'Dual-sided for scrubbing and polishing. Ideal for tough grime.',
    category: 'Cloths',
    image: findImage('product-cloth-2'),
    details: ['Color-coded for different tasks', 'Durable and long-lasting', 'Machine washable'],
  },
  {
    id: 'p3',
    name: 'Ergo-Grip Spray Bottle',
    description: 'Professional grade 32oz spray bottle with adjustable nozzle.',
    category: 'Accessories',
    image: findImage('product-accessory-1'),
    details: ['Chemical resistant materials', 'Ergonomic design', 'Measures on side'],
  },
  {
    id: 'p4',
    name: 'Pro-Squeegee 18"',
    description: 'Stainless steel squeegee for perfect, streak-free windows.',
    category: 'Accessories',
    image: findImage('product-accessory-2'),
    details: ['Replaceable rubber blade', 'Comfortable grip handle', 'Fits standard extension poles'],
  },
  {
    id: 'p5',
    name: 'Filter Assembly for Model X-100',
    description: 'OEM replacement filter for the X-100 series floor cleaner.',
    category: 'Equipment Parts',
    image: findImage('product-equipment-1'),
    details: ['Part #EQP-45-2B', 'HEPA-rated filtration', 'Easy to install'],
  },
  {
    id: 'p6',
    name: 'Auto Detailing Starter Kit',
    description: 'Everything you need to get started with professional car detailing.',
    category: 'Kits',
    image: findImage('product-kit-1'),
    details: ['Includes 5 types of cloths', 'Comes with wash mitt and drying towel', 'Perfect for B2B clients'],
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
    name: 'John Doe',
    company: 'Sparkle Cleaners Inc.',
    quote: 'Lint Microfiber Hub has transformed our efficiency. Their cloths last longer and perform better than any other brand we’ve tried. The B2B ordering process is seamless.',
    image: findImage('testimonial-1'),
  },
  {
    id: 't2',
    name: 'Jane Smith',
    company: 'Hotel Grandeur',
    quote: 'The quality of the microfiber products is exceptional. Our housekeeping staff is thrilled, and our guests notice the difference. Highly recommended for any Ho.Re.Ca business.',
    image: findImage('testimonial-2'),
  },
  {
    id: 't3',
    name: 'Carlos Rodriguez',
    company: 'Prestige Auto Detailing',
    quote: 'I rely on their detailing kits for all my high-end clients. The results are consistently flawless. The personalized kit configurator is a game changer for finding the right tools.',
    image: findImage('testimonial-1'),
  },
];

export const productCategories = ['Cloths', 'Accessories', 'Equipment Parts', 'Kits'] as const;
