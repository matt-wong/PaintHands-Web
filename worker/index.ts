// The server side of PaintHands, run by Cloudflare. Requests for the page's own
// files (HTML, scripts, styles) are answered by Cloudflare directly; everything
// else, like /api/search, comes here.
import { searchImages, type Env } from "./search";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // /api/search?q=red+apples, or /api/search alone for random images
    if (url.pathname === "/api/search") {
      const query = url.searchParams.get("q")?.trim() || undefined;
      return Response.json(await searchImages(env, query));
    }

    return new Response("Not found", { status: 404 });
  },
};
