import "global.scss";
import type { AppProps } from "next/app";
import ContextWrapper from "components/Layout/ContextWrapper";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { QueryClient, QueryClientProvider } from "react-query";
config.autoAddCss = false;

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ContextWrapper>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
			</QueryClientProvider>
		</ContextWrapper>
	);
}

export default MyApp;
