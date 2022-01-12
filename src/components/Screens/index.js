import { Scroll } from '@react-three/drei'
import classNames from 'classnames'
import Screen1 from './Screen1'
import Screen2 from './Screen2'
import Screen3 from './Screen3'
import Screen4 from './Screen4'
import Screen5 from './Screen5'
import Screen6 from './Screen6'
import Screen7 from './Screen7'
import styles from './screen.module.scss';
import { ReactComponent as PlusIcon } from '../../assets/plus.svg';

const Screens = ({context}) => {

  const { lightMode } = context;

  return (
    <Scroll html style={{ width: '100%' }}>
      <Screen1 />
      <Screen2 />
      <Screen3 />
      <Screen4 />
      <div className={classNames([styles.separator, lightMode && styles.isLightMode])}>
        <PlusIcon className={styles.plusIcon} />
      </div>
      <Screen5 />
      <Screen6 lightMode={lightMode} />
      <Screen7 />
    </Scroll>
  )
};

export default Screens;