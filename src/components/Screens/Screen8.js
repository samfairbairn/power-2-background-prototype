import styles from './screen.module.scss';
import {ReactComponent as RoadmapImage} from '../../assets/roadmap.svg'
import { ReactComponent as LogoSimple } from '../../assets/logo-simple.svg'

const Screen8 = () => {

  return (
    <div className={styles.screen} style={{top: `950vh`, height: '200vh', flexDirection: "column", justifyContent: 'center'}}>
      <div className={styles.center}>
      <LogoSimple className={styles.logoSimple} />
        <h2>Roadmap</h2>
        <div className={styles.roadmapWrapper}>
          <RoadmapImage className={styles.roadmapImage} />
        </div>
      </div>
    </div>
  )
};

export default Screen8;
