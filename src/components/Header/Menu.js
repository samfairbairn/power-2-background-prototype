import React, { useRef, useState, useContext, useEffect } from 'react';
import { MathUtils } from 'three';
import styles from './header.module.scss';
import classNames from 'classnames';
// import { animateScroll as scroll } from 'react-scroll'

function Menu() {

  // const scrollToPrizes = () => {
  //   scroll.scrollTo(window.innerHeight * 3);
  // }

  return (
    <div className={styles.menu}>
      <ul className={styles.links}>
        <li className={styles.link}>Prize 1 + Prize 2</li>
        <li className={styles.link}>Roadmap</li>
        <li className={styles.link}>Whitepaper</li>
      </ul>
    </div>
  );
}

export default Menu;
