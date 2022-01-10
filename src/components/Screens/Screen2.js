import { useEffect, useRef, useState } from 'react';
import { MathUtils } from 'three';
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import classNames from 'classnames';
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
    <div className={classNames([styles.screen, styles.alignRight])} style={{top: `100vh`}}>

      <div ref={titleRef} className={styles.content}>
        <h2>
          What's POWER2?
        </h2>
        <h2>
          Always Free Draw<br />
          for Dual Lotos<br />
          With Double Luck
        </h2>

        <p>
          Because TWO is better than ONE, with each weekly draw,<br/>
          two no-loss FREE lottos will be generatedto enable double luck<br/>
          experience. You have TWO chances to win:
        </p>
        <p>1: Crypto currency including bitcoin!</p>
        <p>Plus 1: Valuable NFTs including popular NFTs, and famous artist collaboration POWER2 iNFT which have additional utilities.</p>

      </div>
    </div>
  )
};

export default Screen2;
