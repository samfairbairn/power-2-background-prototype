import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three';
import classNames from 'classnames';
import styles from './styles.module.scss';

import { ReactComponent as ArrowIcon } from '../../assets/button-arrow.svg';
import { ReactComponent as ReadMoreIcon } from '../../assets/button-read-more.svg';

const Button = () => {

  const wrapper = useRef()
  const resetTimer = useRef(undefined)
  // const wrapperPos = useRef(undefined)
  const realMousePos = useRef({x: 0, y: 0})
  const lerpMousePos = useRef({x: 0, y: 0})

  const [lerpPos, setLerpPos] = useState({x: 0, y: 0})

  const onMouseMove = (e) => {

    let wrapperPos = wrapper.current.getBoundingClientRect()

    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
      resetTimer.current = undefined;
    }

    resetTimer.current = setTimeout(() => {
      realMousePos.current = {
        x: 0,
        y: 0,
      }
    }, 250)

    realMousePos.current = {
      x: MathUtils.mapLinear(MathUtils.clamp(e.clientX - wrapperPos.left, 0, 240), 0, 240, -60, 60),
      y: MathUtils.mapLinear(MathUtils.clamp(e.clientY - wrapperPos.top, 0, 240), 0, 240, -60, 60),
    }

    // console.log(MathUtils.clamp(e.clientY - wrapperPos.current.top, 0, 240))
  }
  
  useFrame((state) => {
    lerpMousePos.current.y = MathUtils.lerp(lerpMousePos.current.y, realMousePos.current.y, 0.07)
    lerpMousePos.current.x = MathUtils.lerp(lerpMousePos.current.x, realMousePos.current.x, 0.07)

    setLerpPos({
      x: lerpMousePos.current.x,
      y: lerpMousePos.current.y
    })
  })

  useEffect(() => {
    // wrapperPos.current = wrapper.current.getBoundingClientRect()
    // console.log(wrapperPos.current)
  }, [])

  return (
    <div ref={wrapper} className={styles.buttonWrapper} onMouseMove={onMouseMove}>
      <div className={styles.button} style={{transform: `translate3d(${lerpPos.x}px, ${lerpPos.y}px, 0)`}}>
        <div className={styles.inside}></div>
        <ArrowIcon className={styles.arrow}/>
        <ReadMoreIcon className={styles.cta}/>
      </div>
    </div>
  )
};

export default Button;
