import styles from './screen.module.scss';
import { ReactComponent as LogoSimple } from '../../assets/logo-simple.svg'
import Button from '../Button'

const Screen8 = () => {

  return (
    <div className={styles.screen} style={{top: `1150vh`, height: '75vh', flexDirection: "column"}}>
      <div className={styles.center}>
        <LogoSimple className={styles.logoSimple} />
        <h2>Whitepaper</h2>
        <div className={styles.buttonWrapper}>
          <Button url="https://docs.power2.finance/whitepaper/" />
        </div>
      </div>
      <div className={styles.footer}>
        <a href='https://twitter.com/Power2___' target="_blank" rel="noreferrer" className={styles.link}>Twitter</a>
        <a href='https://power2.medium.com/' target="_blank" rel="noreferrer" className={styles.link}>Medium</a>
        <a href='https://google.com' target="_blank" rel="noreferrer" className={styles.link}>Telegram</a>
        <a href='https://google.com' target="_blank" rel="noreferrer" className={styles.link}>Discord</a>
      </div>
    </div>
  )
};

export default Screen8;
