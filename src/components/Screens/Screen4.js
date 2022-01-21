import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './screen.module.scss';

const Screen4 = ({scrollPos}) => {

  const lastTick = useRef(0);
  const animate = useRef(false);
  const [randomNumber, setRandomNumber] = useState(undefined)

  const getRandomNumber = () => {
    let _num = ''
    for(let i = 0; i < 6; i++) {
      _num += Math.floor(Math.random() * 10)
    }
    setRandomNumber(_num)
  }
  
  useEffect(() => {
    let _scrollPos = scrollPos / window.innerHeight;
    
    if ((_scrollPos < 2.25 || _scrollPos > 3.5) && animate.current) {
      animate.current = false
    }
    
    if (_scrollPos > 2.25 && _scrollPos < 3.5 && !animate.current) {
      animate.current = true
    }
  }, [scrollPos])

  useEffect(() => {

    const tick = () => {
      const now = Date.now();
      const delta = now - lastTick.current;
      if (delta > 1000/10) {
        lastTick.current = now;
        if (animate.current) {
          getRandomNumber()
        }
      }
      requestAnimationFrame(tick)
    }

    tick()
  }, [])

  return (
    <div className={classNames([styles.screen, styles.alignRight])} style={{top: `300vh`, height: '100vh'}}>
      <div className={styles.backgroundGradient}></div>

      <span className={classNames([styles.big1, styles.gradient1])}>1</span>

      <div className={classNames([styles.content, styles.prizes1])}>
        {/* <span className={classNames([styles.big1, styles.gradient1])}>1</span> */}

        <h2>
          <span className={styles.xlTitle} style={{marginLeft: '0'}}>$ {randomNumber} </span><br />
          Prizes with high<br />
          winning odds!
        </h2>

        <p>
          The more people join, the larger the cube grows, <br className="desktop-only" />the bigger the $ prize! 
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
