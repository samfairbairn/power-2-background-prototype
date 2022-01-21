import { useEffect, useRef } from 'react';
import ReactGA from 'react-ga';
import styles from './screen.module.scss';
import classNames from 'classnames';
import {ReactComponent as RoadmapImage} from '../../assets/roadmap.svg'
import { ReactComponent as LogoSimple } from '../../assets/logo-simple.svg'

const Screen8 = ({scrollPos}) => {
    
  const tracked = useRef(false);
  const screen = useRef()

  useEffect(() => {
    if (screen.current && screen.current.getBoundingClientRect().top / window.innerHeight < 0.5 && !tracked.current) {
      tracked.current = true
      ReactGA.event({
        category: "scroll",
        action: "screen10: Roadmap"
      });
    }
  }, [scrollPos])

  return (
    <div ref={screen} className={classNames([styles.screen, styles.fluid])} style={{flexDirection: "column", justifyContent: 'center'}}>
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
