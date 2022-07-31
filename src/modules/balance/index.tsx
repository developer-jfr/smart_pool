import GrButton from "components/buttons/gr-button";
import NavBar from "components/nav-bar";
import styles from "./index.module.scss";
//Images
import logo from "assets/logo2.svg";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";

// connection
const connection = new Connection("https://api.devnet.solana.com");

const Balance = () => {
  const [ balance, setBalance ] = useState<number>(0);
  
  useEffect( () => {
    const getBalance = async () => {
      let balance = await connection.getBalance(new PublicKey('7JBbggL2i58DqVN4axkxJEZRNMwWjBTFgwoatzHKSkus'));
      setBalance(balance)
    };
    getBalance();
  }, [])

  return (
    <div className={styles.balance_wrapp}>
      <NavBar />
      <div>
        <div>
          <div className={styles.fr_section}>
            <h2>Объем SOL SMART POOL</h2>
            <h2>BUSD 1 234 567 89</h2>
          </div>
          <div>
            <div
              className="is-flex is-justify-content-center"
              style={{ gap: "80px" }}
            >
              <div className={styles.balance_fr_card}>
                <h2>
                  Мой
                  <br /> баланс
                </h2>
                <p>{balance / LAMPORTS_PER_SOL} <br /> SOL</p>
              </div>
              <div className={styles.balance_sc_card}>
                <h2>24:00</h2>
                <p>
                  до
                  <br /> следующего начисления
                </p>
              </div>
            </div>
            <div
              className="is-flex is-justify-content-center pt-6"
              style={{ gap: "100px" }}
            >
              <GrButton text="Снять" />
              <GrButton text="Реинвест" />
              <GrButton text="Пригласить" />
            </div>
          </div>
          <div>
            <div className={styles.statistics_title}>
              <h2>Моя статистика</h2>
              <div>
                <img src={logo} alt="logo" />
              </div>
            </div>
            <div className={styles.statistics_content}>
              <div>
                <div style={{ width: "fit-content" }}>
                  <div className={styles.statistics_text}>
                    <h2>Моя команда</h2>
                    <p>100 чел.</p>
                  </div>
                  <hr />
                </div>
                <div style={{ width: "fit-content", paddingTop: "30px" }}>
                  <div className={styles.statistics_text}>
                    <h2>Заработано</h2>
                    <p>000,00 sol</p>
                  </div>
                  <hr />
                </div>
              </div>
              <div className={styles.statistics_addres}>
                <h2>Адреса кошельков</h2>
                <div className="has-text-weight-bold has-text-black">
                  <p className="pt-4">1-----------------------------------</p>
                  <p>2-----------------------------------</p>
                  <p>3-----------------------------------</p>
                </div>
              </div>
            </div>
            <div className={styles.footer_title}>Адрес контракта</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
