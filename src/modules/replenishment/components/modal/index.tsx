import { Dispatch, FC, SetStateAction } from "react";
import {
    useWallet
  } from "@solana/wallet-adapter-react";
  import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import styles from "./index.module.scss";
//Icon
import hix from 'assets/icons/hix.svg';
import ConnectWallet from "../payment/connect-wallet";
import Transaction from "../payment/transaction";


type IProps = {
    payment: boolean
    setPayment: Dispatch<SetStateAction<boolean>>
}

const PaymentModal:FC<IProps> = ({payment ,setPayment}) => {
    const wallet = useWallet();
  return (
    <div className={`modal ${payment && 'is-active'}`}>
      <div className={`modal-background ${styles.modal_background}`}></div>
      <div className={`modal-card ${styles.modal_card}`}>
        <div className={styles.modal_header}>
            <div>
                <img className="is-clickable" onClick={() => setPayment(false)} src={hix} alt="hix" />
            </div>
        </div>
        <section className={`modal-card-body ${styles.modal_body}`}>
            { wallet.connected ? <Transaction  />  : <ConnectWallet /> }
        </section>
       
      </div>
    </div>
  );
};

export default PaymentModal;
