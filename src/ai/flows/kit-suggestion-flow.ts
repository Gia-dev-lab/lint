'use server';
/**
 * @fileOverview Flusso AI per suggerire un kit di prodotti di pulizia.
 *
 * - getKitSuggestions - Funzione che orchestra la chiamata all'AI.
 * - KitSuggestion - Tipo di output per un singolo suggerimento.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type { Product } from '@/lib/data';

const KitSuggestionInputSchema = z.object({
  description: z.string().describe("La descrizione dell'attività del cliente."),
  products: z.array(z.object({
    id: z.string(),
    product_id: z.number().optional(),
    nome: z.string(),
    categorie: z.string(),
    descrizionebreve: z.string().optional(),
    SKU: z.string().optional(),
  })).describe("L'elenco dei prodotti disponibili nel catalogo."),
});
export type KitSuggestionInput = z.infer<typeof KitSuggestionInputSchema>;

const KitSuggestionSchema = z.object({
  productId: z.string().describe("L'ID univoco del prodotto suggerito, prelevato dall'elenco fornito."),
  productName: z.string().describe("Il nome esatto del prodotto suggerito."),
  reason: z.string().describe("Una breve e convincente motivazione sul perché questo prodotto è ideale per le esigenze dell'utente."),
});
export type KitSuggestion = z.infer<typeof KitSuggestionSchema>;

const KitSuggestionOutputSchema = z.array(KitSuggestionSchema);

const kitSuggesterPrompt = ai.definePrompt({
    name: 'kitSuggesterPrompt',
    input: { schema: KitSuggestionInputSchema },
    output: { schema: KitSuggestionOutputSchema },
    prompt: `
      Sei un esperto consulente di vendita per "Lint Professional Cleaning", un'azienda specializzata in attrezzature per la pulizia professionale B2B.
      Il tuo compito è analizzare la descrizione dell'attività di un potenziale cliente e suggerire un kit di 3-4 prodotti fondamentali dal catalogo fornito.

      ANALIZZA la seguente descrizione dell'attività del cliente:
      "{{description}}"

      CATALOGO PRODOTTI DISPONIBILI (devi scegliere ESCLUSIVAMENTE da questa lista):
      {{#each products}}
      - ID: {{id}}, Nome: {{nome}}, Categoria: {{categorie}}{{#if descrizionebreve}}, Descrizione: {{descrizionebreve}}{{/if}}
      {{/each}}

      OBIETTIVO:
      Formula suggerimenti che siano estremamente pertinenti e utili. Per ogni suggerimento, fornisci una motivazione chiara e concisa che spieghi perché quel prodotto è una scelta eccellente per le specifiche esigenze del cliente.

      ISTRUZIONI IMPORTANTI:
      1.  Restituisci ESATTAMENTE 3 o 4 suggerimenti.
      2.  Per ogni suggerimento, restituisci 'productId', 'productName' e 'reason'.
      3.  L' 'productId' e il 'productName' DEVONO corrispondere esattamente a un prodotto presente nel catalogo fornito. Non inventare prodotti.
      4.  La 'reason' deve essere breve, diretta e persuasiva, collegandosi direttamente all'attività descritta dal cliente.
      5.  Sii specifico. Se un cliente menziona "hotel", suggerisci prodotti rilevanti per l'Ho.Re.Ca. Se menziona "car detailing", concentrati su quel settore.
    `,
});

const kitSuggestionFlow = ai.defineFlow(
  {
    name: 'kitSuggestionFlow',
    inputSchema: KitSuggestionInputSchema,
    outputSchema: KitSuggestionOutputSchema,
  },
  async (input) => {
    const { output } = await kitSuggesterPrompt(input);
    if (!output) {
      throw new Error("L'assistente AI non è riuscito a generare suggerimenti.");
    }
    return output;
  }
);

export async function getKitSuggestions(input: KitSuggestionInput): Promise<KitSuggestion[]> {
  return await kitSuggestionFlow(input);
}
