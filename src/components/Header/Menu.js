import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { AppContext } from "../../context/appContext";
import styles from './header.module.scss';
import DarkModeSwitch from "./DarkModeSwitch";

import { gsap, Power1, ScrollToPlugin } from "gsap/all"; 
gsap.registerPlugin(ScrollToPlugin);

function Menu() {
  const context = useContext(AppContext);
  const { scroll, scrollPos } = context
  const [activeIndex, setActiveIndex] = useState()

  useEffect(() => {
    if (scroll) {
      const _scrollPos = scrollPos / ((window.innerHeight * scroll.pages) - window.innerHeight)

      if (_scrollPos > (2/(scroll.pages-1)) && _scrollPos < (5/(scroll.pages-1))) {
        setActiveIndex(1)
      } else {
        setActiveIndex(0)
      }
    }
  }, [scrollPos, scroll])

  const lastScroll = useRef(undefined)
  
  const triggerScroll = (distance) => {
    if (!scroll) return
    const now = Math.floor(Date.now() / 1000)

    if (!lastScroll || lastScroll.current !== now) {
      lastScroll.current = now
      const _distance = (scroll.pages) * distance * window.innerHeight
      gsap.to(scroll.el, {duration: 1, scrollTo: {y: _distance}, ease: Power1.easeInOut}); 
    }
  }


  return (
    <div className={styles.menu}>
      <ul className={styles.links}>
        <li className={classNames([styles.link, activeIndex === 1 && styles.isActive])} onClick={() => { triggerScroll(2/(scroll.pages-1)) }}>Prize ( 1 + 1 )</li>
        <li className={styles.link}>Roadmap</li>
        <li className={styles.link}>Whitepaper</li>
      </ul>
      <DarkModeSwitch />
    </div>
  );
}

export default Menu;
