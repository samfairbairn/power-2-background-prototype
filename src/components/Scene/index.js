/* eslint-disable no-unused-vars */

import React, { useEffect, useRef, Suspense, useMemo, useState } from 'react';
import styles from './style.module.scss';
import { Canvas, useLoader, useFrame, extend, useThree } from '@react-three/fiber'
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BoxGeometry, Color, MathUtils, EdgesGeometry } from 'three';
import { Instances, Instance, Environment, ContactShadows, ScrollControls, useScroll, Scroll } from '@react-three/drei'
import { EffectComposer, SSAO } from '@react-three/postprocessing'
import { Leva, useControls } from 'leva'
import Screens from '../Screens'

import { TimelineLite, CSSPlugin, ScrollToPlugin, Draggable, Power0, Power1, Power2, Power3 } from "gsap/all"; 

import { softShadows } from "@react-three/drei"
import Grid from "./Grid"
// import { ThreeBSP } from 'three-js-csg-es6';

softShadows()


extend({ OrbitControls });

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

function Scene() {

  useEffect(() => {
  }, [])

  const {
    cameraControls,
    showMaterial,
    animateMaterial,
    frontLightShadows,
    movingLightShadows,
    // numberOfShapes,
    lightMode
  } = useControls({
    cameraControls: false,
    showMaterial: false,
    animateMaterial: false,
    frontLightShadows: false,
    movingLightShadows: false,
    // numberOfShapes: {
    //   value: 1,
    //   min: 1,
    //   max: 125,
    //   step: 1,
    // },
    lightMode: false
  })

  useEffect(() => {
    window.toggleLightMode()
  }, [lightMode])

  // const numberOfRows = Math.ceil(Math.pow(numberOfShapes, 1/3));

  

  // useFrame((state, delta) => {
  //   // This function runs 60 times/second inside the global render-loop
  //   console.log(delta)
  // })

  // useFrame((state) => (ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() / 2) * Math.PI))

  function Light() {
    const ref = useRef()
    // const positions = useMemo(() => [...new Array(number)].map(() => [3 - Math.random() * 6, Math.random() * 4, 3 - Math.random() * 6]), [])
    let radius = 2
    useFrame((state) => {
      ref.current.position.y = Math.sin(state.clock.getElapsedTime() / 2) * Math.PI * radius
      ref.current.position.x = Math.cos(state.clock.getElapsedTime() / 2) * Math.PI * radius
      ref.current.position.z = Math.sin(state.clock.getElapsedTime() / 2) * Math.PI * radius
    })
    return (
      <pointLight
        ref={ref}
        position={[0, 0, 0]}
        intensity={15}
        shadow-radius={10}
        castShadow={movingLightShadows}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        />
    )
  }

  function Fog() {
    if (lightMode) {
      return (<fog attach="fog" args={[new Color( 0xF43880 ), 15, 28]} />) // 0xED9FB2
    } else if (showMaterial || animateMaterial) {
      return (<fog attach="fog" args={[new Color( 0xF43880 ), 15, 28]} />) // 0xED9FB2
    } else {
      return (<fog attach="fog" args={[new Color( 0xcb3350 ), 15, 24]} />) // 0xED9FB2
    }
  }

  function Composition() {
    const scroll = useScroll()
    const { width, height } = useThree((state) => state.viewport)
    const [numberOfShapes, setNumberOfShapes] = useState(1)
    const [numberOfRows, setNumberOfRows] = useState(1)

    const properties = useRef()
    
    properties.current = {
      lookatX: -(width/6),
      positionZ: 20,
      rotation: 0.005
    }

    var lookatTL = new TimelineLite();
    lookatTL.to(properties.current, {lookatX: width/4, duration: 1, ease: Power1.easeInOut});
    lookatTL.to(properties.current, {lookatX: -width/4, duration: 1, ease: Power1.easeInOut});
    lookatTL.to(properties.current, {lookatX: width/4, duration: 1, ease: Power1.easeInOut});
    lookatTL.to(properties.current, {lookatX: width/4, duration: 1, ease: Power0.easeInOut});
    lookatTL.pause();

    var positionTL = new TimelineLite();
    positionTL.to(properties.current, {positionZ: 26, duration: 1.5, ease: Power1.easeInOut});
    positionTL.to(properties.current, {positionZ: 16, duration: 1.5, ease: Power1.easeInOut, delay: 1});
    positionTL.pause();

    var rotationTL = new TimelineLite();
    rotationTL.to(properties.current, {rotation: 0.00005, duration: 1, ease: Power1.easeInOut});
    rotationTL.pause();

    useFrame((state, delta) => {

      const positionRange = scroll.range(0 / 10, 10 / 10)
      lookatTL.seek(positionRange * lookatTL.duration())
      positionTL.seek(positionRange * positionTL.duration())
      
      state.camera.lookAt(properties.current.lookatX, 0, 0)
      state.camera.position.z = properties.current.positionZ
      
      const rotationRange = scroll.range(0 / 10, 10 / 10)
      rotationTL.seek(rotationRange)

      const blocksRange = scroll.range(7 / 10, 3 / 10)
      const _blocks = Math.floor(blocksRange * 8) + 1
      if (_blocks !== numberOfShapes) {
        setNumberOfShapes(_blocks)
        setNumberOfRows(Math.ceil(Math.pow(_blocks, 1/3)));
      }

    })

    return (
      <>
        { cameraControls && <CameraControls /> }
          
        <Fog />

        <ambientLight intensity={1} />
        <pointLight
          position={[0, 10, 20]}
          intensity={30}
          castShadow={frontLightShadows}
          shadow-radius={10} 
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
        />
        <Light />
        
        <Suspense fallback={null}>
          <Grid
            rows={numberOfRows}
            shapes={numberOfShapes}
            showMaterial={showMaterial}
            animateMaterial={animateMaterial}
            lightMode={lightMode}
            rotationSpeed={properties.current.rotation}
            />
        </Suspense>

        
        <EffectComposer multisampling={0}>
          <SSAO samples={50} radius={20} intensity={50} luminanceInfluence={0.2} />
        </EffectComposer>
      </>
    )
  }

  return (
    <div className={styles.scene}>
      <Leva collapsed={true} />
      <Canvas shadows dpr={[1, 2]} gl={{ alpha: true, antialias: false }} camera={{ fov: 50, position: [0, 0, 20], near: 1, far: 150 }}>
        <ScrollControls damping={10} pages={5}>
          <Composition />
          <Scroll html style={{ width: '100%' }}>
            <Screens />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

export default Scene;

