import { Scroll } from '@react-three/drei'

import Screen1 from './Screen1'
import Screen2 from './Screen2'
import Screen3 from './Screen3'
import Screen4 from './Screen4'
import Screen5 from './Screen5'
import Screen6 from './Screen6'

const Screens = () => {
  return (
    <Scroll html style={{ width: '100%' }}>
      <Screen1 />
      <Screen2 />
      <Screen3 />
      <Screen4 />
      <Screen5 />
      <Screen6 />
    </Scroll>
  )
};

export default Screens;