import "src/styles/globals.css";

import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

const MyApp = (props: AppProps) => {
  const [state] = useState();

  useEffect(() => {
    if (state) return;
  }, [state]);

  return <props.Component {...props.pageProps} />;
};

export default MyApp;
