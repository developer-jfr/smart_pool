import styles from "./index.module.scss";
//Image
import procentImg from "assets/1-procent.svg";
import GrButton from "components/buttons/gr-button";
import solana from "assets/solana-landing.svg";
import NavBar from "components/nav-bar";

const Landing = () => {
  return (
    <div className={styles.landing_wrapp}>
      <NavBar />
      <div className={styles.content_wrapp}>
        <div style={{width: '50%'}}>
          <div>
            <h1 className={styles.title}>
              Игра на технологии смарт-контракта по добыче Solana{" "}
            </h1>
            <p className={styles.subtitle}>
              Открыта для всех и доступна для всех
            </p>
          </div>
          <div className={styles.procent_sc}>
            <img  src={procentImg} alt="procentImg" />
            <div className="is-flex is-flex-direction-column is-justify-content-space-between">
              <h2 className={styles.procent_title}>получай в сутки</h2>
              <GrButton />
            </div>
          </div>
        </div>
        <img className={styles.landing_img}src={solana} alt="solana" />
      </div>
      <div className={styles.fr_section}>
        <h2>Объем SOL SMART POOL</h2>
        <h2>BUSD 1 234 567 89</h2>
      </div>
    </div>
  );
};

export default Landing;
