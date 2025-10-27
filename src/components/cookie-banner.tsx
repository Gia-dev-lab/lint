"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie } from 'lucide-react';
import Link from 'next/link';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // localStorage is a client-side only API
    const consent = localStorage.getItem('cookie_consent');
    if (consent !== 'true') {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-full max-w-md">
       <Card className="bg-secondary text-secondary-foreground shadow-2xl animate-in slide-in-from-bottom-5 fade-in-25 duration-300">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Cookie className="h-8 w-8 mt-1 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold">Informativa sui Cookie</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Utilizziamo i cookie per migliorare la tua esperienza di navigazione. Cliccando su "Accetta", acconsenti al nostro utilizzo dei cookie.
                {' '}
                <Link href="/privacy" className="underline hover:text-primary">
                  Leggi di più
                </Link>.
              </p>
              <Button onClick={handleAccept} className="mt-3 w-full sm:w-auto" size="sm">
                Accetta
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
