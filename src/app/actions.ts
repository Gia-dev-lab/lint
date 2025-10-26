"use server";

import {addDocumentNonBlocking} from "@/firebase";
import {collection} from "firebase/firestore";
import * as z from "zod";
import { getKitSuggestions as getKitSuggestionsAI } from "@/ai/flows/kit-suggestion-flow";

const formSchema = z.object({
  name: z.string().min(2, { message: "Il nome deve contenere almeno 2 caratteri." }),
  company: z.string().min(2, { message: "Il nome dell'azienda è obbligatorio." }),
  email: z.string().email({ message: "Inserisci un'email valida." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Il messaggio deve contenere almeno 10 caratteri." }),
});

type QuoteFormValues = z.infer<typeof formSchema>;

export async function handleQuoteRequest(data: QuoteFormValues) {
  try {
    const validatedData = formSchema.parse(data);
    
    const { getSdks } = await import('@/firebase/index.server');
    const { firestore } = getSdks();
    
    const quoteRequestCollection = collection(firestore, "quoteRequests");
    
    await addDocumentNonBlocking(quoteRequestCollection, {
        ...validatedData,
        requestDate: new Date().toISOString()
    });

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
  description: z.string().min(10, { message: "La descrizione deve contenere almeno 10 caratteri." }),
});

export async function getKitSuggestions(input: { description: string }) {
   try {
    const validatedInput = kitConfiguratorSchema.parse(input);
    const suggestions = await getKitSuggestionsAI(validatedInput.description);
    return { success: true, suggestions };
  } catch (error) {
    if (error instanceof z.ZodError) {
        return { success: false, error: "Fornisci una descrizione più dettagliata delle tue necessità (almeno 10 caratteri)." };
    }
    console.error("Errore dal flusso AI:", error);
    return { success: false, error: "Si è verificato un errore durante l'analisi della tua richiesta. Riprova." };
  }
}