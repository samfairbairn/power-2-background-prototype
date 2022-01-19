import React, { useContext } from 'react';
import classNames from 'classnames';
import { AppContext } from "../../context/appContext";
import styles from './menu.module.scss';

import { ReactComponent as MoonIcon } from '../../assets/moon.svg';
import { ReactComponent as SunIcon } from '../../assets/sun.svg';

function DarkModeSwitch() {
  const context = useContext(AppContext);
  const { setLightMode, lightMode } = context

  const toggleLightMode = () => {
    const newLightMode = !lightMode
    localStorage.setItem('lightMode', newLightMode ? '1' : '0');
    setLightMode(newLightMode)
  }

  return (
    <div className={styles.darkmodeSwitch} onClick={toggleLightMode}>
      <div className={classNames([styles.switchIcon, styles.moon])}><MoonIcon /></div>
      <div className={classNames([styles.switchIcon, styles.sun])}><SunIcon /></div>
      <span className={styles.knob}></span>
    </div>
  );
}

export default DarkModeSwitch;
