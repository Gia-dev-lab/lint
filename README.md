# Lint Professional Cleaning - Piattaforma B2B

Questo è un progetto Next.js creato con Firebase Studio per "Lint Professional Cleaning", un fornitore di attrezzature per la pulizia professionale B2B.

La piattaforma è progettata per servire come un hub digitale completo, offrendo non solo un catalogo prodotti, ma anche strumenti intelligenti e un'area riservata per i clienti.

## Funzionalità Principali

- **Catalogo Prodotti Dinamico**: Gestione dei prodotti tramite Firestore, con pagine di dettaglio e una visualizzazione completa del catalogo.
- **Ricerca Intelligente**: Funzionalità di ricerca full-text per trovare prodotti per nome, categoria, SKU o descrizione.
- **Configuratore di Kit AI**: Un assistente basato su Genkit (Google AI) che analizza le esigenze del cliente e suggerisce un kit di prodotti su misura dal catalogo esistente.
- **Autenticazione Utenti**: Sistema di registrazione e login per clienti B2B, basato su Firebase Authentication.
- **Area Account Riservata**: Una pagina `/account` dove gli utenti registrati possono visualizzare i loro dati e lo storico delle richieste di preventivo inviate.
- **Richieste di Preventivo**: Modulo per inviare richieste di consulenza o preventivo, che vengono salvate in Firestore e associate all'utente (se loggato).
- **Design Moderno e Responsivo**: Interfaccia utente costruita con Shadcn/UI e Tailwind CSS, con animazioni fluide e un'esperienza utente curata.

## Tecnologie Utilizzate

- **Framework Frontend**: [Next.js](https://nextjs.org/) (con App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Componenti UI**: [Shadcn/UI](https://ui.shadcn.com/)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Firestore per il database, Authentication per gli utenti)
- **Intelligenza Artificiale**: [Genkit (Google AI)](https://firebase.google.com/docs/genkit)
- **Validazione Form**: [Zod](https://zod.dev/) e [React Hook Form](https://react-hook-form.com/)

## Getting Started

Per eseguire il progetto in locale, segui questi passaggi:

### 1. Installazione delle Dipendenze

Apri un terminale nella cartella principale del progetto ed esegui:

```bash
npm install
```

### 2. Avvio del Server di Sviluppo

Una volta installate le dipendenze, puoi avviare il server di sviluppo:

```bash
npm run dev
```

Questo avvierà l'applicazione in modalità sviluppo. Apri [http://localhost:9002](http://localhost:9002) nel tuo browser per vederla in azione.
