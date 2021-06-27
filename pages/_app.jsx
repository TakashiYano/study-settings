import { useState, useEffect } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [state] = useState();

  useEffect(() => {
    if (state) return;
  }, [state]);

  return <Component {...pageProps} />;
}

export default MyApp;
