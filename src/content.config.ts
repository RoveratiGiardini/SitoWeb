import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ─────────────────────────────────────────────────────────────────────────────
// COLLECTIONS
// ─────────────────────────────────────────────────────────────────────────────

// 1. Servizi
const servizi = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/servizi' }),
  schema: ({ image }) => z.object({ 
    titolo:           z.union([z.string(), z.object({ slug: z.string() })]),
    descrizioneBreve: z.string(),
    inEvidenza:       z.boolean().default(false),
    icona:            z.string().optional(),
    tags:             z.array(z.string()).optional().default([]),
    immagine:         image().optional(), 
    ordine:           z.number().optional().default(99),
  }),
});

// 2. Trasformazioni Prima/Dopo
const trasformazioni = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/trasformazioni' }),
  schema: ({ image }) => z.object({
    titolo:        z.union([z.string(), z.object({ slug: z.string() })]),
    categoria:     z.string().optional(),
    location:      z.string().optional(),
    durata:        z.string().optional(),
    descrizione:   z.string().optional(),
    immaginePrima: image().optional(),
    immagineDopo:  image().optional(),
  }),
});

// 3. Elementi Galleria (griglia masonry)
const elementiGalleria = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/galleria' }),
  schema: ({ image }) => z.object({
    label:     z.union([z.string(), z.object({ slug: z.string() })]),
    categoria: z.string(),
    aspetto:   z.enum(['square', 'tall', 'wide']).default('square'),
    immagine:  image().optional(),
    ordine:    z.number().optional().default(99),
  }),
});

// ─────────────────────────────────────────────────────────────────────────────
// SINGLETON
// ─────────────────────────────────────────────────────────────────────────────

const impostazioni = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/impostazioni' }),
  schema: ({ image }) => z.object({

    // ── Home ──────────────────────────────────────────────────────────────
    heroImage: image().optional(),

    // ── Contatti ──────────────────────────────────────────────────────────
    telefono1:             z.string().optional(),
    telefono1Label:        z.string().optional(),
    telefono2:             z.string().optional(),
    telefono2Label:        z.string().optional(),
    email:                 z.string().optional(),
    indirizzoVia:          z.string().optional(),
    indirizzoCitta:        z.string().optional(),
    googleMapsUrl:         z.string().nullable().optional(),
    googleMapsEmbed:       z.string().optional(),
    orari: z.array(z.object({
      giorno: z.string(),
      orario: z.string(),
      aperto: z.boolean(),
    })).optional(),
    comuni:                z.array(z.string()).optional(),
    descrizioneTerritorio: z.string().optional(),
    serviziForm: z.array(z.object({
      valore:    z.string(),
      etichetta: z.string(),
    })).optional(),

    // ── Azienda ───────────────────────────────────────────────────────────
    storiaIntro:               z.array(z.string()).optional(),
    fotoStoricaGrande:         image().optional(),
    fotoStoricaGrandeCaption:  z.string().optional(),
    fotoStoricaMedia1:         image().optional(),
    fotoStoricaMedia1Caption:  z.string().optional(),
    fotoStoricaMedia2:         image().optional(),
    fotoStoricaMedia2Caption:  z.string().optional(),
    timeline: z.array(z.object({
      anno:    z.string(),
      titolo:  z.string(),
      testo:   z.string(),
      accento: z.boolean(),
    })).optional(),
    valori: z.array(z.object({
      titolo:      z.string(),
      descrizione: z.string(),
      icona:       z.string(),
    })).optional(),
    teamIntroTesto: z.string().optional(),
    teamMembers: z.array(z.object({
      nome:       z.string(),
      ruolo:      z.string(),
      bio:        z.string(),
      specialita: z.array(z.string()).optional().default([]),
      foto:       image().optional(),
    })).optional(),
    fotoSquadra: image().optional(),

    // ── Galleria ──────────────────────────────────────────────────────────
    categorie: z.array(z.string()).optional(),

  }).passthrough(), 
});

// ─────────────────────────────────────────────────────────────────────────────
export const collections = {
  servizi,
  trasformazioni,
  elementiGalleria,
  impostazioni,
};
