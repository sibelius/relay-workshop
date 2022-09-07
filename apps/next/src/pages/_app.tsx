import type { AppProps } from "next/app";
import React from "react";
import { ReactRelayContainer } from "../relay/ReactRelayContainer";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <ReactRelayContainer Component={Component} props={pageProps} />;
}
