import Head from "next/head";

function AppHead() {
  return (
    <Head>
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      <meta name="apple-mobile-web-app-status-bar" content="white" />
      <meta name="theme-color" content="white" />
      <meta httpEquiv="content-language" content="hu" />
      <title>Memnote - Jegyzetek üzemmérnök-informatikusoknak</title>
      <meta
        name="title"
        content="Memnote - Jegyzetek üzemmérnök-informatikusoknak"
      />
      <meta
        name="description"
        content="Bárki által szerkeszthető, bővíthető, hasznos jegyzetek és segédletek üzemmérnök-informatikusoknak."
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://memnote.net/" />
      <meta
        property="og:title"
        content="Memnote - Jegyzetek üzemmérnök-informatikusoknak"
      />
      <meta
        property="og:description"
        content="Bárki által szerkeszthető, bővíthető, hasznos jegyzetek és segédletek üzemmérnök-informatikusoknak."
      />
      <meta name="og:image" content="/og-image.png" />
      <meta property="og:image:width" content="200" />
      <meta property="og:image:height" content="200" />

      <meta property="twitter:url" content="https://memnote.net/" />
      <meta
        property="twitter:title"
        content="Memnote - Jegyzetek üzemmérnök-informatikusoknak"
      />
      <meta
        property="twitter:description"
        content="Bárki által szerkeszthető, bővíthető, hasznos jegyzetek és segédletek üzemmérnök-informatikusoknak."
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content="/og-image.png" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default AppHead;
