import { useEffect, useRef } from 'react';
import ReactGA from 'react-ga';
import styles from './screen.module.scss';
import classNames from 'classnames';
import { ReactComponent as LogoSimple } from '../../assets/logo-simple.svg'
import Button from '../Button'

const Screen9 = ({scrollPos}) => {

  const tracked = useRef(false);
  const screen = useRef()

  useEffect(() => {
    if (screen.current && screen.current.getBoundingClientRect().top / window.innerHeight < 0.5 && !tracked.current) {
      tracked.current = true
      ReactGA.event({
        category: "scroll",
        action: "screen11: Footer"
      });
    }
  }, [scrollPos])

  const track = (label) => {
    ReactGA.event({
      category: "social",
      action: label,
      label: 'Footer'
    });
  }

  return (
    <div ref={screen} className={classNames([styles.screen, styles.fluid])} style={{flexDirection: "column"}}>
      <div className={styles.center} style={{marginBottom: '10vh'}}>
        <LogoSimple className={styles.logoSimple} />
        <h2>Whitepaper</h2>
        <div className={styles.buttonWrapper}>
          <Button url="https://docs.power2.finance/whitepaper/" />
        </div>
      </div>
      <div className={styles.footer}>
        <a href='https://twitter.com/POWER2_1plus1' onClick={() => { track("twitter") }} target="_blank" rel="noreferrer" className={styles.link}>Twitter</a>
        <a href='https://power2.medium.com/' onClick={() => { track("medium") }} target="_blank" rel="noreferrer" className={styles.link}>Medium</a>
        {/* <a href='https://google.com' target="_blank" rel="noreferrer" className={styles.link}>Telegram</a> */}
        {/* <a href='https://google.com' target="_blank" rel="noreferrer" className={styles.link}>Discord</a> */}
      </div>
    </div>
  )
};

export default Screen9;
