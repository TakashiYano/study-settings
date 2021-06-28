import { useState, useEffect } from "react";
import { AppProps } from "next/app";
import "src/styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [state] = useState();

  useEffect(() => {
    if (state) return;
  }, [state]);

  return <Component {...pageProps} />;
};

export default MyApp;
