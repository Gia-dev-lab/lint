"use client";

import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { collection, query, where, orderBy } from "firebase/firestore";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

function AccountSkeleton() {
    return (
        <div className="container py-12 space-y-8">
            <Skeleton className="h-10 w-1/3" />
            <div className="space-y-4">
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-6 w-1/2" />
            </div>
            <div className="space-y-4">
                <Skeleton className="h-8 w-1/2" />
                 <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-4 w-1/3" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3 mt-2" />
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-4 w-1/3" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3 mt-2" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}


export default function AccountPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const firestore = useFirestore();

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/');
        }
    }, [user, isUserLoading, router]);

    const quotesQuery = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return query(
            collection(firestore, "quoteRequests"),
            where("userId", "==", user.uid),
            orderBy("requestDate", "desc")
        );
    }, [firestore, user]);

    const { data: quoteRequests, isLoading: isLoadingQuotes } = useCollection(quotesQuery);

    if (isUserLoading || !user) {
        return <AccountSkeleton />;
    }

    return (
        <AnimateOnScroll>
            <div className="container py-12">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Il Mio Account</h1>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold">Dettagli Utente</h2>
                    <Card className="mt-4">
                        <CardContent className="pt-6">
                            <p><strong>Email:</strong> {user.email}</p>
                            {user.displayName && <p><strong>Nome:</strong> {user.displayName}</p>}
                        </CardContent>
                    </Card>
                </section>

                <section className="mt-12">
                    <h2 className="text-2xl font-semibold">Storico Richieste di Consulenza</h2>
                    {isLoadingQuotes && (
                        <div className="grid gap-4 mt-4 md:grid-cols-2">
                           <Card>
                                <CardHeader>
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-4 w-1/3" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3 mt-2" />
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader>
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-4 w-1/3" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3 mt-2" />
                                </CardContent>
                            </Card>
                        </div>
                    )}
                    {!isLoadingQuotes && quoteRequests && quoteRequests.length > 0 && (
                        <div className="grid gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3">
                            {quoteRequests.map(request => (
                                <Card key={request.id}>
                                    <CardHeader>
                                        <CardTitle className="text-lg">{request.company}</CardTitle>
                                        <CardDescription>
                                            Inviata il: {format(new Date(request.requestDate), 'd MMMM yyyy, HH:mm', { locale: it })}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground line-clamp-3">"{request.message}"</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                     {!isLoadingQuotes && (!quoteRequests || quoteRequests.length === 0) && (
                        <Card className="mt-4">
                            <CardContent className="pt-6 text-center text-muted-foreground">
                                <p>Non hai ancora inviato nessuna richiesta di preventivo.</p>
                            </CardContent>
                        </Card>
                     )}
                </section>
            </div>
        </AnimateOnScroll>
    );
}