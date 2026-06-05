# Social Axe Throwing × Shopify — Merchant Proposal Site

Password-protected single-page proposal for Brayden Floyd (Social Axe Throwing + Bad Caddy Golf), recapping the June 5, 2026 discovery call.

**Password:** shared separately with the merchant.

## How it works

Content is AES-GCM encrypted with a key derived from the password via PBKDF2 (250k iterations). Decryption happens client-side in the browser. Without the password, the page shows only the gate.

## Rebuild after editing content

```
node build.js <password>
```

Source files in `src/` are gitignored. Built artifact lives in `docs/` and is served by GitHub Pages.
