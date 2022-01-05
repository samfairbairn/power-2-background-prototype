import React, { useRef, useState, useContext, useEffect } from 'react';
import { MathUtils } from 'three';
import styles from './header.module.scss';
import { AppContext } from "../../context/appContext";
import classNames from 'classnames';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';

function Header() {

  const context = useContext(AppContext);
  const { lightMode, scrollPos } = context

  const [pos, setPos] = useState(2) // 0: abstop, 1: hidden, 2: visible
  // const [inTop, setInTop] = useState(true) // 0: abstop, 1: hidden, 2: visible
  const [offset, setOffset] = useState(0) // 0: abstop, 1: hidden, 2: visible
  const lastPos = useRef()

  useEffect(() => {
    const threshold = window.innerHeight / 4;
    const scrollDiff = scrollPos - lastPos.current
    lastPos.current = scrollPos

    if (scrollPos <= 1) {
      setPos(0)
    }

    // setInTop(scrollPos <= threshold)

    if (pos === 0) {
      setOffset(MathUtils.clamp(scrollPos, 1, 80))
    }
    
    if (scrollDiff > 1 && pos !== 1 && scrollPos > threshold) {

      // if (pos === 2)
      setPos(1)
      setOffset(80)

    } else if (scrollDiff < -1 && pos !== 2 && scrollPos > threshold) {
      // going up
      setPos(2)
      setOffset(1)
    }

  }, [scrollPos, pos, offset])

  return (
    <div 
      className={classNames([
        styles.container,
        lightMode && styles.lightMode,
        pos === 2 && styles.goingUp,
        pos === 1 && styles.goingDown,
        pos === 0 && styles.inTop,
      ])}
      style={{transform: `translate3d(0, -${offset}px, 0)`}}
      >
        <LogoIcon className={styles.logo} />
      </div>
  );
}

export default Header;
