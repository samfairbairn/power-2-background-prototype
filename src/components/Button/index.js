import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three';
import styles from './styles.module.scss';

import { ReactComponent as ArrowIcon } from '../../assets/button-arrow.svg';
import { ReactComponent as ReadMoreIcon } from '../../assets/button-read-more.svg';

const Button = () => {

  const wrapper = useRef()
  const inside = useRef()
  
  const isOuterHover = useRef(false)
  const isInnerHover = useRef(false)

  const realMousePos = useRef({x: 0, y: 0})
  const lerpMousePos = useRef({x: 0, y: 0})

  const [lerpPos, setLerpPos] = useState({x: 0, y: 0})

  const onMouseMove = (e) => {
    let wrapperPos = wrapper.current.getBoundingClientRect()

    realMousePos.current = {
      x: MathUtils.mapLinear(MathUtils.clamp(e.clientX - wrapperPos.left, 0, 240), 0, 240, -60, 60),
      y: MathUtils.mapLinear(MathUtils.clamp(e.clientY - wrapperPos.top, 0, 240), 0, 240, -60, 60),
    }
  }

  const checkHover = () => {
    setTimeout(() => {
      if (!isOuterHover.current && !isInnerHover.current) {
        realMousePos.current = {
          x: 0,
          y: 0,
        }
      }
    }, 200)
  }

  const onMouseOuterOver = (e) => {
    isOuterHover.current = true
  }
  const onMouseOuterOut = (e) => {
    isOuterHover.current = false
    checkHover()
  }

  const onMouseInnerOver = (e) => {
    isInnerHover.current = true
  }
  const onMouseInnerOut = (e) => {
    isInnerHover.current = false
    checkHover()
  }
  
  useFrame((state) => {
    lerpMousePos.current.y = MathUtils.lerp(lerpMousePos.current.y, realMousePos.current.y, 0.07)
    lerpMousePos.current.x = MathUtils.lerp(lerpMousePos.current.x, realMousePos.current.x, 0.07)

    setLerpPos({
      x: lerpMousePos.current.x,
      y: lerpMousePos.current.y
    })
  })

  return (
    <div ref={wrapper} className={styles.buttonWrapper} onMouseMove={onMouseMove} onMouseOver={onMouseOuterOver} onMouseOut={onMouseOuterOut}>
      <div ref={inside} className={styles.button} onMouseOver={onMouseInnerOver} onMouseOut={onMouseInnerOut} style={{transform: `translate3d(${lerpPos.x}px, ${lerpPos.y}px, 0)`}}>
        <div className={styles.inside}></div>
        <ArrowIcon className={styles.arrow}/>
        <ReadMoreIcon className={styles.cta}/>
      </div>
    </div>
  )
};

export default Button;
