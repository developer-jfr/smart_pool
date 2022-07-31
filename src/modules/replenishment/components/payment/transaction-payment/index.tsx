import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Field, Form, Formik } from "formik";
import {
  Dispatch,
  FC,
  SetStateAction,
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import styles from "./index.module.scss";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  RpcResponseAndContext,
  SignatureResultCallback,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import BigNumber from "bignumber.js";
import { findReference, FindReferenceError } from "@solana/pay";
import { transactionSlice } from "redux/transaction/reducer";
import SuccesTransaction from "components/succes";
const network = "devnet";
const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type IForm = {
  address: string;
  amount: number;
};

type IProps = {
  setExtension: Dispatch<SetStateAction<boolean>>;
};

const TransactionPayment: FC<IProps> = ({ setExtension }) => {
  const { signTransaction } = useWallet();
  const dispatch = useAppDispatch();
  const { isPaid, signature } = useAppSelector(
    (state) => state.transactionReducer
  );
  const { setSignature, setIsPaid } = transactionSlice.actions;
  const connectionForm = useRef(new Connection(clusterApiUrl(network)));
  const owner = useAppSelector((state) => state.transactionReducer.publicKey);
  // Generate the unique reference which will be used for this transaction
  const reference = useMemo(() => Keypair.generate().publicKey, []);

  // State to hold API response fields
  const submit = async (
    values: IForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log(values);
    let transaction = new Transaction({
      feePayer: new PublicKey(owner),
      recentBlockhash: (await connectionForm.current.getRecentBlockhash())
        .blockhash,
    });
    let lamports = new BigNumber(values.amount);

    // Add instructions to the tx
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(owner),
        toPubkey: new PublicKey(values.address),
        lamports: lamports.multipliedBy(LAMPORTS_PER_SOL).toNumber(),
      })
    );

    // Get the TX signed by the wallet (signature stored in-situ)

    //@ts-ignore
    await signTransaction(transaction).then((res) =>
      console.log(JSON.stringify(res, null, 2) + "signature")
    );

    // Send the TX to the network
    connectionForm.current
      .sendRawTransaction(transaction.serialize())
      .then((id) => {
        console.log(`Transaction ID: ${id}`);
        dispatch(setSignature(id));
        dispatch(setIsPaid(true));
      })
      .catch(console.error);
    setSubmitting(false);
  };

  return (
    <div>
      {isPaid ? (
        <SuccesTransaction txId={signature} />
      ) : (
        <>
          <div className="is-flex is-justify-content-space-around py-2">
            <div className="is-clickable" onClick={() => setExtension(false)}>
              back
            </div>
            <WalletMultiButton />
          </div>
          <Formik
            enableReinitialize
            initialValues={{ address: "", amount: 0 } as IForm}
            validate={usersSearchFormValidate}
            onSubmit={submit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="pt-5 px-5">
                  <div className="is-flex" style={{ gap: "10px" }}>
                    <Field
                      name="address"
                      className={`input is-primary ${styles.transaction_input}`}
                      type="text"
                      placeholder="Адрес"
                      autocomplete="off"
                    />
                    <Field
                      name="amount"
                      className={`input is-primary ${styles.transaction_input}`}
                      type="number"
                      placeholder="Количество"
                      autocomplete="off"
                    />
                  </div>
                  <div className="is-flex is-justify-content-center pt-5">
                    <button
                      className="button is-black"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Отправить
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

export default TransactionPayment;
