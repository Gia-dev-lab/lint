
'use server';
/**
 * @fileOverview A kit suggestion AI agent.
 *
 * - suggestKit - A function that handles the kit suggestion process.
 * - KitSuggestionInput - The input type for the suggestKit function.
 * - KitSuggestionOutput - The return type for the suggestKit function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ProductSchema = z.object({
    id: z.string(),
    nome: z.string(),
    descrizionebreve: z.string().optional(),
    descrizionecompleta: z.string().optional(),
    categorie: z.string(),
    SKU: z.string().optional(),
    tag: z.string().optional(),
    metadesc: z.string().optional(),
    rank_math_title: z.string().optional(),
});

const KitSuggestionInputSchema = z.object({
  userNeed: z.string().describe('The user\'s specific need for a cleaning kit.'),
  productCatalog: z.array(ProductSchema).describe('The entire product catalog available.'),
});
export type KitSuggestionInput = z.infer<typeof KitSuggestionInputSchema>;

const KitSuggestionOutputSchema = z.object({
  reasoning: z
    .string()
    .describe('A friendly and helpful explanation of why the suggested products were chosen for the user\'s need.'),
  suggestedProductIds: z.array(z.string()).describe('An array of product document IDs from Firestore that make up the suggested kit.'),
});
export type KitSuggestionOutput = z.infer<typeof KitSuggestionOutputSchema>;


export async function suggestKit(input: KitSuggestionInput): Promise<KitSuggestionOutput> {
  return suggestKitFlow(input);
}


const prompt = ai.definePrompt({
  name: 'suggestKitPrompt',
  input: {schema: KitSuggestionInputSchema},
  output: {schema: KitSuggestionOutputSchema},
  prompt: `You are an expert assistant for "Lint Professional Cleaning", a B2B supplier of professional cleaning equipment.
Your task is to analyze a user's need and recommend a custom kit of products from the provided catalog.

The user's need is:
"{{{userNeed}}}"

Here is the full product catalog, in JSON format:
"{{{json productCatalog}}}"

Your response must be in Italian.

Analyze the user's request and the product catalog. Select a combination of 2 to 5 products that best address the user's need.
Consider the product's 'nome' (name), 'descrizionebreve' (short description), 'descrizionecompleta' (full description), 'categorie' (category), and especially 'tag' and 'metadesc' for keywords.

Based on your selection, provide:
1.  **reasoning**: A concise, friendly, and professional explanation in Italian. Start with a phrase like "Ecco un kit pensato per te:" or "Per le tue esigenze, ti consiglio questi prodotti:". Explain briefly why each product is a good fit.
2.  **suggestedProductIds**: An array containing only the string IDs of the recommended products from the catalog.

Example for a user asking for "car detailing":
You might select a specific drying cloth, an interior cleaner, and a wheel brush.
Your reasoning would explain why these products are essential for detailing.
Your suggestedProductIds would be an array of the corresponding product IDs.

Do not suggest products that are not in the catalog.
Prioritize creating a coherent and useful kit.
`,
});

const suggestKitFlow = ai.defineFlow(
  {
    name: 'suggestKitFlow',
    inputSchema: KitSuggestionInputSchema,
    outputSchema: KitSuggestionOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
