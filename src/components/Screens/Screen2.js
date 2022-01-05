import { useEffect, useRef, useState } from 'react';
import { MathUtils } from 'three';
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import styles from './screen.module.scss';

const Screen2 = () => {

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
    <div className={styles.screen} style={{top: `100vh`}}>
      <div className={styles.left}></div>

      <div ref={titleRef} className={styles.right}>
        <h2>
          POWER2:<br/>
          Always Free Draw<br />
          for Dual Lotos<br />
          With Double Luck
        </h2>

        <p>
          Dual-Lotto, Double Luck, Win Twice<br/>
          because TWO is better than ONE.
        </p>

        <p>
          For each round, two no-loss free lottos will be generated to enable double luck experience. One draw for two prizes. One for crypto currecny, another one for the airdrop BOOSTER, which plays a critical role in enabling the game to be fun, and most importantly, to give you more chances to get rich.
        </p>

        {/* <p>
          POWER2 is the easiest and most enjoyable way to get rich on the Solana blockchain by using human-centered and gamification design.
        </p> */}
      </div>
    </div>
  )
};

export default Screen2;
