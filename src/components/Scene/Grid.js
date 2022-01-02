/* eslint-disable no-unused-vars */

import React, { useEffect, useRef, Suspense, useMemo, useState } from 'react';
import styles from './style.module.scss';
import { Canvas, useLoader, useFrame, extend, useThree } from '@react-three/fiber'
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BoxGeometry, Color, MathUtils, EdgesGeometry } from 'three';
import { Instances, Instance, Environment, ContactShadows, ScrollControls, useScroll } from '@react-three/drei'
import { EffectComposer, SSAO } from '@react-three/postprocessing'
import { useControls } from 'leva'

import Model from './Model'

import { softShadows } from "@react-three/drei"
// import { ThreeBSP } from 'three-js-csg-es6';

function Grid ({showMaterial, animateMaterial, lightMode, rows, shapes}) {
  const scroll = useScroll()

  const object = useLoader(Rhino3dmLoader, '/assets/3d/POWER2-1_cube_Mesh.3dm', (loader) => {
    // loader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/')
    loader.setLibraryPath('/assets/rhino3dm/')
  })
  const geo = object.children[16].geometry;

  const ref = useRef()
  const { width, height } = useThree((state) => state.viewport)

  const [rotation, updateRotation] = useState({x: 0, y: 0, z: 0})

  useFrame((state, delta) => {
  
    const r1 = scroll.range(0 / 5, 1 / 5)

    let spin = ((1-r1) * 0.004) + 0.001;
    const time = (state.clock.getElapsedTime() * spin);
    
    const mouseTimeY = time + (state.mouse.x * 0.1);
    const mouseTimeX = time + (state.mouse.y * 0.1);

    // ref.current.rotation.y = Math.sin(mouseTimeY) * Math.PI
    // ref.current.rotation.x = Math.sin(mouseTimeX) * Math.PI
    // ref.current.rotation.z = Math.sin(time) * Math.PI

    updateRotation({x: rotation.x + spin, y: rotation.y + spin, z: rotation.z + spin})

    let xOffset = state.mouse.x * 0.5 + r1;
    let yOffset = state.mouse.y * 0.5 + r1;

    // let newPosX = ref.current.rotation.x - 0.005

    ref.current.rotation.y = rotation.y + xOffset
    ref.current.rotation.x = rotation.x + yOffset
    ref.current.rotation.z = rotation.z
  })

  const outerEdges = useMemo(() => {
    const width = 7.5;
    const boundingBox = new BoxGeometry( width, width, width );
    return new EdgesGeometry(boundingBox)
  }, [])

  const _shapes = []

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < rows; y++) {
      for (let z = 0; z < rows; z++) {
        if (_shapes.length < shapes) {
          _shapes.push(
            <Model
              shapes={shapes}
              rows={rows}
              key={`shape-${x}-${y}-${z}`}
              geo={geo}
              x={x}
              y={y}
              z={z} 
              showMaterial={showMaterial}
              animateMaterial={animateMaterial}
              lightMode={lightMode}
            />)
        }
      }
    }
  }

  return (
    <group ref={ref}>

      {_shapes}
      
      {/* <mesh>
        <boxBufferGeometry attach="geometry" args={[7, 7, 7]} />
        <meshBasicMaterial attach="material" wireframe={true} />
      </mesh> */}
      {/* new Color( 0x15084d ) */}
      <lineSegments geometry={outerEdges} renderOrder={100}>
        {/* <lineBasicMaterial color={new Color( 0x333333 )} opacity={0.2} /> */}
        {/* <lineBasicMaterial color="white" opacity={0.2} /> */}
        <lineBasicMaterial color="white" fog={false} transparent={true} opacity={0.1} />
      </lineSegments>
    </group>
  )
}

export default Grid