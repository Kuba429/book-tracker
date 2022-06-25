import "../global.scss";
import type { AppProps } from "next/app";
import ContextWrapper from "../components/ContextWrapper";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ContextWrapper>
            <Component {...pageProps} />
        </ContextWrapper>
    );
}

export default MyApp;
