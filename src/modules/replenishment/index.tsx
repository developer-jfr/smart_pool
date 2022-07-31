import GrButton from "components/buttons/gr-button";
import NavBar from "components/nav-bar";
import styles from "./index.module.scss";
//Images
import procent1 from "assets/1-procent.svg";
import solana from "assets/solana.svg";
import { useState } from "react";
import PaymentModal from "./components/modal";

const Replenishment = () => {
  const [payment, setPayment] = useState<boolean>(false);
  return (
    <div className={styles.rep_wrapp}>
      <NavBar />
      <PaymentModal payment={payment} setPayment={setPayment} />
      <div>
        <div>
          <div className={styles.fr_section}>
            <h2>Объем SOL SMART POOL</h2>
            <h2>BUSD 1 234 567 89</h2>
          </div>
          <div className="is-flex is-justify-content-center">
            <div onClick={() => setPayment(true)}>
              <GrButton text="Пополнить" />
            </div>
          </div>
        </div>
        <div
          className="is-flex is-justify-content-space-between is-align-items-center pt-6"
          style={{ paddingInline: "6%" }}
        >
          <div className={styles.rep_income}>
            <div>
              <img src={procent1} alt="procent1" />
            </div>
            <div className={styles.rep_income_text}>
              <h2>
                Доходность
                <br /> в день
                <br /> до 200 дней
              </h2>
              <p>
                (Без учета партнерской программы)
                <br /> Реферальная программа 7/3/2/1/1/0,5/0,5
              </p>
            </div>
          </div>
          <img src={solana} alt="solana" />
        </div>
      </div>
    </div>
  );
};

export default Replenishment;
