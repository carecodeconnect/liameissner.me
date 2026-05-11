// Central translations for the entire site.
// To add or edit copy: edit the `de` or `en` block below.
// Components consume this via a `lang` prop and read `translations[lang]`.

export type Lang = 'de' | 'en';
export const langs: Lang[] = ['de', 'en'];

export type PillarOffer = {
  title: string;
  body: string;
  link: { href: string; label: string };
};

export type Pillar = {
  num: string;
  id: string;
  title: string;
  blurb: string;
  intro: { heading: string; body: string };
  pubs?: { title: string; year: string }[];
  pubsLink?: { href: string; label: string };
  offers: PillarOffer[];
};

export type AktuellCard = {
  kategorie: string;
  titel: string;
  untertitel: string;
  datum: string;
  cta: string;
  href: string;
};

export type Translations = {
  htmlLang: string;
  /** Brand name as it appears visually — "Lia Meißner" in German, "Lia Meissner" (no ß) in English. */
  brand: string;
  meta: {
    title: string;
    description: string;
  };
  nav: {
    menuLabel: string;
    socialLabel: string;
    hauptnavLabel: string;
    mobileNavLabel: string;
    links: { href: string; label: string }[];
    langSwitchLabel: string;
    langSwitchHref: string;
    langSwitchAria: string;
  };
  hero: {
    headlineLines: { text: string; italic?: boolean; accent?: boolean }[];
    intro: string;
    imageAlt: string;
    /** Caption uses HTML; <em> renders italic. */
    captionHtml: string;
  };
  mission: {
    kicker: string;
    headline: string;
  };
  pillars: {
    kicker: string;
    pubsKicker: string;
    items: Pillar[];
  };
  about: {
    kicker: string;
    statement: string;
    subline: string;
    /** Each entry is HTML-allowed (so <em> tags render). */
    paragraphsHtml: string[];
    imageAlt: string;
  };
  aktuell: {
    kicker: string;
    headline: string;
    carouselLabel: string;
    prevLabel: string;
    nextLabel: string;
    cards: AktuellCard[];
  };
  kontakt: {
    kicker: string;
    headline: string;
    intro: string;
    labels: {
      name: string;
      email: string;
      phone: string;
      org: string;
      anliegen: string;
      message: string;
    };
    placeholders: {
      name: string;
      email: string;
      phone: string;
      org: string;
      message: string;
    };
    /** Visible labels for the Anliegen chips. */
    anliegen: string[];
    note: string;
    submit: string;
    web3FormsSubject: string;
    web3FormsFromName: string;
    anliegenAria: string;
  };
  footer: {
    socialLabel: string;
    legalAria: string;
    legal: { href: string; label: string }[];
  };
};

