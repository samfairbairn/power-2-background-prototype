import React, { useContext } from 'react';
import styles from './mobilemenu.module.scss';
import { AppContext } from "../../context/appContext";
import classNames from 'classnames';
import Menu from '../Menu'

import { ReactComponent as TwitterIcon } from '../../assets/icons/twitter.svg';
import { ReactComponent as MediumIcon } from '../../assets/icons/medium.svg';
// import { ReactComponent as TelegramIcon } from '../../assets/icons/telegram.svg';
// import { ReactComponent as DiscordIcon } from '../../assets/icons/discord.svg';

function MobileMenu() {

  const context = useContext(AppContext);
  const { lightMode, isMobile, menuOpen } = context

  if (!isMobile) return null

  return (
    <div 
      className={classNames([
        styles.mobileMenu,
        lightMode && styles.lightMode,
        menuOpen && styles.menuOpen
      ])}
    >
      <Menu />

      <div className={styles.socials}>
        <a href='https://twitter.com/POWER2_1plus1' target="_blank" rel="noreferrer"><TwitterIcon className={styles.twitter} /></a>
        <a href='https://power2.medium.com/' target="_blank" rel="noreferrer"><MediumIcon className={styles.medium} /></a>
        {/* <a href='https://google.com' target="_blank" rel="noreferrer"><TelegramIcon className={styles.telegram} /></a> */}
        {/* <a href='https://google.com' target="_blank" rel="noreferrer"><DiscordIcon className={styles.discord} /></a> */}
      </div>
    </div>
  );
}

export default MobileMenu;
