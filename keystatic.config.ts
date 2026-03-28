import { config, fields, collection, singleton } from '@keystatic/core';

const isProd = import.meta.env.PROD;

export default config({
  storage: isProd ? 
      {
        kind: 'github',
        repo: {
          owner: 'RoveratiGiardini',
          name: 'SitoWeb',
        },
      }
    : {
        kind: 'local',
      },

  // ════════════════════════════════════════════════════════
  // SINGLETON — una voce sola, modificabile dal CMS
  // ════════════════════════════════════════════════════════
  singletons: {

    // ── Home ─────────────────────────────────────────────
    impostazioniHome: singleton({
      label: 'Impostazioni Home Page',
      path: 'src/content/impostazioni/home',
      format: { data: 'json' },
      schema: {
        heroImage: fields.image({
          label: 'Immagine Hero Background',
          directory: 'src/assets/images/home',
          publicPath: '../../assets/images/home',
        }),
      },
    }),

    // ── Contatti ─────────────────────────────────────────
    impostazioniContatti: singleton({
      label: 'Impostazioni Pagina Contatti',
      path: 'src/content/impostazioni/contatti',
      format: { data: 'json' },
      schema: {
        telefono1: fields.text({
          label: 'Telefono principale',
          description: 'Es. +39 388 242 5127',
        }),
        telefono1Label: fields.text({
          label: 'Etichetta telefono principale',
          defaultValue: 'Cellulare',
        }),
        telefono2: fields.text({
          label: 'Telefono secondario (opzionale)',
          description: 'Lascia vuoto se non usato',
        }),
        telefono2Label: fields.text({
          label: 'Etichetta telefono secondario',
          defaultValue: 'Fisso',
        }),
        email: fields.text({ label: 'Email' }),
        indirizzoVia: fields.text({
          label: 'Indirizzo (via/stradello)',
          description: "Es. Stradello Ca' Nova 91",
        }),
        indirizzoCitta: fields.text({
          label: 'Indirizzo (città + CAP + provincia)',
          description: 'Es. 44020 Dogato (FE)',
        }),
        googleMapsUrl: fields.url({
          label: 'URL Google Maps (link diretto)',
          description: "Link \"Apri in Maps\" — dall'app Google Maps → Condividi",
        }),
        googleMapsEmbed: fields.text({
          label: 'URL embed Google Maps (iframe src)',
          description: 'Google Maps → Condividi → Incorpora mappa → copia solo il src',
          multiline: false,
        }),
        orari: fields.array(
          fields.object({
            giorno:  fields.text({ label: 'Giorno / Fascia', description: 'Es. Lunedì – Venerdì' }),
            orario:  fields.text({ label: 'Orario',           description: 'Es. 8:00 – 18:00' }),
            aperto:  fields.checkbox({ label: 'Aperto', defaultValue: true }),
          }),
          {
            label: 'Orari di disponibilità',
            itemLabel: props => `${props.fields.giorno.value} — ${props.fields.orario.value}`,
          }
        ),
        comuni: fields.array(
          fields.text({ label: 'Comune' }),
          { label: 'Comuni serviti (badge)', itemLabel: props => props.value }
        ),
        descrizioneTerritorio: fields.text({
          label: 'Descrizione area di intervento',
          multiline: true,
        }),
        serviziForm: fields.array(
          fields.object({
            valore:    fields.text({ label: 'Valore (slug)', description: 'Es. tree-climbing — senza spazi' }),
            etichetta: fields.text({ label: 'Etichetta mostrata' }),
          }),
          {
            label: 'Opzioni "Tipo di intervento" nel form preventivo',
            itemLabel: props => props.fields.etichetta.value,
          }
        ),
      },
    }),

    // ── Azienda ──────────────────────────────────────────
    impostazioniAzienda: singleton({
      label: 'Impostazioni Pagina Azienda',
      path: 'src/content/impostazioni/azienda',
      format: { data: 'json' },
      schema: {

        // — Testi introduttivi storia —
        storiaIntro: fields.array(
          fields.text({ label: 'Paragrafo', multiline: true }),
          {
            label: 'Paragrafi sezione "La Nostra Storia"',
            itemLabel: props => props.value.slice(0, 60) + '…',
          }
        ),

        // — Foto storiche collage —
        fotoStoricaGrande: fields.image({
          label: 'Foto storica grande (sinistra)',
          directory: 'src/assets/images/azienda',
          publicPath: '../../assets/images/azienda',
        }),
        fotoStoricaGrandeCaption: fields.text({
          label: 'Didascalia foto grande',
          description: "Es. Ferrara, anni '80",
        }),
        fotoStoricaMedia1: fields.image({
          label: 'Foto storica piccola (in alto a destra)',
          directory: 'src/assets/images/azienda',
          publicPath: '../../assets/images/azienda',
        }),
        fotoStoricaMedia1Caption: fields.text({ label: 'Didascalia foto piccola in alto' }),
        fotoStoricaMedia2: fields.image({
          label: 'Foto storica piccola (in basso a destra)',
          directory: 'src/assets/images/azienda',
          publicPath: '../../assets/images/azienda',
        }),
        fotoStoricaMedia2Caption: fields.text({ label: 'Didascalia foto piccola in basso' }),

        // — Timeline —
        timeline: fields.array(
          fields.object({
            anno:    fields.text({ label: 'Anno / Etichetta', description: "Es. 1974 oppure Oggi" }),
            titolo:  fields.text({ label: 'Titolo evento' }),
            testo:   fields.text({ label: 'Descrizione', multiline: true }),
            accento: fields.checkbox({
              label: "Evidenzia (cerchio verde — usalo per il primo e l'ultimo)",
              defaultValue: false,
            }),
          }),
          {
            label: 'Timeline storica',
            itemLabel: props => `${props.fields.anno.value} — ${props.fields.titolo.value}`,
          }
        ),

        // — Valori —
        valori: fields.array(
          fields.object({
            titolo:      fields.text({ label: 'Titolo valore' }),
            descrizione: fields.text({ label: 'Descrizione', multiline: true }),
            icona: fields.select({
              label: 'Icona',
              options: [
                { label: 'Natura / Sole',         value: 'nature' },
                { label: 'Qualità / Scudo',       value: 'quality' },
                { label: 'Team / Persone',        value: 'team' },
                { label: 'Ascolto / Dialogo',     value: 'listen' },
                { label: 'Crescita / Albero',     value: 'growth' },
                { label: 'Sicurezza / Lucchetto', value: 'security' },
              ],
              defaultValue: 'nature',
            }),
          }),
          {
            label: 'Valori aziendali',
            itemLabel: props => props.fields.titolo.value,
          }
        ),

        // — Team / Titolari —
        teamIntroTesto: fields.text({
          label: 'Testo introduttivo sezione Team',
          multiline: true,
          description: 'Mostrato sotto il titolo "Le persone dietro ogni giardino"',
        }),
        teamMembers: fields.array(
          fields.object({
            nome:  fields.text({ label: 'Nome e cognome' }),
            ruolo: fields.text({ label: 'Ruolo / Qualifica' }),
            bio:   fields.text({ label: 'Biografia breve', multiline: true }),
            specialita: fields.array(
              fields.text({ label: 'Specialità' }),
              { label: 'Specialità / Tag', itemLabel: props => props.value }
            ),
            foto: fields.image({
              label: 'Foto profilo',
              directory: 'src/assets/images/azienda/team',
              publicPath: '../../assets/images/azienda/team',
            }),
          }),
          {
            label: 'Membri del team (titolari)',
            itemLabel: props => `${props.fields.nome.value} — ${props.fields.ruolo.value}`,
          }
        ),

        // — Foto squadra —
        fotoSquadra: fields.image({
          label: 'Foto di gruppo (banner orizzontale)',
          directory: 'src/assets/images/azienda',
          publicPath: '../../assets/images/azienda',
        }),
      },
    }),

    // ── Galleria ─────────────────────────────────────────
    impostazioniGalleria: singleton({
      label: 'Impostazioni Pagina Galleria',
      path: 'src/content/impostazioni/galleria',
      format: { data: 'json' },
      schema: {
        // Le categorie del filtro — "Tutti" viene aggiunto in automatico dal codice
        categorie: fields.array(
          fields.text({ label: 'Categoria' }),
          {
            label: 'Categorie filtro galleria',
            description: 'Non aggiungere "Tutti" — viene aggiunto automaticamente come primo filtro',
            itemLabel: props => props.value,
          }
        ),
      },
    }),
  },

  // ════════════════════════════════════════════════════════
  // COLLECTION — voci multiple, una per item
  // ════════════════════════════════════════════════════════
  collections: {

    servizi: collection({
      label: 'Servizi di Giardinaggio',
      slugField: 'titolo',
      path: 'src/content/servizi/*',
      format: { data: 'json' },
      schema: {
        titolo:           fields.slug({ name: { label: 'Titolo' } }),
        descrizioneBreve: fields.text({ label: 'Descrizione Breve', multiline: true }),
        inEvidenza:       fields.checkbox({ label: 'Mostra in evidenza nella Home', defaultValue: false }),
        icona: fields.select({
          label: 'Icona SVG',
          options: [
            { label: 'Foglia (Generica)',       value: 'leaf' },
            { label: 'Albero (Tree Climbing)',  value: 'tree' },
            { label: 'Cubo (Progettazione 3D)', value: '3d' },
          ],
          defaultValue: 'leaf',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tag del servizio',
          itemLabel: props => props.value,
        }),
        immagine: fields.image({
          label: 'Immagine Principale',
          directory: 'src/assets/images/servizi',
          publicPath: '../../assets/images/servizi',
        }),
        ordine: fields.integer({
          label: 'Ordine di visualizzazione',
          description: 'Numero intero — i servizi sono mostrati in ordine crescente (1 = primo)',
          defaultValue: 99,
          validation: { min: 0 },
        }),
      },
    }),

    // — Trasformazioni Prima/Dopo — usate in Home, Galleria e potenzialmente Servizi —
    trasformazioni: collection({
      label: 'Trasformazioni Prima / Dopo',
      slugField: 'titolo',
      path: 'src/content/trasformazioni/*',
      format: { data: 'json' },
      schema: {
        titolo:      fields.slug({ name: { label: 'Titolo Lavoro' } }),
        location:    fields.text({ label: 'Località', description: 'Es. Ferrara, zona sud' }),
        durata:      fields.text({ label: 'Durata lavori', description: 'Es. 3 settimane' }),
        descrizione: fields.text({ label: 'Descrizione del progetto', multiline: true }),
        categoria: fields.select({
          label: 'Categoria',
          options: [
            { label: 'Giardini Privati', value: 'Giardini Privati' },
            { label: 'Parchi & Enti',    value: 'Parchi & Enti' },
            { label: 'Tree Climbing',    value: 'Tree Climbing' },
            { label: 'Progettazione 3D', value: 'Progettazione 3D' },
            { label: 'Irrigazione',      value: 'Irrigazione' },
          ],
          defaultValue: 'Giardini Privati',
        }),
        immaginePrima: fields.image({
          label: 'Immagine Prima',
          directory: 'src/assets/images/trasformazioni',
          publicPath: '../../assets/images/trasformazioni',
        }),
        immagineDopo: fields.image({
          label: 'Immagine Dopo',
          directory: 'src/assets/images/trasformazioni',
          publicPath: '../../assets/images/trasformazioni',
        }),
      },
    }),

    // — Elementi griglia galleria —
    elementiGalleria: collection({
      label: 'Galleria — Foto (griglia)',
      slugField: 'label',
      path: 'src/content/galleria/*',
      format: { data: 'json' },
      schema: {
        label:     fields.slug({ name: { label: 'Didascalia', description: 'Es. Villa residenziale, Ferrara' } }),
        categoria: fields.text({
          label: 'Categoria',
          description: 'Deve corrispondere esattamente a una delle categorie in Impostazioni Galleria',
        }),
        aspetto: fields.select({
          label: 'Proporzioni nella griglia',
          options: [
            { label: 'Quadrato',          value: 'square' },
            { label: 'Alto (2 righe)',    value: 'tall' },
            { label: 'Largo (2 colonne)', value: 'wide' },
          ],
          defaultValue: 'square',
        }),
        immagine: fields.image({
          label: 'Foto',
          directory: 'src/assets/images/galleria',
          publicPath: '../../assets/images/galleria',
        }),
        ordine: fields.integer({
          label: 'Ordine di visualizzazione',
          description: 'Numero intero — elementi con numero minore appaiono prima',
          defaultValue: 99,
          validation: { min: 0 },
        }),
      },
    }),
  },
});
