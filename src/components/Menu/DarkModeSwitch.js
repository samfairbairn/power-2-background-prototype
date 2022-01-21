import React, { useContext } from 'react';
import classNames from 'classnames';
import { AppContext } from "../../context/appContext";
import styles from './menu.module.scss';
import ReactGA from "react-ga";

import { ReactComponent as MoonIcon } from '../../assets/moon.svg';
import { ReactComponent as SunIcon } from '../../assets/sun.svg';

function DarkModeSwitch() {
  const context = useContext(AppContext);
  const { setLightMode, lightMode } = context

  const toggleLightMode = () => {
    const newLightMode = !lightMode
    localStorage.setItem('lightMode', newLightMode ? '1' : '0');
    ReactGA.event({
      category: "nav",
      action: 'Change lightmode',
      label: newLightMode ? 'lightmode': 'darkmode'
    });
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
