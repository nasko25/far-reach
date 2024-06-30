import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { WagmiProvider, createConfig, http } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const root = document.getElementById("root");
if (!root) throw new Error("#root element not found for booting react app");

const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [
    coinbaseWallet({
      appChainIds: [baseSepolia.id],
      appName: 'Far Reach',
      appLogoUrl: 'https://i.imgur.com/oFYutrJ.png',
    }),
  ],
  ssr: true,
  transports: {
    [baseSepolia.id]: http('https://api.developer.coinbase.com/rpc/v1/base-sepolia/CfwmCRWRT9tWRWXhUvXoDVaqUUUaqaSj'),
  },
});

const queryClient = new QueryClient()

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AppProvider i18n={enTranslations}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </WagmiProvider>
    </AppProvider>
  </React.StrictMode>
);
