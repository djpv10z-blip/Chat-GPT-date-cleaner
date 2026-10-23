# Privacy / Riservatezza

**ChatGPT Date Cleaner v1.2.0** is an independent, unofficial Chrome extension.

- The extension runs only on `https://chatgpt.com/*` and only communicates with the `chatgpt.com` service when obtaining the current session and reading or changing conversations.
- The extension saves the **chosen interface language** in `chrome.storage.local`. It does **not** persist chat bodies, passwords, auth tokens, or selected conversation lists.
- Session information is held in memory only for requests made from the current tab.
- Generated CSV lists are downloaded to the user's computer, not transmitted by the extension to another service.
- There are no third-party analytics, advertisements, trackers, externally loaded scripts, or external library requests in the supplied source code.
- Data handling by ChatGPT/OpenAI is governed separately by OpenAI's own policies.

## Nota in italiano

L'estensione salva soltanto la lingua scelta nelle impostazioni locali dell'estensione Chrome. Elabora i metadati delle conversazioni nella scheda aperta, comunica solo con `chatgpt.com` ed esporta il CSV localmente. Non contiene sistemi di telemetria, annunci o richieste a siti terzi. Gli eventuali dati gestiti da ChatGPT restano soggetti alle informative di OpenAI.
