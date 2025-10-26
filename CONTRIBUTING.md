# Contribuire al Progetto

Grazie per il tuo interesse nel contribuire! Segui queste linee guida per rendere il processo semplice e chiaro per tutti.

## Come Contribuire

### 1. Clona il Repository

Clona il repository sul tuo sistema locale.

```bash
git clone <URL_DEL_REPOSITORY>
cd <NOME_DELLA_CARTELLA>
```

### 2. Crea un Nuovo Branch

Crea un branch specifico per le tue modifiche. Usa un nome descrittivo (es. `feature/aggiungi-login` o `fix/correzione-bug-header`).

```bash
git checkout -b <nome-del-tuo-branch>
```

### 3. Apporta le Tue Modifiche

Lavora sul codice, apporta le modifiche e testa che tutto funzioni come previsto.

### 4. Esegui il Commit delle Modifiche

Aggiungi i file modificati e crea un commit con un messaggio chiaro che descriva cosa hai fatto.

```bash
# Aggiungi tutti i file modificati
git add .

# Crea il commit
git commit -m "feat: Aggiunta la funzionalità X"
# o "fix: Risolto il problema Y"
```

### 5. Esegui il Push del Branch su GitHub

Carica il tuo branch sul repository remoto.

```bash
git push origin <nome-del-tuo-branch>
```

### 6. Apri una Pull Request

Vai sulla pagina del repository su GitHub. Vedrai un avviso che ti invita a creare una **Pull Request** dal branch che hai appena caricato. Cliccaci sopra, aggiungi una descrizione dettagliata delle modifiche e invia la richiesta.

## Comandi Utili per l'Aggiornamento

Per mantenere il tuo branch aggiornato con il branch principale (`main` o `master`).

### 1. Aggiorna il Tuo Branch `main` Locale

```bash
git checkout main
git pull origin main
```

### 2. Riporta le Modifiche sul Tuo Branch

Torna sul tuo branch di lavoro e unisci le modifiche da `main`.

```bash
git checkout <nome-del-tuo-branch>
git rebase main
# In caso di conflitti, risolvili e poi esegui 'git rebase --continue'
```

### 3. Esegui il Push delle Modifiche Aggiornate

Se hai usato `rebase`, potresti dover forzare il push (usa `--force-with-lease` per sicurezza).

```bash
git push origin <nome-del-tuo-branch> --force-with-lease
```
