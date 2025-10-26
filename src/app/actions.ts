"use server";

import {addDocumentNonBlocking} from "@/firebase";
import {collection, getFirestore} from "firebase/firestore";
import * as z from "zod";

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
    
    // NOTE: This is a server action, but we are using the client-side SDK
    // to write to Firestore. This is a temporary solution for the prototype.
    // In a real application, you would use the Firebase Admin SDK here.
    const { getSdks } = await import('@/firebase/index.server');
    const { firestore } = getSdks();
    
    const quoteRequestCollection = collection(firestore, "quoteRequests");
    
    await addDoc(quoteRequestCollection, {
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
