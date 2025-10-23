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
    // In a real application, you would save this to a database (e.g., Firebase)
    // and send an email notification.
    console.log("New Quote Request:", validatedData);
    return { success: true };
  } catch (error) {
    console.error("Quote request validation failed:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validation failed. Please check your input." };
    }
    return { success: false, error: "An unexpected error occurred." };
  }
}

const kitConfiguratorSchema = z.object({
  description: z.string().min(10),
});

// This is a mock function for the AI kit configurator.
// In a real app, this would call a Genkit flow.
export async function getKitSuggestions(input: { description: string }) {
   try {
    kitConfiguratorSchema.parse(input);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI processing time

    // Mock response based on keywords
    const lowercasedDescription = input.description.toLowerCase();
    let suggestions: { id: string; name: string }[] = [];

    if (lowercasedDescription.includes("car") || lowercasedDescription.includes("auto")) {
      suggestions.push({ id: 'p6', name: 'Auto Detailing Starter Kit' });
      suggestions.push({ id: 'p1', name: 'Lint-Free Pro Cloth' });
    } else if (lowercasedDescription.includes("hotel") || lowercasedDescription.includes("window")) {
      suggestions.push({ id: 'p4', name: 'Pro-Squeegee 18"' });
      suggestions.push({ id: 'p2', name: 'Heavy Duty Scrub Cloths (5-pack)' });
    } else {
       suggestions.push({ id: 'p1', name: 'Lint-Free Pro Cloth' });
       suggestions.push({ id: 'p3', name: 'Ergo-Grip Spray Bottle' });
    }

    return { success: true, suggestions };

  } catch (error) {
    return { success: false, error: "Please provide a more detailed description." };
  }
}
