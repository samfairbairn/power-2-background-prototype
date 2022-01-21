import { useEffect, useRef } from 'react';
import ReactGA from 'react-ga';
import styles from './screen.module.scss';
import classNames from 'classnames';

const Screen5b = ({scrollPos, lightMode}) => {

  const tracked = useRef(false);
  const screen = useRef()

  useEffect(() => {
    if (screen.current && screen.current.getBoundingClientRect().top / window.innerHeight < 0.5 && !tracked.current) {
      tracked.current = true
      ReactGA.event({
        category: "scroll",
        action: "screen6: How To Play"
      });
    }
  }, [scrollPos])

  return (
    <div ref={screen} className={classNames([styles.screen, styles.column, styles.fluid])}>

      <div className={classNames([styles.content, styles.wide])}>
        <h2>
          How to play
        </h2>

        <h3>
          I. One click to deposit. Done!
        </h3>
        <h3>
          II. <span className={styles.gradient1}>1</span> + <span className={styles.gradient2}>1</span> prizes are awarded, every, single, day!
        </h3>
        <h3>
          III. Your money is still yours. Withdraw anytime with no fee!
        </h3>

      </div>
      
    </div>
  )
};

export default Screen5b;
