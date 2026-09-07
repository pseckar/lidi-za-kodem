const ITUNES = "http://www.itunes.com/dtds/podcast-1.0.dtd";

export function safeUrl(value: string | null | undefined): string {
  try {
    const url = new URL(value || "");
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

function plainText(html: string): string {
  // Parse in an inert document. Feed markup is never inserted into the page.
  const document = new DOMParser().parseFromString(html, "text/html");
  document.querySelectorAll("script, style, iframe, object").forEach((node) => node.remove());
  return (document.body.textContent || "").replace(/\s+/g, " ").trim();
}

function durationLabel(value: string): string {
  if (!/^\d+(?::\d{1,2}){0,2}$/.test(value)) return "";
  const seconds = value.split(":").reduce((total, part) => total * 60 + Number(part), 0);
  return seconds > 0 ? `${Math.ceil(seconds / 60)} min` : "";
}

export function parseLatestEpisode(xml: string, now = Date.now()) {
  const document = new DOMParser().parseFromString(xml, "application/xml");
  if (document.querySelector("parsererror")) throw new Error("Invalid RSS");
  const entries = Array.from(document.querySelectorAll("channel > item"))
    .map((item) => {
      const get = (name: string) => item.querySelector(name)?.textContent?.trim() || "";
      const itunes = (name: string) => item.getElementsByTagNameNS(ITUNES, name)[0]?.textContent?.trim() || "";
      const enclosure = item.querySelector("enclosure");
      const audio = safeUrl(enclosure?.getAttribute("url"));
      const type = enclosure?.getAttribute("type") || "";
      const published = Date.parse(get("pubDate"));
      return { item, get, itunes, audio, type, published };
    })
    .filter(({ audio, type, published }) => audio && (!type || type.startsWith("audio/")) && (!Number.isFinite(published) || published <= now))
    .sort((a, b) => (Number.isFinite(b.published) ? b.published : 0) - (Number.isFinite(a.published) ? a.published : 0));
  // Prefer a full conversation; keep trailers as a fallback for a new podcast.
  const entry = entries.find(({ itunes }) => itunes("episodeType") !== "trailer") || entries[0];
  if (!entry) throw new Error("No playable episodes");
  const { item, get, itunes, audio, published } = entry;
  const title = get("title");
  if (!title) throw new Error("Missing episode title");
  const description = plainText(get("description") || itunes("summary"));
  const excerpt = description.length > 250 ? `${description.slice(0, 250).replace(/\s+\S*$/, "")}…` : description;
  const episodeNumber = itunes("episode") || title.match(/^#(\d+)/)?.[1];
  const metadata = [
    episodeNumber ? `Epizoda ${episodeNumber}` : "",
    Number.isFinite(published) ? new Intl.DateTimeFormat("cs-CZ", { day: "numeric", month: "numeric", year: "numeric", timeZone: "Europe/Prague" }).format(published) : "",
    durationLabel(itunes("duration"))
  ].filter(Boolean).join(" · ");
  return {
    title: title.replace(/^#\d+\s*[:–-]\s*/, ""),
    description: excerpt,
    metadata,
    audio,
    link: safeUrl(get("link")),
    image: safeUrl(item.getElementsByTagNameNS(ITUNES, "image")[0]?.getAttribute("href"))
  };
}
