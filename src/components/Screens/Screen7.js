import { useEffect, useRef, useState } from 'react';
import { MathUtils } from 'three';
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import styles from './screen.module.scss';
import classNames from 'classnames';

const Screen6 = () => {

  const scroll = useScroll()
  const [isVisible, setVisible] = useState(false)
  const yPos = useRef(0)
  const offset = useRef(0)
  const titleRef = useRef()
  
  useFrame((state, delta) => {
    const currentScroll = (scroll.pages - 1) * scroll.offset * window.innerHeight;
    
    if (currentScroll > yPos.current && !isVisible) {
      setVisible(true)
    } else if (currentScroll < yPos.current && isVisible) {
      setVisible(false)
    }

    offset.current = MathUtils.lerp(offset.current, isVisible ? 0 : window.innerHeight * 0.2, 0.05)
    titleRef.current.style.transform = `translate3d(0, ${offset.current}px, 0)`
    titleRef.current.style.opacity = MathUtils.lerp(titleRef.current.style.opacity, isVisible ? 1 : 0, 0.05)

  })
  
  useEffect(() => {
    yPos.current = titleRef.current.getBoundingClientRect().y - window.innerHeight + (window.innerHeight * 0.3)
  }, [])

  return (
    <div className={styles.screen} style={{top: `650vh`, height: '100vh', flexDirection: "column", justifyContent: 'center'}}>

      <div ref={titleRef} className={classNames([styles.center, styles.row])}>
        <div className={styles.left}>
          <h2>
            OH!
          </h2>
          <h2>
            YOU CAN ONLY WIN, <br />NEVER LOSE!
          </h2>
          <h2>
            THANKS TO THE <br />MAGIC OF DEFI.
          </h2>
        </div>
        <div className={styles.right}>
        <p>
          When a deposit is made into POWER2 that deposit is automatically routed to other decentralized finance protocols to begin earning interest, it’s this interest that creates the prize fund, but your deposit is never taken from you and you can withdraw at any time with no fee. You play for no losses!
        </p>
        <p>
          Your deposit enrols you into the weekly dual lottos, the more you deposit the higher chances you have of winning, and you will be automatically enrolled into the next round for free as long as your deposit remains in the vault.
        </p>
        </div>
      </div>
    </div>
  )
};

export default Screen6;
