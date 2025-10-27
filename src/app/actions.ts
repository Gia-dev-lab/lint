
"use server";

import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
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
    
    const { getSdks } = await import('@/firebase/index.server');
    const { auth, firestore } = getSdks();

    let userId = null;
    try {
        if (auth.currentUser) {
            userId = auth.currentUser.uid;
        }
    } catch (e) {
        console.log("Auth not available, proceeding as anonymous.");
    }
    
    const quoteRequestCollection = collection(firestore, "quoteRequests");
    
    await addDoc(quoteRequestCollection, {
        ...validatedData,
        userId: userId,
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

    