"use server";

import * as z from "zod";

const formSchema = z.object({
  name: z.string(),
  company: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string(),
});

type QuoteFormValues = z.infer<typeof formSchema>;

export async function handleQuoteRequest(data: QuoteFormValues) {
  try {
    const validatedData = formSchema.parse(data);
    // In una vera applicazione, salveresti questi dati in un database (es. Firebase)
    // e invieresti una notifica email.
    console.log("Nuova Richiesta di Consulenza/Preventivo:", validatedData);
    return { success: true };
  } catch (error) {
    console.error("Validazione richiesta fallita:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validazione fallita. Controlla i dati inseriti." };
    }
    return { success: false, error: "Si è verificato un errore imprevisto." };
  }
}

const kitConfiguratorSchema = z.object({
  description: z.string().min(10),
});

// Questa è una funzione fittizia per il configuratore di kit AI.
// In un'app reale, chiamerebbe un flow Genkit.
export async function getKitSuggestions(input: { description: string }) {
   try {
    kitConfiguratorSchema.parse(input);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simula il tempo di elaborazione dell'IA

    // Risposta fittizia basata su parole chiave
    const lowercasedDescription = input.description.toLowerCase();
    let suggestions: { id: string; name: string }[] = [];

    if (lowercasedDescription.includes("auto") || lowercasedDescription.includes("macchina") || lowercasedDescription.includes("detailing")) {
      suggestions.push({ id: 'p6', name: 'Kit Detailing Auto Completo' });
      suggestions.push({ id: 'p7', name: 'Panni in Microfibra Linea Self Car Wash' });
    } else if (lowercasedDescription.includes("hotel") || lowercasedDescription.includes("ristorante") || lowercasedDescription.includes("horeca")) {
       suggestions.push({ id: 'p4', name: 'Tergivetro Professionale 45cm' });
       suggestions.push({ id: 'p8', name: 'Detergente Universale Concentrato' });
    } else {
       suggestions.push({ id: 'p1', name: 'Panno Pro Anti-Pelucchi' });
       suggestions.push({ id: 'p5', name: 'Gruppo Filtro per Modello X-100' });
    }

    return { success: true, suggestions };

  } catch (error) {
    return { success: false, error: "Fornisci una descrizione più dettagliata delle tue necessità." };
  }
}
