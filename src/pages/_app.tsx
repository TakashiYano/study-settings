import "src/styles/globals.css";

import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [state] = useState();

  useEffect(() => {
    if (state) return;
  }, [state]);

  return <Component {...pageProps} />;
};

export default MyApp;
