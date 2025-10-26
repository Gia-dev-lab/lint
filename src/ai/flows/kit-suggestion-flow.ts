'use server';
/**
 * @fileOverview Flusso AI per suggerire un kit di prodotti di pulizia.
 *
 * - getKitSuggestions - Funzione che orchestra la chiamata all'AI.
 * - KitSuggestion - Tipo di output per un singolo suggerimento.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const KitSuggestionSchema = z.object({
  productName: z.string().describe("Il nome del prodotto o della categoria di prodotti suggerita."),
  reason: z.string().describe("Una breve e convincente motivazione sul perché questo prodotto è ideale per le esigenze dell'utente."),
});
export type KitSuggestion = z.infer<typeof KitSuggestionSchema>;

const KitSuggestionOutputSchema = z.array(KitSuggestionSchema);

const kitSuggesterPrompt = ai.definePrompt({
    name: 'kitSuggesterPrompt',
    input: { schema: z.string() },
    output: { schema: KitSuggestionOutputSchema },
    prompt: `
      Sei un esperto consulente di vendita per "Lint Professional Cleaning", un'azienda specializzata in attrezzature per la pulizia professionale B2B.
      Il tuo compito è analizzare la descrizione dell'attività di un potenziale cliente e suggerire un kit di 3-4 prodotti o categorie di prodotto fondamentali per iniziare.

      ANALIZZA la seguente descrizione dell'attività del cliente:
      "{{input}}"

      OBIETTIVO:
      Formula suggerimenti che siano estremamente pertinenti e utili. Per ogni suggerimento, fornisci una motivazione chiara e concisa che spieghi perché quel prodotto è una scelta eccellente per le specifiche esigenze del cliente.

      CATALOGO PRODOTTI DI RIFERIMENTO (usa questi nomi o simili):
      - Panno Pro Anti-Pelucchi
      - Panno per Vetri e Specchi
      - Kit Detailing Auto Completo
      - Panni in Microfibra Linea Self Car Wash
      - Tergivetro Professionale 45cm
      - Detergente Universale Concentrato
      - Gruppo Filtro per Modello X-100 (Ricambio)
      - Kit Pulizia Hotel e Ristoranti

      ISTRUZIONI IMPORTANTI:
      1.  Restituisci ESATTAMENTE 3 o 4 suggerimenti.
      2.  Per ogni suggerimento, fornisci sia 'productName' che 'reason'.
      3.  La 'reason' deve essere breve, diretta e persuasiva, collegandosi direttamente all'attività descritta dal cliente.
      4.  Sii specifico. Se un cliente menziona "hotel", suggerisci prodotti rilevanti per l'Ho.Re.Ca. Se menziona "car detailing", concentrati su quel settore.
    `,
});

const kitSuggestionFlow = ai.defineFlow(
  {
    name: 'kitSuggestionFlow',
    inputSchema: z.string(),
    outputSchema: KitSuggestionOutputSchema,
  },
  async (description) => {
    const { output } = await kitSuggesterPrompt(description);
    if (!output) {
      throw new Error("L'assistente AI non è riuscito a generare suggerimenti.");
    }
    return output;
  }
);

export async function getKitSuggestions(description: string): Promise<KitSuggestion[]> {
  return await kitSuggestionFlow(description);
}
