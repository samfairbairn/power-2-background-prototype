import React, { useRef } from 'react';
import { Scroll } from '@react-three/drei'
import classNames from 'classnames'
import Screen1 from './Screen1'
import Screen2 from './Screen2'
import Screen3 from './Screen3'
import Screen4 from './Screen4'
import Screen5 from './Screen5'
import Screen5b from './Screen5b'
import Screen5c from './Screen5c'
import Screen6 from './Screen6'
import Screen7 from './Screen7'
import Screen8 from './Screen8'
import Screen9 from './Screen9'
import styles from './screen.module.scss';
import { ReactComponent as PlusIcon } from '../../assets/plus.svg';

const Screens = ({context}) => {

  const { lightMode, scrollPos, isMobile } = context;
  const partTwo = useRef()

  return (
    <Scroll html style={{ width: '100%' }}>
      <Screen1 />
      <Screen2 />
      <Screen3 scrollPos={scrollPos} />
      <Screen4 />
      <div className={classNames([styles.separator, lightMode && styles.isLightMode])}>
        <PlusIcon className={styles.plusIcon} />
      </div>
      <Screen5 />
      <div ref={partTwo} className={classNames([styles.screen, styles.secondPart, isMobile && styles.isMobile])}>
        <Screen5b />
        <Screen7 />
        <Screen5c />
        <Screen6 lightMode={lightMode}/>
        <Screen8 />
        <Screen9 />
      </div>
    </Scroll>
  )
};

export default Screens;