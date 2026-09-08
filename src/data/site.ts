import authorPhoto from "../assets/author.jpg";

export const site = {
  name: "Lidi za kódem",
  title: "Lidi za kódem",
  claim: "Kuchyňkový pokec o práci, životě a tvorbě software",
  subtitle:
    "Neformální rozhovory s lidmi, kteří tvoří software, zkouší nové věci a chtějí mít z práce radost.",
  description:
    "Lidi za kódem je vývojářský pokec o práci, životě a tvorbě software. Neformální rozhovory s lidmi, kteří tvoří software.",
  canonicalUrl: "https://lidizakodem.cz/",
  locale: "cs_CZ",
  language: "cs",
  publishingNote: "Nová epizoda podcastu každý druhý pátek.",
  publishingHighlight: "každý druhý pátek.",
  email: "podcast@lidizakodem.cz",

  assets: {
    logo: "/logo.png",
    favicon: "/favicon.png",
    ogImage: "/og-image.png"
  },

  about: {
    body: [
      "Podcast je okénkem do života lidí z oboru vývoje softwaru – světa plného zběsilých sprintů, dohadování s AI agenty a dalších všedních i nevšedních příběhů.",
      "V každé epizodě si neformálně povídám s novým hostem. Probíráme technická i netechnická témata, přemýšlíme o budoucnosti vývoje s AI, bavíme se o učení nových věcí, well-beingu, smysluplné práci i o tom, co nám život v IT přináší.",
      "Zkrátka chci ukázat, že ZA KÓDEM stále stojí LIDÉ.",
      "Věřím, že tu uslyšíš něco, co tě inspiruje, přiměje k zamyšlení, nebo tě alespoň dobře pobaví.",
      "Nová epizoda vychází každý druhý pátek. Tak neváhej a poslouchej!"
    ]
  },

  author: {
    name: "Petr Sečkář - vývojář software a leader",
    photo: authorPhoto,
    bio: [
      "Když jsem se před deseti lety začal živit tvorbou softwaru, nastoupil jsem jako juniorní .NET vývojář. Od té doby jsem se postupně posunul přes seniorního vývojáře až k vedení týmu a získal zkušenosti s vedením projektů, lidí i týmů, ale také s mentoringem a koučinkem.",
      "Rád si s lidmi povídám o tom, co je na jejich práci baví, s čím se potýkají, jak se učí nové věci a co jim v práci i osobním životě dává smysl.",
      "Právě tyhle rozhovory mě často inspirují a posouvají dál. Proto jsem se rozhodl některé z nich zachytit formou podcastu, aby mohly být zajímavé a přínosné i pro ostatní."
    ],
    socialLinks: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/petr-seckar",
        icon: "/icons/linkedin.svg"
      }
    ]
  },

  listenLinks: [
    {
      label: "Spotify",
      href: "https://open.spotify.com/show/033hl8AldFgfoV8n9gDzLY?si=mQFNbuvPRfqQYWQh0mRa1A",
      icon: "/icons/spotify.png"
    },
    {
      label: "Apple Podcasts",
      href: "https://podcasts.apple.com/us/podcast/lidi-za-k%C3%B3dem/id1896795233",
      icon: "/icons/apple-podcasts.png"
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/playlist?list=PL_qDvnaxSesG-cD182dXI1Gyoz8s1gcxy",
      icon: "/icons/youtube.png"
    },
    {
      label: "YouTube Music",
      href: "https://music.youtube.com/playlist?list=PL_qDvnaxSesG-cD182dXI1Gyoz8s1gcxy&si=90e8uTre5_HTKE7I",
      icon: "/icons/youtube-music.png"
    },
    {
      label: "Seznam Podcasty",
      href: "https://podcasty.seznam.cz/podcast/lidi-za-kodem",
      icon: "/icons/seznam-podcasty.png"
    }
  ],

  rss: {
    label: "RSS",
    url: "https://anchor.fm/s/112a66f7c/podcast/rss",
    icon: "/icons/rss.png"
  },

  intro: {
    url: "https://podcasters.spotify.com/pod/show/lidizakodem/episodes/0-Intro-podcastu-Lidi-za-kdem-e3jo8c3",
    audioUrl: "https://anchor.fm/s/112a66f7c/podcast/play/120381251/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-4-22%2Ff745d661-99f9-af68-ed4a-9467e596b638.mp3"
  }
} as const;
