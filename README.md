# Shri Amba Textiles — B2B Wholesale Portal (Demo)

A single-page, premium landing page demo for **Shri Amba Textiles**, Chandni Chowk, Delhi.

Built with React 18, Vite, Tailwind CSS and Lucide React.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Where to edit

Everything lives in [`src/ShriAmbaLanding.jsx`](src/ShriAmbaLanding.jsx). Business details sit in the
`BRAND` object at the top of the file:

- `whatsapp`: the real WhatsApp number (digits only, with the 91 country code). **Placeholder right now.**
- `gstin` / `udyam`: registration numbers for the footer badges. **Placeholders right now.**
- `HERO_MEDIA.video`: set an `.mp4` URL to swap the hero image for a background video.
- `COLLECTIONS`: card titles, copy and images (currently Unsplash stock photos).

The inquiry form has no backend. On submit it opens WhatsApp with the inquiry pre-filled.
