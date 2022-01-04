import { useEffect, useRef, useState } from 'react';
import { MathUtils } from 'three';
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import styles from './screen.module.scss';

const Screen5 = () => {

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

    offset.current = MathUtils.lerp(offset.current, isVisible ? 0 : window.innerHeight * 0.1, 0.05)
    titleRef.current.style.transform = `translate3d(0, ${offset.current}px, 0)`
    titleRef.current.style.opacity = MathUtils.lerp(titleRef.current.style.opacity, isVisible ? 1 : 0, 0.05)

  })
  
  useEffect(() => {
    yPos.current = titleRef.current.getBoundingClientRect().y - window.innerHeight + (window.innerHeight * 0.3)
  }, [])

  return (
    <div className={styles.screen} style={{top: `400vh`}}>
      <div className={styles.left}></div>

      <div ref={titleRef} className={styles.right}>
        <h2>
          Power of 2<br />
          fun cubic game
        </h2>

        <p>
          Each deposit has weekly dual lottos:<br/>
          POWER2 Cube Lotto 1 + Magic Cube Lotto 2.<br />
          And you can keep auto-joining the dual-lottos game.
        </p>

        <p>
          In the POWER2 Cube Lotto 1,<br />
          the more you play, there's more power of 2.<br />
          The more people join, the larger the cube, the bigger the prize.
        </p>

        <p>
          As for the Magic Cube Lotto 2,<br />
          everything is possible.
        </p>

        <p>
          Are you ready for the various transformative cubic games?
        </p>
      </div>
    </div>
  )
};

export default Screen5;
