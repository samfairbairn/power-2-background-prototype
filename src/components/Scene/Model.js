import React, { useMemo, useState } from 'react';
// import styles from './style.module.scss';
import { useFrame } from '@react-three/fiber'
// import { Canvas, useLoader, useFrame, extend, useThree } from '@react-three/fiber'
// import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader'
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { BoxGeometry, Color, MathUtils, EdgesGeometry } from 'three';
import { EdgesGeometry } from 'three';
// import { Instances, Instance, Environment, ContactShadows, ScrollControls, useScroll } from '@react-three/drei'
// import { EffectComposer, SSAO } from '@react-three/postprocessing'
// import { useControls } from 'leva'

function Model({showMaterial, animateMaterial, lightMode, shapes, rows, geo, x, y, z}) {

  const [showMat, setShowMat] = useState(false);
  const [lastChange, setLastChange] = useState(false);

  geo = geo.clone();
  geo.center();

  let padding = 0.5;
  let width = 5;
  let totalPadding = (padding * (rows - 1)) / rows;
  let shapeWidth = (width - totalPadding) / rows;
  let offset = width / 2 * (rows - 1);

  geo.translate(x * (width + padding) - offset, y * (width + padding) - offset, z * (width + padding) - offset);
  geo.scale(shapeWidth/5, shapeWidth/5, shapeWidth/5);
  
  const edges = useMemo(() => new EdgesGeometry(geo), [geo]);

  useFrame((state, delta) => {
    let now = state.clock.getElapsedTime()
    if (now - lastChange > 4 && Math.random() > 0.98) {
      setLastChange(now)
      setShowMat(!showMat)
    }
  })

  const show = animateMaterial ? showMat : showMaterial
  let color = lightMode ? 'black' : 'white'

  if (show) {
    return (
      <mesh position={[0, 0, 0]} geometry={geo} castShadow receiveShadow>
        <meshStandardMaterial roughness={0.5} color='white' />
      </mesh>
    )
  } else {
    return (
      <lineSegments geometry={edges} renderOrder={100}>
        <lineBasicMaterial color={color} />
      </lineSegments>
    )
  }
}

export default Model