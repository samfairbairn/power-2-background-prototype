import React, { useRef, useState, useContext, useEffect } from 'react';
import { MathUtils } from 'three';
import styles from './header.module.scss';
import { AppContext } from "../../context/appContext";
import classNames from 'classnames';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';
import { ReactComponent as LightLogoIcon } from '../../assets/logo_black.svg';
import Menu from './Menu'

function Header() {

  const context = useContext(AppContext);
  const { lightMode, scrollPos } = context

  const [pos, setPos] = useState(2) // 0: abstop, 1: hidden, 2: visible
  // const [inTop, setInTop] = useState(true) // 0: abstop, 1: hidden, 2: visible
  const [offset, setOffset] = useState(0) // 0: abstop, 1: hidden, 2: visible
  const lastPos = useRef()

  const headerHeight = 80;
  const topOffset = 20;

  useEffect(() => {
    const threshold = window.innerHeight / 4;
    const scrollDiff = scrollPos - lastPos.current
    lastPos.current = scrollPos

    let _offset = offset;

    if (scrollPos <= topOffset && pos !== 0) {
      setPos(0)
    }

    // setInTop(scrollPos <= threshold)

    if (pos === 0) {
      _offset = -MathUtils.clamp(scrollPos, 0, headerHeight) + topOffset;
    }
    
    if (scrollDiff > 1 && pos !== 1 && scrollPos > threshold) {

      setPos(1)
      _offset = -headerHeight

    } else if (scrollDiff < -1 && pos !== 2 && scrollPos > threshold) {
      // going up
      setPos(2)
      // setOffset(0)
      _offset = 0
    }

    if (Math.floor(_offset * 1000) !== Math.floor(offset * 1000)) {
      setOffset(_offset)
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
      style={{transform: `translate3d(0, ${offset}px, 0)`}}
      >
        {lightMode ? (
          <LightLogoIcon className={styles.logo} />
        ) : (
          <LogoIcon className={styles.logo} />
        )}
        <Menu />
      </div>
  );
}

export default Header;
