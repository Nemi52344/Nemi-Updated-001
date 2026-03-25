import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import AppInner from "./AppInner";

export function render(url: string) {
  const helmetContext: { helmet?: any } = {};

  let html = "";
  try {
    html = renderToString(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <AppInner />
        </StaticRouter>
      </HelmetProvider>
    );
  } catch (err) {
    console.warn(`[prerender] Warning rendering ${url}:`, err);
    html = "";
  }

  return { html, helmet: helmetContext.helmet };
}
