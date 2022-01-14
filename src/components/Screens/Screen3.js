import React, { useEffect, useState, useRef } from 'react';
import styles from './screen.module.scss';

const Screen3 = ({scrollPos}) => {

  const lastTick = useRef(0);
  const animate = useRef(false);
  const timer = useRef(undefined);
  const nVal = useRef(1);
  const [n, setN] = useState(1);
  
  useEffect(() => {
    let _scrollPos = scrollPos / window.innerHeight;
    
    if ((_scrollPos < 1 || _scrollPos > 3) && animate.current) {
      animate.current = false
      setN(1)
      nVal.current = 1
      clearTimeout(timer.current)
      timer.current = undefined
    }
    
    if (_scrollPos > 1.5 && _scrollPos < 2 && !animate.current && !timer.current) {
      timer.current = setTimeout(() => {
        if (_scrollPos > 1.5 && _scrollPos < 2 && !animate.current) {
          clearTimeout(timer.current)
          timer.current = undefined
          animate.current = true
        }
      }, 2000)
    }
  }, [scrollPos])

  useEffect(() => {

    const tick = () => {
      const now = Date.now();
      const delta = now - lastTick.current;
      if (delta > 1000/10) {
        lastTick.current = now;
        if (animate.current) {
          nVal.current = nVal.current + 1;
          setN(nVal.current)
        }
      }
      requestAnimationFrame(tick)
    }

    tick()
  }, [])

  return (
    <div className={styles.screen} style={{top: `200vh`}}>
      <div className={styles.center}>
        <span className={styles.xlTitle}>
          <span style={{fontWeight: '400'}}>( </span>
          <span className={styles.gradient1}>1</span> + <span className={styles.gradient2}>1</span>
          <span style={{fontWeight: '400'}}> )</span> <span className={styles.bullet}>•</span> <span className={styles.count}>{animate.current ? n : 'N' }</span>
        </span>
        <h1 style={{marginBottom: '20px'}}>
          Prizes
        </h1>
        <h3>
          Free for you to win <br/>
          The more you play, <br className="mobile-only" />the higher power of 2
        </h3>
      </div>
    </div>
  )
};

export default Screen3;
