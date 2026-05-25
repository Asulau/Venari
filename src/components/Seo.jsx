import { useEffect } from "react";

const SITE = "https://vitality.training";
const OG_IMAGE = SITE + "/og-image.png";

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute("content", content);
}
function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) { el = document.createElement("link"); el.setAttribute("rel", rel); document.head.appendChild(el); }
  el.setAttribute("href", href);
}

export default function Seo({ title, description, path = "/", jsonLd }) {
  useEffect(() => {
    const url = SITE + path;
    document.title = title;
    upsertMeta("name", "description", description);
    upsertLink("canonical", url);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", OG_IMAGE);
    upsertMeta("property", "og:image:width", "1200");
    upsertMeta("property", "og:image:height", "630");
    upsertMeta("property", "og:image:alt", "Vitality - remote coaching");
    upsertMeta("property", "og:site_name", "Vitality");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", OG_IMAGE);
    if (jsonLd) {
      let s = document.getElementById("ld-json");
      if (!s) { s = document.createElement("script"); s.id = "ld-json"; s.type = "application/ld+json"; document.head.appendChild(s); }
      s.textContent = JSON.stringify(jsonLd);
    }
  }, [title, description, path, jsonLd]);
  return null;
}
