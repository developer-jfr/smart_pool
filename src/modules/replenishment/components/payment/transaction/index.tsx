import styles from "./index.module.scss";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import TransactionPayment from "./../transaction-payment";
import { useEffect, useState } from "react";
import PhantomPayment from "../phantom-payment";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAppDispatch } from "hooks/redux";
import { transactionSlice } from "redux/transaction/reducer";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import bs58 from "bs58";
//icons
import WebExtension from "assets/icons/extension.svg";
import Phantom from "assets/icons/phantom.svg";

type PhantomEvent = "disconnect" | "connect" | "accountChanged";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

export interface PhantomProvider {
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, callback: (args: any) => void) => void;
  isPhantom: boolean;
  publicKey: PublicKey;
  signTransaction: (t: Transaction) => {};
}

type WindowWithSolana = Window & {
  solana?: PhantomProvider;
};

const TransactionModule = () => {
  const [extension, setExtension] = useState<boolean>(false);
  const [phantom, setPhantom] = useState<boolean>(false);
  const [provider, setProvider] = useState<PhantomProvider | null>(null);
  const dispatch = useAppDispatch();
  const { setPublickKey } = transactionSlice.actions;
  const { connected, publicKey } = useWallet();

  useEffect(() => {
    if ("solana" in window) {
      const solWindow = window as WindowWithSolana;
      if (solWindow?.solana?.isPhantom) {
        setProvider(solWindow.solana);
        // Attemp an eager connection
        solWindow.solana.connect({ onlyIfTrusted: true });
      }
    }
  }, []);

  useEffect(() => {
    provider?.on("connect", (publicKey: PublicKey) => {
      console.log(`connect event: ${publicKey}`);
      dispatch(setPublickKey(publicKey.toBase58()));
    });
  }, [provider]);

  return (
    <>
      {extension ? (
        <TransactionPayment setExtension={setExtension} />
      ) : phantom ? (
        <PhantomPayment setPhantom={setPhantom} />
      ) : (
        <div>
          <h1 className="has-text-centered has-text-white is-size-4">
            Choose payment
          </h1>
          <div className="is-flex is-justify-content-center py-2">
            <WalletMultiButton />
          </div>
          <div className="is-flex is-flex-direction-column is-align-items-center py-5">
            <div
              onClick={() => setExtension(true)}
              className={`box ${styles.transaction_box}`}
            >
              <img src={WebExtension} alt="WebExtension" />
              Web Extension
            </div>
            <div
              onClick={() => setPhantom(true)}
              className={`box ${styles.transaction_box} ${styles.phantom}`}
            >
              <img src={Phantom} alt="Phantom" />
              Phantom Mobile
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionModule;
