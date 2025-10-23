"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { handleQuoteRequest } from "@/app/actions";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Il nome deve contenere almeno 2 caratteri." }),
  company: z.string().min(2, { message: "Il nome dell'azienda è obbligatorio." }),
  email: z.string().email({ message: "Inserisci un'email valida." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Il messaggio deve contenere almeno 10 caratteri." }),
});

type QuoteFormValues = z.infer<typeof formSchema>;

export function QuoteRequestForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(data: QuoteFormValues) {
    startTransition(async () => {
      const result = await handleQuoteRequest(data);
      if (result.success) {
        toast({
          title: "Richiesta di Preventivo Inviata!",
          description: "Grazie! Ti contatteremo al più presto.",
        });
        form.reset();
        onSuccess?.();
      } else {
        toast({
          variant: "destructive",
          title: "Oops! Qualcosa è andato storto.",
          description: result.error || "C'è stato un problema con la tua richiesta.",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Mario Rossi" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Azienda</FormLabel>
              <FormControl>
                <Input placeholder="La Tua Azienda S.p.A." {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="tu@azienda.it" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero di Telefono (Opzionale)</FormLabel>
              <FormControl>
                <Input placeholder="+39 333 1234567" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parlaci delle tue esigenze</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Es: Ho bisogno di un ordine all'ingrosso di panni multiuso per una catena di hotel."
                  className="resize-none"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full" variant="default">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Invio in corso..." : "Invia Richiesta"}
        </Button>
      </form>
    </Form>
  );
}
