"use server";

import { addDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import * as z from "zod";
import { getKitSuggestions as getKitSuggestionsAI } from "@/ai/flows/kit-suggestion-flow";
import type { Product } from "@/lib/data";
import { getApps } from "firebase/app";

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
    
    // CORREZIONE: Utilizza il nostro helper server-side per ottenere le istanze di Firebase
    const { getSdks } = await import('@/firebase/index.server');
    const { auth, firestore } = getSdks();

    let userId = null;
    try {
        // La logica per ottenere l'utente corrente deve essere gestita diversamente
        // nelle Server Actions. Per ora, procediamo con null se non disponibile
        // in questo contesto.
        if (auth.currentUser) {
            userId = auth.currentUser.uid;
        }
    } catch (e) {
        // User is not logged in or auth is not available server-side in this context
        console.log("Auth not available, proceeding as anonymous.");
    }
    
    const quoteRequestCollection = collection(firestore, "quoteRequests");
    
    await addDoc(quoteRequestCollection, {
        ...validatedData,
        userId: userId, // Will be null if not logged in
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
    
    const { getSdks } = await import('@/firebase/index.server');
    const { firestore } = getSdks();
    
    const productsSnapshot = await getDocs(collection(firestore, "prodotti"));
    const products: Product[] = productsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product));

    const suggestions = await getKitSuggestionsAI({
      description: validatedInput.description,
      products: products.map(({ id, ID, nome, categorie, descrizionebreve, SKU }) => ({ 
          id, 
          product_id: ID, // Correctly map the numeric ID
          nome, 
          categorie, 
          descrizionebreve, 
          SKU 
      }))
    });
    
    return { success: true, suggestions };
  } catch (error) {
    if (error instanceof z.ZodError) {
        return { success: false, error: "Fornisci una descrizione più dettagliata delle tue necessità (almeno 10 caratteri)." };
    }
    console.error("Errore dal flusso AI:", error);
    return { success: false, error: "Si è verificato un errore durante l'analisi della tua richiesta. Riprova." };
  }
}
