import { useEffect, useRef, useState } from 'react';
import { MathUtils } from 'three';
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import styles from './screen.module.scss';

const Screen3 = () => {

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
    <div className={styles.screen} style={{top: `200vh`}}>
      <div ref={titleRef} className={styles.left}>
        {/* <h2>
          Thanks to the <br />
          magic of defi! <br />
          It is no loss! <br />
          You can only win,<br />
          Never lose!
        </h2> */}

        <h2>
          Never lose!<br />
          Thanks to the <br />
          magic of defi.
        </h2>

        <p>
          It all starts from a block on the chain.
        </p>

        <p>
          When a deposit is made into POWER2 that deposit is automatically routed to other decentralized fincance protocols to begin earning interest, and the deposits can be withdrawn at any time with no fee! The deposits help create the prize fund but is never taken from you. You play for no losses!
        </p>
      </div>
      <div className={styles.right}>
      </div>
    </div>
  )
};

export default Screen3;
