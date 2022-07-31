import React from "react";
import ReactDOM from "react-dom/client";
import "styles/index.scss";
import MainModule from "./main";
import reportWebVitals from "./reportWebVitals";
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
const network = WalletAdapterNetwork.Devnet;

// You can also provide a custom RPC endpoint.
const endpoint = clusterApiUrl(network);

// @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
// Only the wallets you configure here will be compiled into your application, and only the dependencies
// of wallets that your users connect to will be loaded.
const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter({ network }),
];

root.render(
  <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <React.StrictMode>
          <MainModule />
        </React.StrictMode>
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
