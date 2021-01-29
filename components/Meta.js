import Head from "next/head";

function Meta({
  children,
  title = "Memnote - Jegyzetek üzemmérnök-informatikusoknak",
  description = "Bárki által szerkeszthető, bővíthető, hasznos jegyzetek és segédletek üzemmérnök-informatikusoknak.",
  keywords = "memnote, üzemmérnök, jegyzet, üzemmérnök jegyzet, üzemmérnök informatikus, üzemmérnök informatikus jegyzetek",
}) {
  return (
    <Head>
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      <meta name="apple-mobile-web-app-status-bar" content="white" />
      <meta name="theme-color" content="white" />
      <meta httpEquiv="content-language" content="hu" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://memnote.net/" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="og:image" content="/og-image.png" />
      <meta property="og:image:width" content="200" />
      <meta property="og:image:height" content="200" />

      <meta property="twitter:url" content="https://memnote.net/" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content="/og-image.png" />

      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="icon" href="/favicon.ico" />
      {children}
    </Head>
  );
}

export default Meta;