export const translations: Record<Lang, Translations> = {
  de: {
    htmlLang: 'de',
    brand: 'Lia Meißner',
    meta: {
      title: 'Lia Meißner — Heartfelt Futures',
      description:
        'Lia Meißner — Zukunftsforscherin, Psychologin und Strategin für Heartfelt Futures. Eine Praxis zwischen Foresight, somatischer Arbeit und Speculative Design.',
    },
    nav: {
      menuLabel: 'Menü',
      socialLabel: 'Soziale Medien',
      hauptnavLabel: 'Hauptnavigation',
      mobileNavLabel: 'Mobile Navigation',
      links: [
        { href: '#wofur', label: 'Mission' },
        { href: '#arbeit', label: 'Arbeit' },
        { href: '#uber', label: 'Über mich' },
        { href: '#aktuell', label: 'Aktuelles' },
        { href: '#kontakt', label: 'Kontakt' },
      ],
      langSwitchLabel: 'EN',
      langSwitchHref: '/en/',
      langSwitchAria: 'Switch to English',
    },
    hero: {
      headlineLines: [
        { text: 'fühlen.', italic: true, accent: true },
        { text: 'denken.' },
        { text: 'gestalten.' },
      ],
      intro: 'Lia Meißner — Zukunftsforscherin, Psychologin und Strategin für Heartfelt Futures',
      imageAlt: 'Lia Meißner im Mast eines Segelschiffs',
      captionHtml:
        '<em>„Wind in my hair, I feel part of everywhere…"</em>, Atlantiküberquerung, 2025',
    },
    mission: {
      kicker: 'MISSION HEARTFELT FUTURES',
      headline:
        'Ich liebe es, groß zu denken und Visionen für ein besseres Morgen zu entwickeln. Gemeinsam entwerfen wir Zukunftsbilder, die Zuversicht geben und uns wieder mit unserer Kreativität und Begeisterung verbinden. Von der Analyse zur Strategie bis hin zur Umsetzung.',
    },
    pillars: {
      kicker: 'MEINE ARBEIT',
      pubsKicker: 'Veröffentlichungen (Auswahl)',
      items: [
        {
          num: '01',
          id: 'p1',
          title: 'Strategic Foresight',
          blurb:
            'Strategie braucht Klarheit und die kommt aus guter Analyse und gekonnter Antizipation. Ich praktiziere und lehre Foresight-Methoden und berate mit Freude und Präsenz. Unternehmen, Ministerien und innovative Projekte.',
          intro: {
            heading: 'Foresight-Arbeit',
            body: 'Foresight ist für mich kein Vorhersage-Versprechen, sondern Sensemaking: Annahmen prüfen, blinde Flecken aufdecken, tragfähige Optionen entwickeln. Diese Praxis habe ich am Fraunhofer ISI, bei VDI/VDE Innovation + Technik und in eigener Beratung geschärft.',
          },
          pubs: [
            { title: 'People Analytics in der öffentlichen Verwaltung · TAB', year: '2026' },
            { title: '7 Foresight-Methoden zur erfolgreichen Strategieentwicklung', year: '2024' },
            { title: 'Gesellschaftliche Auswirkungen hybrider Arbeitsformen · TAB', year: '2024' },
            { title: 'Seltene Erden: Rohstoffsicherung in Europa · TAB', year: '2024' },
            { title: 'Innovative Schiffbaukonzepte · TAB', year: '2022' },
          ],
          pubsLink: {
            href: 'https://www.researchgate.net/profile/Lia-Meissner',
            label: 'Vollständige Publikationsliste auf ResearchGate ↗',
          },
          offers: [
            {
              title: 'Angewandte Zukunftsforschung',
              body: 'Forschungs- und Strategieprojekte für Organisationen mit komplexen Zukunftsfragen. Erfahrung u. a. mit Unternehmen, Bundesministerien, Büro für Technikfolgenabschätzung (TAB), Verbänden, NGOs.',
              link: { href: '#kontakt', label: '→ Projekt anfragen' },
            },
            {
              title: 'Keynotes',
              body: 'Vorträge z.B. zu Foresight, Zukunftsmut und alternativen Zukünften — für Konferenzen, Strategie-Klausuren und Hochschulen.',
              link: { href: '#kontakt', label: '→ Keynote anfragen' },
            },
            {
              title: 'Foresight-Weiterbildung',
              body: 'Ich lehre Foresight an der FU Berlin und biete maßgeschneiderte Trainings für Organisationen an — vom eintägigen Crashkurs bis zum mehrteiligen Curriculum.',
              link: { href: '#kontakt', label: '→ Weiterbildung anfragen' },
            },
          ],
        },
        {
          num: '02',
          id: 'p2',
          title: 'Systemic Therapy',
          blurb:
            'Wohin mit all dem verdammten Schmerz?! Veränderung kann richtig weh tun. Krise, Krankheit, Burnout, der Verlust eines Menschen oder einer Gewissheit. Du musst da nicht alleine durch. Genau dafür habe ich das <em>Life Repair Kit</em> gegründet.',
          intro: {
            heading: 'Systemische Begleitung',
            body: 'Ich bin ausgebildete systemische Beraterin und Therapeutin und arbeite mit Menschen in tiefgreifenden Übergängen. Meine Arbeit verbindet systemisches Denken, Embodiment und Resilienzforschung.',
          },
          offers: [
            {
              title: '1:1 Coaching',
              body: 'Einzelsitzungen, z.B. bei Burnout, Long Covid, Trennung, Trauer, Berufs- und Sinnkrisen.',
              link: { href: 'https://www.liferepairkit.com', label: '→ Termin buchen' },
            },
            {
              title: 'Life Repair Kit',
              body: 'Tools für gutes Leben. Werkzeuge, die dir in schwierigen Zeiten wirklich Halt geben.',
              link: { href: 'https://www.liferepairkit.com', label: '→ Webseite besuchen' },
            },
            {
              title: 'Resilienz-Workshops',
              body: 'Für Teams und Organisationen. Burnout entsteht in Strukturen — genau dort setzen meine ganzheitlichen Resilienz-Workshops an.',
              link: { href: '#kontakt', label: '→ Workshop anfragen' },
            },
          ],
        },
        {
          num: '03',
          id: 'p3',
          title: 'Speculative Design',
          blurb:
            '„There is no alternative" ist eine der größten Lügen unserer Zeit. Andere Zukünfte sind möglich — und wir können sie gemeinsam erschaffen. In meinem Studio <em>Heartfelt Futures</em> entwickle ich — und im Werden eines Kollektivs — Bilder, Räume und Praktiken alternativer Zukünfte, die um Liebe, Care und Zugehörigkeit gebaut sind.',
          intro: {
            heading: 'Heartfelt Futures Studio',
            body: 'Hier entstehen Bilder, Räume und Workshops, die Foresight mit Embodiment und künstlerischer Praxis verbinden. Wo andere Zukunftsforschung in Reports endet, fängt meine Arbeit an: bei der Frage, wie sich eine Zukunft anfühlen würde, in der wir gut leben.',
          },
          offers: [
            {
              title: 'Speculative Design Studio',
              body: 'Bilder, Objekte, Texte und Räume, die alternative Zukünfte sichtbar machen. Aufträge möglich für Organisationen, Stiftungen und Institutionen.',
              link: { href: '#kontakt', label: '→ Anfrage' },
            },
            {
              title: 'Visioning-Workshops',
              body: 'Zukünfte werden hier nicht am Whiteboard entworfen, sondern mit Körper, Material und Imagination. Foresight trifft Speculative Design.',
              link: { href: '#kontakt', label: '→ Workshop anfragen' },
            },
            {
              title: 'Heartfelt Futures Kollektiv',
              body: 'Ein Kollektiv aus Menschen, die an der Schnittstelle von Foresight, Care und Gestaltung arbeiten wollen.',
              link: { href: '#kontakt', label: '→ Anfrage' },
            },
          ],
        },
      ],
    },
    about: {
      kicker: 'ÜBER MICH',
      statement: 'Ich bin Lia Meißner.',
      subline:
        'Seit über zehn Jahren arbeite ich an der Schnittstelle von Zukunftsforschung, Psychologie und künstlerischer Praxis.',
      paragraphsHtml: [
        'Ich habe Psychologie und Soziologie studiert, später Philosophy, Politics &amp; Economics. Seit 2018 verfasse ich Foresight-Studien für den öffentlichen Sektor — am Fraunhofer-Institut für System- und Innovationsforschung, bei VDI/VDE Innovation + Technik für das Büro für Technikfolgen-Abschätzung beim Deutschen Bundestag.',
        'Vieles, was ich über Antizipation, Teamwork und Entscheiden unter Unsicherheit weiß, habe ich auf hoher See gelernt — zuletzt bei meiner Atlantiküberquerung 2025 unter Segeln.',
        'Parallel dazu habe ich eine Ausbildung als systemische Beraterin und Therapeutin abgeschlossen und das <em>Life Repair Kit</em> gegründet — eine Praxis für Menschen, die durch Krise und Transformation gehen.',
        'Heute baue ich <em>Heartfelt Futures</em>: eine Praxis, die wissenschaftliche Foresight mit systemischer Klarheit, verkörpertem Wissen und Ästhetik verbindet. Ich lehre Foresight an der Freien Universität Berlin, berate Organisationen und halte Vorträge.',
      ],
      imageAlt: 'Porträt von Lia Meißner im Studio',
    },
    aktuell: {
      kicker: 'AKTUELLES',
      headline: 'Was gerade läuft.',
      carouselLabel: 'Aktuelles Karussell',
      prevLabel: 'Zurück',
      nextLabel: 'Weiter',
      cards: [
        {
          kategorie: 'Podcast',
          titel: 'Jeden Sommer 45 Grad? Was dann?',
          untertitel: 'Interview im tagesschau Zukunfts-Podcast „Mal angenommen…"',
          datum: '29.07.2024',
          cta: '→ Jetzt anhören',
          href: 'https://www.tagesschau.de/multimedia/audio/podcast-mal-angenommen-hitzewellen-100.html',
        },
        {
          kategorie: 'Neue Studie',
          titel: 'People Analytics in der öffentlichen Verwaltung',
          untertitel: 'Studie fürs Büro für Technikfolgenabschätzung (TAB)',
          datum: '28. April 2026',
          cta: '→ Lesen',
          href: 'https://www.tab-beim-bundestag.de/projekte_nutzung-von-technologien-zur-auswertung-von-beschaeftigtendaten-in-der-oeffentlichen-verwaltung.php',
        },
        {
          kategorie: 'Podcast',
          titel: 'Wie umgehen mit Zukunftsangst?',
          untertitel: 'Interview im WIE WEITER Podcast',
          datum: '12. Mai 2026',
          cta: '→ Mehr erfahren',
          href: 'https://www.podcast.de/podcast/3473321/wie-weiter-loesungen-fuer-eine-gute-zukunft',
        },
        {
          kategorie: 'Lehre',
          titel: 'Einführung in die Strategische Vorausschau',
          untertitel: 'Online-Kurs an der Freien Universität Berlin',
          datum: '18. Mai 2026',
          cta: '→ Mehr erfahren',
          href: 'https://veranstaltung.weiterbildung.fu-berlin.de/Veranstaltung/cmx6890b44771615.html',
        },
        {
          kategorie: 'Lehre',
          titel: 'Vertiefungsworkshop Szenarioentwicklung',
          untertitel: 'Präsenz-Workshop an der Freien Universität Berlin',
          datum: '07. Dez 2026',
          cta: '→ Mehr erfahren',
          href: 'https://veranstaltung.weiterbildung.fu-berlin.de/Veranstaltung/cmx6890b537c15c4.html',
        },
      ],
    },
    kontakt: {
      kicker: 'KONTAKT',
      headline: 'Sag Hallo',
      intro:
        'Schreib mir, wenn du mit mir arbeiten möchtest — als Organisation, als Einzelperson, oder als Teil dessen, was Heartfelt Futures werden wird.',
      labels: {
        name: 'Name',
        email: 'E-Mail',
        phone: 'Telefon',
        org: 'Organisation',
        anliegen: 'Anliegen',
        message: 'Nachricht',
      },
      placeholders: {
        name: 'Vor- und Nachname',
        email: 'name@beispiel.de',
        phone: 'optional',
        org: 'optional',
        message: 'Worum geht es? Erzähl mir kurz, was du dir vorstellst.',
      },
      anliegen: [
        'Foresight Studie',
        'Lehre',
        'Keynote',
        'Workshop',
        '1:1 Coaching',
        'Presse / Medien',
        'Anderes',
      ],
      note: '* Pflichtfelder · Daten gemäß DSGVO',
      submit: 'Nachricht senden →',
      web3FormsSubject: 'Neue Nachricht über liameissner.me',
      web3FormsFromName: 'liameissner.me Kontaktformular',
      anliegenAria: 'Anliegen',
    },
    footer: {
      socialLabel: 'Soziale Medien',
      legalAria: 'Rechtliches',
      legal: [
        { href: '/impressum/', label: 'Impressum' },
        { href: '/datenschutz/', label: 'Datenschutz' },
      ],
    },
  },

  en: {
    htmlLang: 'en',
    brand: 'Lia Meissner',
    meta: {
      title: 'Lia Meissner — Heartfelt Futures',
      description:
        'Lia Meissner — future scientist, psychologist, and strategist for Heartfelt Futures. A practice between foresight, somatic work, and speculative design.',
    },
    nav: {
      menuLabel: 'Menu',
      socialLabel: 'Social media',
      hauptnavLabel: 'Main navigation',
      mobileNavLabel: 'Mobile navigation',
      links: [
        { href: '#wofur', label: 'Mission' },
        { href: '#arbeit', label: 'Work' },
        { href: '#uber', label: 'About' },
        { href: '#aktuell', label: 'Updates' },
        { href: '#kontakt', label: 'Contact' },
      ],
      langSwitchLabel: 'DE',
      langSwitchHref: '/',
      langSwitchAria: 'Zur deutschen Version wechseln',
    },
    hero: {
      headlineLines: [
        { text: 'feel.', italic: true, accent: true },
        { text: 'think.' },
        { text: 'shape.' },
      ],
      intro:
        'Lia Meissner — future scientist, psychologist and strategist for Heartfelt Futures',
      imageAlt: 'Lia Meissner in the mast of a sailing ship',
      captionHtml:
        '<em>"Wind in my hair, I feel part of everywhere…"</em>, Atlantic crossing, 2025',
    },
    mission: {
      kicker: 'MISSION HEARTFELT FUTURES',
      headline:
        'I love thinking big and shaping visions of a better tomorrow. Together we craft images of the future that build confidence and reconnect us with our creativity and joy. From analysis to strategy to implementation.',
    },
    pillars: {
      kicker: 'MY WORK',
      pubsKicker: 'Publications (selection)',
      items: [
        {
          num: '01',
          id: 'p1',
          title: 'Strategic Foresight',
          blurb:
            'Strategy needs clarity — and clarity comes from rigorous analysis and skillful anticipation. I practice and teach foresight methods, and advise with focus and presence. Companies, ministries and ambitious projects.',
          intro: {
            heading: 'Foresight work',
            body: 'For me, foresight is not a prediction promise — it\'s sensemaking: testing assumptions, surfacing blind spots, developing viable options. I sharpened this practice at Fraunhofer ISI, at VDI/VDE Innovation + Technik, and in my own consulting work.',
          },
          pubs: [
            { title: 'People Analytics in der öffentlichen Verwaltung · TAB', year: '2026' },
            { title: '7 Foresight-Methoden zur erfolgreichen Strategieentwicklung', year: '2024' },
            { title: 'Gesellschaftliche Auswirkungen hybrider Arbeitsformen · TAB', year: '2024' },
            { title: 'Seltene Erden: Rohstoffsicherung in Europa · TAB', year: '2024' },
            { title: 'Innovative Schiffbaukonzepte · TAB', year: '2022' },
          ],
          pubsLink: {
            href: 'https://www.researchgate.net/profile/Lia-Meissner',
            label: 'Full publication list on ResearchGate ↗',
          },
          offers: [
            {
              title: 'Applied Futures Research',
              body: 'Research and strategy projects for organisations facing complex futures questions. Experience includes companies, German federal ministries, the German Bundestag\'s Office of Technology Assessment (TAB), associations, NGOs.',
              link: { href: '#kontakt', label: '→ Request a project' },
            },
            {
              title: 'Keynotes',
              body: 'Talks on foresight, courage for the future, and alternative futures — for conferences, strategy retreats and universities.',
              link: { href: '#kontakt', label: '→ Book a keynote' },
            },
            {
              title: 'Foresight Training',
              body: 'I teach foresight at Freie Universität Berlin and offer tailored training for organisations — from a one-day intensive to a multi-module curriculum.',
              link: { href: '#kontakt', label: '→ Request training' },
            },
          ],
        },
        {
          num: '02',
          id: 'p2',
          title: 'Systemic Therapy',
          blurb:
            'Where to put all that damn pain?! Change can really hurt. Crisis, illness, burnout, the loss of a person or of a certainty. You don\'t have to go through it alone. That\'s exactly why I founded <em>Life Repair Kit</em>.',
          intro: {
            heading: 'Systemic accompaniment',
            body: 'I\'m a trained systemic counsellor and therapist, working with people in deep transitions. My practice connects systemic thinking, embodiment and resilience research.',
          },
          offers: [
            {
              title: '1:1 Coaching',
              body: 'One-on-one sessions for burnout, Long Covid, separation, grief, career and meaning crises — among others.',
              link: { href: 'https://www.liferepairkit.com', label: '→ Book a session' },
            },
            {
              title: 'Life Repair Kit',
              body: 'Tools for a good life. Tools that actually hold you steady through hard times.',
              link: { href: 'https://www.liferepairkit.com', label: '→ Visit the website' },
            },
            {
              title: 'Resilience Workshops',
              body: 'For teams and organisations. Burnout grows in structures — that\'s exactly where my holistic resilience workshops begin.',
              link: { href: '#kontakt', label: '→ Request a workshop' },
            },
          ],
        },
        {
          num: '03',
          id: 'p3',
          title: 'Speculative Design',
          blurb:
            '"There is no alternative" is one of the biggest lies of our time. Other futures are possible — and we can build them together. In my studio <em>Heartfelt Futures</em> — and in the becoming of a collective — I develop images, spaces and practices of alternative futures, built around love, care and belonging.',
          intro: {
            heading: 'Heartfelt Futures Studio',
            body: 'This is where images, spaces and workshops emerge — bridging foresight with embodiment and artistic practice. Where other futures research ends in reports, my work begins: with the question of how a future would feel in which we live well.',
          },
          offers: [
            {
              title: 'Speculative Design Studio',
              body: 'Images, objects, texts and spaces that make alternative futures visible. Commissions available for organisations, foundations and institutions.',
              link: { href: '#kontakt', label: '→ Enquire' },
            },
            {
              title: 'Visioning Workshops',
              body: 'Futures are not designed at the whiteboard here — but with body, material and imagination. Where foresight meets speculative design.',
              link: { href: '#kontakt', label: '→ Request a workshop' },
            },
            {
              title: 'Heartfelt Futures Collective',
              body: 'A collective of people who want to work at the intersection of foresight, care and design.',
              link: { href: '#kontakt', label: '→ Enquire' },
            },
          ],
        },
      ],
    },
    about: {
      kicker: 'ABOUT',
      statement: 'I am Lia Meissner.',
      subline:
        'For more than ten years I have worked at the intersection of futures research, psychology and artistic practice.',
      paragraphsHtml: [
        'I studied psychology and sociology, later Philosophy, Politics &amp; Economics. Since 2018 I have been writing foresight studies for the public sector — at Fraunhofer-Institut für System- und Innovationsforschung, at VDI/VDE Innovation + Technik for the German Bundestag\'s Office of Technology Assessment.',
        'Much of what I know about anticipation, teamwork and deciding under uncertainty I learned on the open sea — most recently on my 2025 Atlantic crossing under sail.',
        'Alongside this I completed training as a systemic counsellor and therapist and founded <em>Life Repair Kit</em> — a practice for people moving through crisis and transformation.',
        'Today I\'m building <em>Heartfelt Futures</em>: a practice that bridges scientific foresight with systemic clarity, embodied knowledge and aesthetics. I teach foresight at Freie Universität Berlin, advise organisations and give talks.',
      ],
      imageAlt: 'Portrait of Lia Meissner in the studio',
    },
    aktuell: {
      kicker: 'UPDATES',
      headline: "What's happening.",
      carouselLabel: 'Updates carousel',
      prevLabel: 'Previous',
      nextLabel: 'Next',
      cards: [
        {
          kategorie: 'Podcast',
          titel: 'Jeden Sommer 45 Grad? Was dann?',
          untertitel: 'Interview on the tagesschau futures podcast „Mal angenommen…"',
          datum: '29 July 2024',
          cta: '→ Listen now',
          href: 'https://www.tagesschau.de/multimedia/audio/podcast-mal-angenommen-hitzewellen-100.html',
        },
        {
          kategorie: 'New Study',
          titel: 'People Analytics in der öffentlichen Verwaltung',
          untertitel: 'Study for the German Bundestag\'s Office of Technology Assessment (TAB)',
          datum: '28 April 2026',
          cta: '→ Read',
          href: 'https://www.tab-beim-bundestag.de/projekte_nutzung-von-technologien-zur-auswertung-von-beschaeftigtendaten-in-der-oeffentlichen-verwaltung.php',
        },
        {
          kategorie: 'Podcast',
          titel: 'Wie umgehen mit Zukunftsangst?',
          untertitel: 'Interview on the WIE WEITER podcast',
          datum: '12 May 2026',
          cta: '→ Learn more',
          href: 'https://www.podcast.de/podcast/3473321/wie-weiter-loesungen-fuer-eine-gute-zukunft',
        },
        {
          kategorie: 'Teaching',
          titel: 'Einführung in die Strategische Vorausschau',
          untertitel: 'Online course at Freie Universität Berlin',
          datum: '18 May 2026',
          cta: '→ Learn more',
          href: 'https://veranstaltung.weiterbildung.fu-berlin.de/Veranstaltung/cmx6890b44771615.html',
        },
        {
          kategorie: 'Teaching',
          titel: 'Vertiefungsworkshop Szenarioentwicklung',
          untertitel: 'In-person workshop at Freie Universität Berlin',
          datum: '07 Dec 2026',
          cta: '→ Learn more',
          href: 'https://veranstaltung.weiterbildung.fu-berlin.de/Veranstaltung/cmx6890b537c15c4.html',
        },
      ],
    },
    kontakt: {
      kicker: 'CONTACT',
      headline: 'Say Hello',
      intro:
        'Write me if you\'d like to work with me — as an organisation, as an individual, or as part of what Heartfelt Futures is becoming.',
      labels: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        org: 'Organisation',
        anliegen: 'Topic',
        message: 'Message',
      },
      placeholders: {
        name: 'First and last name',
        email: 'name@example.com',
        phone: 'optional',
        org: 'optional',
        message: "What's it about? Tell me briefly what you have in mind.",
      },
      anliegen: [
        'Foresight Study',
        'Teaching',
        'Keynote',
        'Workshop',
        '1:1 Coaching',
        'Press / Media',
        'Other',
      ],
      note: '* Required fields · Data per GDPR',
      submit: 'Send message →',
      web3FormsSubject: 'New message via liameissner.me',
      web3FormsFromName: 'liameissner.me contact form',
      anliegenAria: 'Topic',
    },
    footer: {
      socialLabel: 'Social media',
      legalAria: 'Legal',
      legal: [
        { href: '/impressum/', label: 'Imprint' },
        { href: '/datenschutz/', label: 'Privacy' },
      ],
    },
  },
};

export function t(lang: Lang): Translations {
  return translations[lang];
}
