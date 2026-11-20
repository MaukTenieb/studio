// Cloudflare Worker: relays Freesound search and previews for the studio.
// The Freesound API key lives in the worker secret FREESOUND_KEY.
// Deploy: wrangler deploy, then wrangler secret put FREESOUND_KEY.

const ALLOWED_ORIGIN = "https://mauktenieb.github.io";

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const cors = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "GET",
      "Vary": "Origin",
    };
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });

    if (url.pathname === "/search") {
      const q = new URLSearchParams(url.search);
      q.set("token", env.FREESOUND_KEY);
      q.set("filter", 'license:("Creative Commons 0" OR "Attribution")');
      const r = await fetch("https://freesound.org/apiv2/search/text/?" + q, {
        cf: { cacheTtl: 3600, cacheEverything: true },
      });
      return new Response(r.body, {
        status: r.status,
        headers: { ...cors, "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" },
      });
    }

    if (url.pathname === "/preview") {
      const u = url.searchParams.get("u") || "";
      if (!/^https:\/\/cdn\.freesound\.org\/previews\//.test(u)) return new Response("bad url", { status: 400, headers: cors });
      const r = await fetch(u, { cf: { cacheTtl: 86400, cacheEverything: true } });
      return new Response(r.body, {
        status: r.status,
        headers: { ...cors, "Content-Type": "audio/mpeg", "Cache-Control": "public, max-age=86400" },
      });
    }

    return new Response("studio relay", { headers: cors });
  },
};
