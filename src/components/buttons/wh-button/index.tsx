import { FC } from 'react';
import styles from './index.module.scss';

type IProps = {
  text?: string
  isSmall?: boolean
  isBorder? :boolean
}

const WhButton:FC<IProps> = ({text = 'русский', isSmall, isBorder}) => {
  return (
    <button className={`${styles.btn} ${isSmall && styles.small_text} ${isBorder && styles.border_none}`}>{text}</button>
  )
}

export default WhButton