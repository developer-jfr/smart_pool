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
import { Field, Form, Formik } from "formik";
import QrCode from "./qr-code";

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type IProps = {
  setPhantom: Dispatch<SetStateAction<boolean>>;
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

const PhantomPayment: FC<IProps> = ({ setPhantom }) => {
  const [ isPaid, setIsPaid ] = useState<boolean>(false);
  const [formData, setFormData] = useState<IForm>({
    address: "",
    amount: 0,
  });
  
  // State to hold API response fields
  const submit = async (
    values: IForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setFormData(values);
    setIsPaid(true);
    setSubmitting(false);
  };
  return (
    <div>
      {!isPaid ? (
        <>
         <div className="is-flex is-justify-content-space-around py-2">
        <div className="is-clickable" onClick={() => setPhantom(false)}>
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
      ) : (
        <QrCode setPhantom={setPhantom} address={formData.address} amountFr={formData.amount} />
      )}
    </div>
  );
};

export default PhantomPayment;
