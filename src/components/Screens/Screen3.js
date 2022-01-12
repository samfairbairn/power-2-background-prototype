import { useEffect, useRef, useState, useContext } from 'react';
import { MathUtils } from 'three';
import styles from './screen.module.scss';
import { AppContext } from "../../context/appContext";

const Screen3 = () => {

  const [isVisible, setVisible] = useState(false)
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
  }, [scrollPos, isVisible])

  useEffect(() => {
    yPos.current = titleRef.current.getBoundingClientRect().y - window.innerHeight + (window.innerHeight * 0.3)
  }, [])

  return (
    <div className={styles.screen} style={{top: `200vh`}}>
      <div ref={titleRef} className={styles.center}>
        <span className={styles.xlTitle}>
          ( <span style={{fontWeight: 'bold'}}><span className={styles.gradient1}>1</span> + <span className={styles.gradient2}>1</span></span> )<sup className={styles.super}>n</sup>
        </span>
        <h1>
          1 + 1 Magic boxes<br/>
          With big prize
        </h1>
        <h3>
          Free for you to open, week after week.<br/>
          The more you play, the higher power of 2.
        </h3>
      </div>
    </div>
  )
};

export default Screen3;
