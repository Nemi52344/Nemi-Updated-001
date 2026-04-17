import type { Metadata } from "next";
import Script from "next/script";

// /home is not a canonical URL. The real homepage lives at /.
// Static-export safe redirect: meta-refresh (works without JS) +
// JS replace fallback (faster when JS is enabled).
// `noindex` keeps Google from indexing this so "/" remains the
// single canonical URL for all ranking signals.

export const metadata: Metadata = {
  title: "Redirecting — NEMI AI",
  alternates: { canonical: "https://nemi-ai.com/" },
  robots: { index: false, follow: true },
};

export default function HomeRedirect() {
  return (
    <>
      {/* Meta refresh works even if JS is disabled */}
      <meta httpEquiv="refresh" content="0; url=/" />
      <Script id="home-redirect" strategy="beforeInteractive">
        {`window.location.replace('/');`}
      </Script>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "hsl(230 25% 4%)",
          color: "hsl(0 0% 95%)",
          fontFamily: "sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <p>
          Redirecting to{" "}
          <a href="/" style={{ color: "hsl(275 80% 65%)" }}>
            nemi-ai.com
          </a>
          &hellip;
        </p>
      </div>
    </>
  );
}
