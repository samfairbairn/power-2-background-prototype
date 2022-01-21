import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { AppContext } from "../../context/appContext";
import styles from './menu.module.scss';
import DarkModeSwitch from "./DarkModeSwitch";
import ReactGA from "react-ga";

import { gsap, Power1, ScrollToPlugin } from "gsap/all"; 
gsap.registerPlugin(ScrollToPlugin);

function Menu() {
  const context = useContext(AppContext);
  const { scroll, scrollPos, lightMode, menuOpen, toggleMenu, isMobile } = context
  const [activeIndex, setActiveIndex] = useState()

  useEffect(() => {
    if (scroll) {
      const _scrollPos = scrollPos / ((window.innerHeight * scroll.pages) - window.innerHeight)

      if (_scrollPos > (2/(scroll.pages-1)) && _scrollPos < (5/(scroll.pages-1))) {
        setActiveIndex(1)
      } else {
        if (isMobile) {
          if (_scrollPos > (8.5/(scroll.pages-1)) && _scrollPos < (9.25/(scroll.pages-1))) {
            setActiveIndex(2)
          } else if (_scrollPos > (9.25/(scroll.pages-1))) {
            setActiveIndex(3)
          } else {
            setActiveIndex(0)
          }
        } else {
          if (_scrollPos > (9.5/(scroll.pages-1)) && _scrollPos < (10.75/(scroll.pages-1))) {
            setActiveIndex(2)
          } else if (_scrollPos > (11/(scroll.pages-1))) {
            setActiveIndex(3)
          } else {
            setActiveIndex(0)
          }
        }
      } 
    }
  }, [scrollPos, scroll, isMobile])

  const lastScroll = useRef(undefined)
  
  const triggerScroll = (distance, label) => {
    if (!scroll) return
    const now = Math.floor(Date.now() / 1000)

    ReactGA.event({
      category: "nav",
      action: label
    });

    if (!lastScroll || lastScroll.current !== now) {
      lastScroll.current = now
      const _distance = (scroll.pages) * distance * window.innerHeight
      gsap.to(scroll.el, {duration: 1, scrollTo: {y: _distance}, ease: Power1.easeInOut}); 
    }

    if (menuOpen) toggleMenu()
  }

  const whitepaperClick = () => {
    ReactGA.event({
      category: "nav",
      action: "whitepaper"
    });
    window.open('https://docs.power2.finance/whitepaper/', '_blank');
  }


  return (
    <div className={classNames([styles.menu, lightMode && styles.lightMode])}>
      <ul className={styles.links}>
        <li className={classNames([styles.link, activeIndex === 1 && styles.isActive])} onClick={() => { triggerScroll(2/(scroll.pages-1), "Prize ( 1 + 1 )") }}>Prize ( 1 + 1 )</li>
        <li className={classNames([styles.link, activeIndex === 2 && styles.isActive])} onClick={() => { triggerScroll( (isMobile ? 8.9 : 9.9)/(scroll.pages-1), "Roadmap") }}>Roadmap</li>
        <li className={classNames([styles.link, activeIndex === 3 && styles.isActive])} onClick={() => { triggerScroll( (isMobile ? 10 : 11.5)/(scroll.pages-1), "Community") }}>Community</li>
        <li className={styles.link} onClick={whitepaperClick}>Whitepaper</li>
      </ul>
      <DarkModeSwitch />
    </div>
  );
}

export default Menu;
