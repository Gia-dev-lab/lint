
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/firebase';
import {
  initiateEmailSignUp,
  initiateEmailSignIn,
} from '@/firebase/non-blocking-login';
import { useTransition, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const loginSchema = z.object({
  email: z.string().email({ message: "Inserisci un'email valida." }),
  password: z.string().min(6, { message: 'La password deve contenere almeno 6 caratteri.' }),
});

const registerSchema = z.object({
    name: z.string().min(2, { message: "Il nome deve contenere almeno 2 caratteri." }),
    email: z.string().email({ message: "Inserisci un'email valida." }),
    password: z.string().min(6, { message: 'La password deve contenere almeno 6 caratteri.' }),
});


export function AuthForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState("login");

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  });


  function onLoginSubmit(data: z.infer<typeof loginSchema>) {
    startTransition(() => {
      try {
        initiateEmailSignIn(auth, data.email, data.password);
        toast({
          title: 'Accesso in corso...',
          description: "Sarai reindirizzato a breve.",
        });
        onSuccess?.();
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Errore di accesso',
          description: error.message || 'Controlla le tue credenziali e riprova.',
        });
      }
    });
  }
  
  function onRegisterSubmit(data: z.infer<typeof registerSchema>) {
    startTransition(() => {
      try {
        initiateEmailSignUp(auth, data.email, data.password);
        // Here you might want to update the user's profile with the name
        // This requires listening for the user object to be available
        toast({
          title: 'Registrazione in corso...',
          description: 'Account creato con successo. Stai per essere autenticato.',
        });
        onSuccess?.();
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Errore di registrazione',
          description: error.message || 'Non è stato possibile creare l\'account.',
        });
      }
    });
  }

  return (
     <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <DialogHeader className='mb-4'>
        <DialogTitle>{activeTab === 'login' ? 'Accedi al tuo Account' : 'Crea un Nuovo Account'}</DialogTitle>
        <DialogDescription>
          {activeTab === 'login' ? 'Bentornato! Inserisci le tue credenziali.' : 'Unisciti a noi per accedere a contenuti esclusivi.'}
        </DialogDescription>
      </DialogHeader>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Accedi</TabsTrigger>
        <TabsTrigger value="register">Registrati</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4 mt-4">
            <FormField
              control={loginForm.control}
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
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? 'Accesso...' : 'Accedi'}
            </Button>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="register">
        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4 mt-4">
             <FormField
              control={registerForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Mario Rossi" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
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
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? 'Registrazione...' : 'Crea Account'}
            </Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
}
