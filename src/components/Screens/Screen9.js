import { useEffect, useRef } from 'react';
import ReactGA from 'react-ga';
import styles from './screen.module.scss';
import classNames from 'classnames';
import CycleImage3 from '../../assets/cycles_dark-08.svg'
import CycleImageLight3 from '../../assets/cycle_light-08.svg'

const Screen9 = ({scrollPos, lightMode}) => {
  
  const tracked = useRef(false);
  const screen = useRef()

  useEffect(() => {
    if (screen.current && screen.current.getBoundingClientRect().top / window.innerHeight < 0.5 && !tracked.current) {
      tracked.current = true
      ReactGA.event({
        category: "scroll",
        action: "screen9: Why HODL"
      });
    }
  }, [scrollPos])

  return (
    <div ref={screen} className={classNames([styles.screen, styles.fluid])} style={{flexDirection: "column"}}>

      <div className={classNames([styles.content, styles.wide])} style={{marginBottom: '10vh'}}>
        
        <h2>
          Why HODL POWER2 token & <span className={styles.specialI}>i</span>NFT?
        </h2>
        <h2>
          They'll grow to the moon, thanks to <br className="desktop-only"/>
          POWER2 Virtuous Snowball Cycles.
        </h2>

        <p>
          The Virtuous Snowball Cycles forms a positive back loop of higher demands,<br className="desktop-only"/>
          which causes higher POWER2 token and iNFT prices.<br className="desktop-only"/>
          So remember, always have diamond hands, and you will not be disappointed.
        </p>

      </div>

      <div className={styles.virtuousCycle}>
        { lightMode ? 
          <img src={CycleImageLight3} alt="virtuous cycles" />
        :
          <img src={CycleImage3} alt="virtuous cycles" />
        }     
        <span className={styles.scrollLabel}>{'<< scroll >>'}</span>
      </div>
      
    </div>
  )
};

export default Screen9;
