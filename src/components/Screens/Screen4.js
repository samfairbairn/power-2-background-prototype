import { useEffect, useRef, useState } from 'react';
import { MathUtils } from 'three';
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import classNames from 'classnames';
import styles from './screen.module.scss';

const Screen4 = () => {

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
    <div className={classNames([styles.screen, styles.alignRight])} style={{top: `300vh`, alignItems: 'flex-start', paddingTop: '10vh'}}>

      <span className={classNames([styles.big1, styles.gradient1])} >1</span>

      <div ref={titleRef} className={styles.content} style={{paddingLeft: '8vw'}}>
        <h2>
          Win a bitcoin?<br />
          Or other crypto-
          currency with <br/>
          high winning odds!
        </h2>

        <p>
          In the weekly Lotto 1, the more people join<br />
          the larger the cube grows, the bigger the prize! 
        </p>

        <p>
          Game your odds, the more you deposit the higher your chances to win. The winning odds formula is immutably written into the smart contract for anyone to review.
        </p>

        <p>
          Have fun with frequent small prizes while waiting for the big prize!
        </p>

      </div>
    </div>
  )
};

export default Screen4;
