/* eslint-disable no-unused-vars */

import React, { useEffect, useRef, Suspense, useState, useContext } from 'react';
import styles from './style.module.scss';
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Color, MathUtils } from 'three';
import { ScrollControls, useScroll } from '@react-three/drei'
import { EffectComposer, SSAO } from '@react-three/postprocessing'
import { Leva, useControls } from 'leva'
import Screens from '../Screens'
import { AppContext } from "../../context/appContext";
import { TimelineLite, Power0, Power1, Power3 } from "gsap/all"; 
import Grid from "./Grid"

// fog

function Fog() {
  return (<fog attach="fog" args={[new Color( 0xF43880 ), 5, 11]} />) // 0xED9FB2
}

// main composition

function Composition({context}) {

  const { lightMode, setScrollPos, setScroll } = context;

  const scroll = useScroll()

  const { width, height } = useThree((state) => state.viewport)
  const [numberOfShapes, setNumberOfShapes] = useState(1)
  const [numberOfRows, setNumberOfRows] = useState(1)

  const [currentScaleFactor, setCurrentScaleFactor] = useState(1)
  const [currentScale, setCurrentScale] = useState(1)

  const [showShape, setShowShape] = useState(true)

  const properties = useRef()

  useState(() => {

    setScroll({pages: scroll.pages, el: scroll.el})

    properties.current = {
      lookatX: -(width/5),
      lookatY: height/16,
      positionZ: 7,
      scale: 1,
      rotation: 0.008,
      blocks: 0,
      lookatTL: undefined,
      lookatTLY: undefined,
      positionTL: undefined,
      rotationTL: undefined,
      blocksTL: undefined,
      scaleFactor: 1,
      currentScale: 1
    }

    properties.current.lookatTL = new TimelineLite();
    properties.current.lookatTL.to(properties.current, {lookatX: width/4, duration: 1, ease: Power1.easeInOut});
    properties.current.lookatTL.to(properties.current, {lookatX: -width/5, duration: 1, ease: Power1.easeInOut});
    properties.current.lookatTL.to(properties.current, {lookatX: width/4, duration: 1, ease: Power1.easeInOut});
    properties.current.lookatTL.to(properties.current, {lookatX: width/4, duration: 1, ease: Power0.easeInOut});
    properties.current.lookatTL.pause();

    properties.current.lookatTLY = new TimelineLite();
    properties.current.lookatTLY.to(properties.current, {lookatY: 0, duration: 1, ease: Power1.easeInOut});
    properties.current.lookatTLY.pause();

    properties.current.lookatTLY2 = new TimelineLite();
    properties.current.lookatTLY2.to(properties.current, {lookatY: -(height*3), duration: 1, ease: Power1.easeInOut});
    properties.current.lookatTLY2.pause();

    properties.current.positionTL = new TimelineLite();
    properties.current.positionTL.to(properties.current, {positionZ: 10, duration: 2, ease: Power1.easeInOut});
    properties.current.positionTL.to(properties.current, {positionZ: 7, duration: 1, ease: Power1.easeInOut});
    properties.current.positionTL.pause();

    properties.current.scaleTL = new TimelineLite();
    properties.current.scaleTL.to(properties.current, {scale: 0.6, duration: 1, ease: Power1.easeInOut});
    properties.current.scaleTL.pause();

    properties.current.rotationTL = new TimelineLite();
    properties.current.rotationTL.to(properties.current, {rotation: 0.005, duration: 1, ease: Power1.easeInOut});
    properties.current.rotationTL.pause();

    properties.current.blocksTL = new TimelineLite();
    // properties.current.blocksTL.to(properties.current, {blocks: 27, duration: 1, ease: Power3.easeIn});
    properties.current.blocksTL.to(properties.current, {blocks: 7, duration: 1, ease: Power3.easeIn});
    properties.current.blocksTL.pause();
  }, [])

  useFrame((state, delta) => {

    const currentScroll = (scroll.pages - 1) * scroll.offset * window.innerHeight;
    setScrollPos(currentScroll)

    // ranges
    const fullRange = scroll.range(0 / scroll.pages, 4.5 / scroll.pages)
    const positionRange = scroll.range(0 / scroll.pages, 3 / scroll.pages)
    const yRange = scroll.range(0 / scroll.pages, 1 / scroll.pages)
    const yRange2 = scroll.range(2.8 / scroll.pages, 4 / scroll.pages)

    // horizontal position
    properties.current.lookatTL.seek(fullRange * properties.current.lookatTL.duration())
    if (yRange < 1) properties.current.lookatTLY.seek(yRange * properties.current.lookatTLY.duration())
    if (yRange2 < 1) {
      properties.current.lookatTLY2.seek(yRange2 * properties.current.lookatTLY2.duration())
    }

    state.camera.lookAt(properties.current.lookatX, properties.current.lookatY, 0)

    if (yRange2 >= 0.5 && showShape) {
      setShowShape(false);
    } else if (yRange2 < 0.5 && !showShape) {
      setShowShape(true);
    }
    
    // rotation speed
    properties.current.rotationTL.seek(fullRange)
    
    // set number of blocks
    const blocksRange = scroll.range(1.75 / scroll.pages, 1.5 / scroll.pages)
    properties.current.blocksTL.seek(blocksRange)
    const _blocks = MathUtils.clamp(Math.floor(properties.current.blocks) + 1, 1, 27)
    
    if (_blocks !== numberOfShapes) {
      setNumberOfShapes(_blocks)
      const _noOfRows = Math.ceil(Math.pow(_blocks, 1/3));
      setNumberOfRows(_noOfRows);

      if (_noOfRows === 1) properties.current.scaleFactor = 1
      if (_noOfRows === 2) properties.current.scaleFactor = 2.5
      if (_noOfRows === 3) properties.current.scaleFactor = 3.6
    }

    // scrolling scale
    properties.current.scaleTL.seek(positionRange * properties.current.scaleTL.duration())
    
    // set scale
    setCurrentScaleFactor(MathUtils.damp(currentScaleFactor, properties.current.scaleFactor, 20, delta))
    setCurrentScale(MathUtils.damp(currentScale, properties.current.scale, 10, delta))
    // performance: remove damp
    // setCurrentScale(properties.current.scale)

    // camera z position 
    properties.current.positionTL.seek(positionRange * properties.current.positionTL.duration())
    state.camera.position.z = properties.current.positionZ

  })

  if (!showShape) return null

  return (
    <>
        
      { !lightMode && (<Fog />) }

      <ambientLight intensity={1}  />

      { lightMode && (
        <pointLight
          position={[0, 10, 20]}
          intensity={3}
          castShadow={true}
          shadow-radius={2} 
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
      )}
      
      <Suspense fallback={null}>
        <Grid
          rows={numberOfRows}
          shapes={numberOfShapes}
          rotationSpeed={properties.current.rotation}
          scaleFactor={currentScaleFactor}
          scale={currentScale}
          lightMode={lightMode}
          />
      </Suspense>

      {/* { lightMode && (
        <EffectComposer multisampling={0}>
          <SSAO samples={50} radius={10} intensity={50} luminanceInfluence={0.4} />
        </EffectComposer>
      )} */}
    </>
  )
}

function Scene() {

  const context = useContext(AppContext);
  const { lightMode, setLightMode } = context

  // const { _lightMode } = useControls({ _lightMode: false })

  useEffect(() => {
    if (lightMode !== window._bgConfig.LIGHTMODE) window.toggleLightMode()
  }, [lightMode])

  return (
    <div className={styles.scene + ` ${lightMode ? 'is-light-mode' : ''}`}>
      {/* <Leva collapsed={false} /> */}
      <Canvas shadows dpr={[1, 2]} gl={{ alpha: true, antialias: false }} camera={{ fov: 50, position: [0, 0, 7], near: 1, far: 15 }}>
        <ScrollControls damping={10} pages={7.5} >
          <Composition context={context} />
          <Screens context={context} />
        </ScrollControls>
      </Canvas>
    </div>
  );
}

export default Scene;

