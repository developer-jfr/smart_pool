import { FC } from 'react';
import styles from './index.module.scss';

type IProps = {
  text?: string
}

const GrButton:FC<IProps> = ({text = 'Вступай в игру'}) => {
  return <button className={styles.gr_btn}>{text}</button>;
};

export default GrButton;
