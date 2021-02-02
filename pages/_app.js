import "../styles/globals.css";
import Menu from "../components/Menu";
import ScrollTop from "../components/ScrollTop";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Menu />
      <Component {...pageProps} />
      <ScrollTop />
    </>
  );
}

export default MyApp;
