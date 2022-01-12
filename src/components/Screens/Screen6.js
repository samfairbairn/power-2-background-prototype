import { useEffect, useRef, useState } from 'react';
import { MathUtils } from 'three';
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import styles from './screen.module.scss';

import {ReactComponent as CycleImage} from '../../assets/cycle.svg'

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
    <div className={styles.screen} style={{top: `550vh`, height: '150vh', flexDirection: "column"}}>

      <div ref={titleRef} className={styles.center} style={{height: '75vh'}}>
        <h2>
          Why HODL POWER2 token & iNFT
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
        <CycleImage />
      </div>
      
    </div>
  )
};

export default Screen6;
