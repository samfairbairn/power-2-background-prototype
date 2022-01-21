import React, { useRef } from 'react';
import { Scroll } from '@react-three/drei'
import classNames from 'classnames'
import Screen1 from './Screen1'
import Screen2 from './Screen2'
import Screen3 from './Screen3'
import Screen4 from './Screen4'
import Screen5 from './Screen5'
import Screen6 from './Screen6'
import Screen7 from './Screen7'
import Screen8 from './Screen8'
import Screen9 from './Screen9'
import Screen10 from './Screen10'
import Screen11 from './Screen11'
import styles from './screen.module.scss';
import { ReactComponent as PlusIcon } from '../../assets/plus.svg';

const Screens = ({context}) => {

  const { lightMode, scrollPos, isMobile } = context;
  const partTwo = useRef()

  return (
    <Scroll html style={{ width: '100%' }}>
      <Screen1 />
      <Screen2 scrollPos={scrollPos} />
      <Screen3 scrollPos={scrollPos} />
      <Screen4 scrollPos={scrollPos} />
      <div className={classNames([styles.separator, lightMode && styles.isLightMode])}>
        <PlusIcon className={styles.plusIcon} />
      </div>
      <Screen5 scrollPos={scrollPos} />
      <div ref={partTwo} className={classNames([styles.screen, styles.secondPart, isMobile && styles.isMobile])}>
        <Screen6 scrollPos={scrollPos} />
        <Screen7 scrollPos={scrollPos} />
        <Screen8 scrollPos={scrollPos} />
        <Screen9 scrollPos={scrollPos} lightMode={lightMode}/>
        <Screen10 scrollPos={scrollPos} />
        <Screen11 scrollPos={scrollPos} />
      </div>
    </Scroll>
  )
};

export default Screens;