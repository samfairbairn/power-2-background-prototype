import { useEffect, useRef, useState, useContext } from 'react';
import { MathUtils } from 'three';
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import classNames from 'classnames';
import styles from './screen.module.scss';
import { AppContext } from "../../context/appContext";

const Screen2 = () => {

  // const scroll = useScroll()
  const [isVisible, setVisible] = useState(true)
  const yPos = useRef(0)
  const offset = useRef(0)
  const titleRef = useRef()

  const { scrollPos } = useContext(AppContext);
  
  useEffect(() => {
    
    const currentScroll = scrollPos * document.body.scrollHeight
    if (currentScroll > yPos.current && !isVisible) {
      setVisible(true)
    } else if (currentScroll < yPos.current && isVisible) {
      setVisible(false)
    }

    offset.current = MathUtils.lerp(offset.current, isVisible ? 0 : window.innerHeight * 0.2, 0.05)
    titleRef.current.style.transform = `translate3d(0, ${offset.current}px, 0)`
    titleRef.current.style.opacity = MathUtils.lerp(titleRef.current.style.opacity, isVisible ? 1 : 0, 0.05)
  }, [scrollPos])

  useEffect(() => {
    yPos.current = titleRef.current.getBoundingClientRect().y - window.innerHeight + (window.innerHeight * 0.3)
    console.log(yPos.current)
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
