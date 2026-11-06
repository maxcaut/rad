# Installazione RAD su iPhone

La cartella contiene una PWA statica, senza dipendenze o backend. Non è ancora pubblicata.

1. Carica nella stessa cartella di un hosting statico HTTPS questi sei file:
   - index.html
   - sw.js
   - manifest.webmanifest
   - icon-192.png
   - icon-512.png
   - apple-touch-icon.png
2. L’hosting deve servire sw.js come JavaScript, senza login o reindirizzamenti a pagine HTML. Non usare anteprime di file di servizi cloud: serve un vero indirizzo web HTTPS.
3. Apri l’indirizzo in Safari su iPhone e attendi “File pronti per l’uso offline”.
4. Tocca Condividi → Aggiungi alla schermata Home. Se presente, abilita “Apri come app web”.
5. Apri RAD dalla nuova icona mentre sei ancora connesso. Attendi di nuovo “File pronti per l’uso offline”.
6. Premi Avvia ricezione e autorizza il microfono.
7. Attiva la modalità aereo, disattiva anche il Wi-Fi, chiudi e riapri RAD dall’icona. Verifica che l’interfaccia si carichi, che il test modem passi e che il microfono funzioni. Ripeti su entrambi gli iPhone.
8. Collega le interfacce audio e verifica la trasmissione con due radio prima dell’uso sul campo.

Per l’uso successivo non serve il server: le risorse sono conservate sul dispositivo. La cancellazione dei dati del sito, la rimozione dell’app o l’eventuale perdita della cache richiedono una nuova preparazione online. La conferma controlla la presenza dei file, non il funzionamento della radio.

La ricezione è prevista con app aperta in primo piano e schermo acceso. PTT manuale o VOX e interfaccia audio bidirezionale sono comunque necessari. La cronologia chat resta solo in memoria e si perde alla chiusura.

Per aggiornare: cambia VERSION in sw.js e carica tutti i file aggiornati. Apri online, poi chiudi tutte le finestre RAD e riapri per consentire l’attivazione del nuovo worker; verifica il numero di versione nell’indicatore offline. Non aggiornare durante una comunicazione.

Per prove su Mac: `python3 -m http.server 8080 --bind 127.0.0.1`, poi apri http://localhost:8080. L’indirizzo HTTP del Mac sulla rete locale non equivale a localhost sull’iPhone e non abilita la PWA o il microfono: per iPhone usa HTTPS attendibile.
