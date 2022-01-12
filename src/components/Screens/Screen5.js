import { useEffect, useRef, useState } from 'react';
import { MathUtils } from 'three';
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import classNames from 'classnames';
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

    offset.current = MathUtils.lerp(offset.current, isVisible ? 0 : window.innerHeight * 0.2, 0.05)
    titleRef.current.style.transform = `translate3d(0, ${offset.current}px, 0)`
    titleRef.current.style.opacity = MathUtils.lerp(titleRef.current.style.opacity, isVisible ? 1 : 0, 0.05)

  })
  
  useEffect(() => {
    yPos.current = titleRef.current.getBoundingClientRect().y - window.innerHeight + (window.innerHeight * 0.3)
  }, [])

  return (
    <div className={styles.screen} style={{top: `400vh`, alignItems: 'flex-start', paddingTop: '50vh'}}>

      <span className={classNames([styles.big1, styles.gradient2])} style={{top: '50vh'}}>1</span>

      <div ref={titleRef} className={styles.content}>
        <h2>
          Yes! One More!
        </h2>
        <h2>
          Collectible NFTs?<br />
          Power2 <span className={styles.specialI}>i</span>NFTs?<br/>
          it could be anything!
        </h2>

        <p>
          For the weekly Lotto 2, anything is possible.
        </p>

        <p>
          It contains a valuable prize which could be anything from desirable NFTs like Degen Ape, BAYC, or CryptoPunk, or could see the release of new collections. The possibilities are limited only by your imagination as they will be decided by the community.
        </p>

        <p>
        Moreover, we will be collaborating with well-known artists to create POWER2 iNFT collections that earn governance tokens weekly and even more benefits. Click to check our valuable and intelligent iNFTs for you.
        </p>

      </div>
      
      <div className={styles.right}></div>
      
    </div>
  )
};

export default Screen5;
