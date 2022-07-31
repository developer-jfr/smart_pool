import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  createQR,
  encodeURL,
  TransferRequestURLFields,
  findReference,
  validateTransfer,
  FindReferenceError,
  ValidateTransferError,
} from "@solana/pay";
import BigNumber from "bignumber.js";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./index.module.scss";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import SuccesTransaction from "components/succes";

type IProps = {
  setPhantom: Dispatch<SetStateAction<boolean>>;
  address: string;
  amountFr: number;
};

// this is your shop wallet address
const shopAddress = new PublicKey(
  "7JBbggL2i58DqVN4axkxJEZRNMwWjBTFgwoatzHKSkus"
);
// this is the same for everyone!
const usdcAddress = new PublicKey(
  "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"
);

type IForm = {
  address: string;
  amount: number;
};

const QrCode: FC<IProps> = ({ setPhantom, address, amountFr }) => {
  const [signature, setSignature] = useState<string>("");
  const qrRef = useRef<HTMLDivElement>(null);

  // Unique address that we can listen for payments to
  const reference = useMemo(() => Keypair.generate().publicKey, []);
  // Get a connection to Solana devnet
  let amount = new BigNumber(amountFr);
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);
  const connection = new Connection(endpoint);
  const urlParams: TransferRequestURLFields = {
    recipient: new PublicKey(shopAddress),
    splToken: usdcAddress,
    amount,
    reference,
    label: "Cookies Inc",
    message: "Thanks for your order! 🍪",
  };

  // Encode the params into the format shown
  const url = encodeURL(urlParams);
  console.log({ url });

  // Show the QR code
  useEffect(() => {
    const qr = createQR(url, 512, "#fff");
    if (qrRef.current && amount.isGreaterThan(0)) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
    }
  });

  // Check every 0.5s if the transaction is completed
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Check if there is any transaction for the reference
        const signatureInfo = await findReference(connection, reference, {
          finality: "confirmed",
        });

        setSignature(signatureInfo.signature);

        await validateTransfer(
          connection,
          signatureInfo.signature,
          {
            recipient: shopAddress,
            amount,
            splToken: usdcAddress,
            reference,
          },
          { commitment: "confirmed" }
        );
      } catch (e) {
        if (e instanceof FindReferenceError) {
          // No transaction found yet, ignore this error
          return;
        }
        if (e instanceof ValidateTransferError) {
          // Transaction is invalid
          console.error("Transaction is invalid", e);
          return;
        }
        console.error("Unknown error", e);
      }
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [amount]);

  return (
    <div>
      {signature === "" ? (
        <>
          <div className="is-flex is-justify-content-space-around py-2">
            <div className="is-clickable" onClick={() => setPhantom(false)}>
              back
            </div>
            <WalletMultiButton />
          </div>

          <div className="is-flex is-justify-content-center pt-6" ref={qrRef} />
        </>
      ) : (
        <SuccesTransaction txId={signature} />
      )}
    </div>
  );
};

export default QrCode;
