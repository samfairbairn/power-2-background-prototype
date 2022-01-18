import styles from './screen.module.scss';
import classNames from 'classnames';
import {ReactComponent as RoadmapImage} from '../../assets/roadmap.svg'
import { ReactComponent as LogoSimple } from '../../assets/logo-simple.svg'

const Screen8 = () => {

  return (
    <div className={classNames([styles.screen, styles.fluid])} style={{flexDirection: "column", justifyContent: 'center'}}>
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
