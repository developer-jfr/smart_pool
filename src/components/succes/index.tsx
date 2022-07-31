import { useAppDispatch } from "hooks/redux";
import { FC, useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { transactionSlice } from "redux/transaction/reducer";
import styles from "./index.module.scss";

//Network
const network = 'devnet';

type IProps = {
  txId: string;
};

const SuccesTransaction:FC<IProps> = ({txId}) => {
  const dispatch = useAppDispatch();
  const { setSignature, setIsPaid } = transactionSlice.actions;
  const [percentage, setPercentage] = useState(0);
  const [text, setText] = useState("🍪");

  useEffect(() => {
    const t1 = setTimeout(() => setPercentage(100), 100);
    const t2 = setTimeout(() => setText("✅"), 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const backToPayment = () => {
    dispatch(setSignature(''));
    dispatch(setIsPaid(false));
  }

  return (
    <div className="is-flex is-flex-direction-column is-align-items-center" style={{gap :'40px'}} >
      <span onClick={() => backToPayment()} className="has-text-centered has-text-white">назад</span>
      <h1 className="has-text-white is-size-5">Успешно отправлено</h1>
      <div className="py-6" style={{width: '50%'}}>
      <CircularProgressbar
        value={percentage}
        text={text}
        styles={buildStyles({
          pathColor: "#00BA00",
        })}
      />
      </div>
      <a href={`https://solscan.io/tx/${txId}?cluster=${network}`} target="_blank" >
        Показать транкзакцию
      </a>
    </div>
  );
};

export default SuccesTransaction;
