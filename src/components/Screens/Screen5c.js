import { useEffect, useRef } from 'react';
import ReactGA from 'react-ga';
import styles from './screen.module.scss';
import classNames from 'classnames';
// import {ReactComponent as PuppyImage} from '../../assets/puppy.svg'
import PuppyImage from '../../assets/dog-tail.gif'

const Screen5b = ({scrollPos, lightMode}) => {

  const tracked = useRef(false);
  const screen = useRef()

  useEffect(() => {
    if (screen.current && screen.current.getBoundingClientRect().top / window.innerHeight < 0.5 && !tracked.current) {
      tracked.current = true
      ReactGA.event({
        category: "scroll",
        action: "screen8: No-loss for charity"
      });
    }
  }, [scrollPos])

  return (
    <div ref={screen} className={classNames([styles.screen, styles.column, styles.fluid])}>

      <div className={classNames([styles.content, styles.wide])}>
        <h2>
          No-loss for charity
        </h2>

        <p>
          You don't need to spend a penny, just play the POWER2 CUBE <br className='desktop-only' />
          and rescue animals at the same time.
        </p>

        <p>
          1% of net fees will be donated to animal charities, <br className='desktop-only' />
          because our team members are all animals lovers.
        </p>

        {/* <PuppyImage className={styles.puppyImage} /> */}
        <img src={PuppyImage} className={styles.puppyImage} alt='puppy' />
      </div>

      
    </div>
  )
};

export default Screen5b;
