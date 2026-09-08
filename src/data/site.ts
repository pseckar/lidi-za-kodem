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
    lead:
      "Kuchyňkový pokec vývojářů a dalších lidí z oboru vývoje software.",
    body:
      "Podcast je okénkem do života lidí z oboru vývoje software plného zběsilých sprintů, dohadování s AI agenty a dalších všedních příběhů. Každá epizoda přinese unikátní neformální rozhovor s novým hostem, v němž rozebereme témata technická i netechnická, budeme přemýtat o budoucnosti vývoje s AI, nebo se bavit o učení se nových věcí, well-being a smysluplné práci. Bude zkrátka vidět, že ZA KÓDEM ještě stále stojí LIDÉ. Věřím, že uslyšíš věci, které tě budou inspirovat, nebo se alespoň dobře pobavíš. Nová epizoda vychází vždy každý druhý pátek. Tak neváhej a poslouchej!"
  },

  author: {
    name: "Petr Sečkář - vývojář software a leader",
    photo: authorPhoto,
    bio: " Když jsem se před 10 lety začínal živit tvorbou software, začínal jsem jako junior .NET vývojář. Od té doby jsem se malými krůčky stal senior vývojářem a team leaderem. Získal jsem zkušenosti s vedením projektů, lidí i týmů, ale třeba také s koučingem a mentoringem. Rád mluvím s lidmi o tom, co je na práci baví, s čím se potýkají, jak se učí nové věci a obecně co jim v práci či osobním životě dává smysl. Tyto diskuze mě inspirují a posouvají, a proto jsem se rozhodl je zachycovat formou podcastu, aby mohly být přínosné i ostatním.",
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
