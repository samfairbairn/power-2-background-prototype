import styles from './screen.module.scss';
// import {ReactComponent as RoadmapImage} from '../../assets/roadmap.svg'
// import RoadmapImage from '../../assets/roadmap.svg'
import { ReactComponent as LogoSimple } from '../../assets/logo-simple.svg'
import Button from '../Button'

const Screen8 = () => {

  return (
    <div className={styles.screen} style={{top: `925vh`, height: '75vh', flexDirection: "column", justifyContent: 'center'}}>
      <div className={styles.center}>
        {/* <img src={Logo} className={styles.logoSimple} alt="icon" /> */}
        <LogoSimple className={styles.logoSimple} />
        <h2 style={{marginBottom: 0}}>Whitepaper</h2>
        {/* <div className={styles.roadmapWrapper}>
          <img src={RoadmapImage} alt="roadmap" />
        </div> */}
        <Button />
      </div>
      <div className={styles.footer}>
        <a href='https://google.com' className={styles.link}>Twitter</a>
        <a href='https://google.com' className={styles.link}>Medium</a>
        <a href='https://google.com' className={styles.link}>Telegram</a>
        <a href='https://google.com' className={styles.link}>Discord</a>
      </div>
    </div>
  )
};

export default Screen8;
