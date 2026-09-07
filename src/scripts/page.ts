import { parseLatestEpisode } from "./feed";

const themeSwitch = document.querySelector<HTMLElement>(".theme-switch");
const themeButtons = document.querySelectorAll<HTMLButtonElement>("[data-theme-choice]");
function setTheme(preference: string) {
  if (preference === "light" || preference === "dark") document.documentElement.dataset.theme = preference;
  else delete document.documentElement.dataset.theme;
  themeButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.themeChoice === preference)));
}
setTheme(document.documentElement.dataset.theme || "system");
if (themeSwitch) themeSwitch.hidden = false;
themeButtons.forEach((button) => button.addEventListener("click", () => {
  const preference = button.dataset.themeChoice || "system";
  setTheme(preference);
  try { localStorage.setItem("lzk-theme", preference); } catch { /* Preference still works for this visit. */ }
}));
window.addEventListener("storage", (event) => {
  if (event.key === "lzk-theme" || event.key === null) setTheme(event.newValue === "light" || event.newValue === "dark" ? event.newValue : "system");
});

const rssCopy = document.querySelector<HTMLButtonElement>("[data-rss-copy]");
const copyStatus = document.querySelector<HTMLElement>("[data-copy-status]");
let copyReset: number;
async function copyText(value: string) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch { /* Try the selection-based fallback below. */ }
  }
  const input = document.createElement("textarea");
  input.value = value;
  input.readOnly = true;
  input.className = "sr-only";
  document.body.append(input);
  input.select();
  try {
    if (!document.execCommand("copy")) throw new Error("Clipboard unavailable");
  } finally {
    input.remove();
    rssCopy?.focus({ preventScroll: true });
  }
}
if (rssCopy) {
  rssCopy.hidden = false;
  rssCopy.addEventListener("click", async () => {
    clearTimeout(copyReset);
    try {
      await copyText(rssCopy.dataset.rssUrl || "");
      rssCopy.dataset.tooltip = "RSS odkaz zkopírován";
      rssCopy.dataset.copied = "true";
      if (copyStatus) copyStatus.textContent = "RSS odkaz zkopírován";
    } catch {
      rssCopy.dataset.tooltip = "RSS odkaz se nepodařilo zkopírovat";
      delete rssCopy.dataset.copied;
      if (copyStatus) copyStatus.textContent = "RSS odkaz se nepodařilo zkopírovat";
    }
    rssCopy.dataset.feedback = "true";
    copyReset = window.setTimeout(() => {
      rssCopy.dataset.tooltip = "Zkopírovat RSS odkaz";
      delete rssCopy.dataset.copied;
      delete rssCopy.dataset.feedback;
      if (copyStatus) copyStatus.textContent = "";
    }, 3500);
  });
}

const card = document.querySelector<HTMLElement>("[data-episode-card]");
const status = document.querySelector<HTMLElement>("[data-feed-status]");
const retry = document.querySelector<HTMLButtonElement>("[data-feed-retry]");
const latestAudio = document.querySelector<HTMLAudioElement>("[data-latest-audio]");
const introAudio = document.querySelector<HTMLAudioElement>("[data-intro-audio]");

async function loadLatestEpisode() {
  if (!card || !status || !retry || !latestAudio) return;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 10000);
  status.textContent = "Načítám nejnovější epizodu…";
  retry.hidden = true;
  card.setAttribute("aria-busy", "true");
  try {
    // Revalidate on every visit, including returning listeners with a cached feed.
    const response = await fetch(card.dataset.feedUrl!, { signal: controller.signal, credentials: "omit", cache: "no-cache" });
    if (!response.ok) throw new Error(`RSS: ${response.status}`);
    const episode = parseLatestEpisode(await response.text());
    card.querySelector<HTMLElement>("[data-episode-title]")!.textContent = episode.title;
    card.querySelector<HTMLElement>("[data-episode-description]")!.textContent = episode.description;
    card.querySelector<HTMLElement>("[data-episode-meta]")!.textContent = episode.metadata;
    const artwork = card.querySelector<HTMLImageElement>("[data-episode-art]")!;
    if (episode.image) {
      const fallback = artwork.src;
      artwork.addEventListener("error", () => { artwork.src = fallback; }, { once: true });
      artwork.src = episode.image;
    }
    const link = card.querySelector<HTMLAnchorElement>("[data-episode-link]")!;
    if (episode.link) {
      link.href = episode.link;
      // RSS gives a publisher page, not necessarily an open.spotify.com episode.
      link.firstChild!.textContent = "Detail epizody na Spotify ";
    }
    latestAudio.src = episode.audio;
    latestAudio.setAttribute("aria-label", `Přehrát: ${episode.title}`);
    card.querySelector<HTMLElement>("[data-episode-player]")!.hidden = false;
    status.textContent = "";
  } catch {
    status.textContent = "Epizodu se nepodařilo načíst. Poslechni si ji na své oblíbené platformě.";
    retry.hidden = false;
  } finally {
    clearTimeout(timeout);
    card.setAttribute("aria-busy", "false");
  }
}
retry?.addEventListener("click", loadLatestEpisode);
void loadLatestEpisode();

// The two native players share the page; only one should speak at a time.
latestAudio?.addEventListener("play", () => introAudio?.pause());
introAudio?.addEventListener("play", () => latestAudio?.pause());
latestAudio?.addEventListener("error", () => {
  if (status) status.textContent = "Zvuk se nepodařilo přehrát. Zkus to znovu nebo přejdi na svou oblíbenou platformu.";
  if (retry) retry.hidden = false;
});
document.querySelector(".intro-player")?.addEventListener("toggle", (event) => {
  if (!(event.currentTarget as HTMLDetailsElement).open) introAudio?.pause();
});
