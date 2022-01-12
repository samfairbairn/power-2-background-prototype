/* eslint-disable no-unused-vars */

import React, { useRef, useMemo, useState } from 'react';
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader'
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { BoxGeometry, MathUtils, EdgesGeometry } from 'three';
import { useScroll } from '@react-three/drei'
import { TimelineLite, Power0, Power1 } from "gsap/all";
import Model from './Model';

function Rig({ children }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = MathUtils.lerp(ref.current.rotation.y, (state.mouse.x * Math.PI) / 2, 0.05)
    ref.current.rotation.x = MathUtils.lerp(ref.current.rotation.x, (state.mouse.y * Math.PI) / 2, 0.05)
  })
  return <group ref={ref}>{children}</group>
}

function Grid ({lightMode, rows, shapes, rotationSpeed, scale, scaleFactor}) {
  const scroll = useScroll()

  const object = useLoader(Rhino3dmLoader, '/assets/3d/CUBE-NEW.3dm', (loader) => {
    loader.setLibraryPath('/assets/rhino3dm/')
  })
  const geo = useRef(object.children[0].geometry);

  const ref = useRef()
  const { width, height } = useThree((state) => state.viewport)

  const properties = useRef()
    
  properties.current = {
    xRotation: 0
  }

  var rotationTL = new TimelineLite();
  rotationTL.to(properties.current, {xRotation: Math.PI * 0.5, duration: 1, ease: Power1.easeInOut});
  rotationTL.to(properties.current, {xRotation: -Math.PI * 0.2, duration: 1, ease: Power1.easeInOut});
  rotationTL.to(properties.current, {xRotation: Math.PI * 0.5, duration: 1, ease: Power1.easeInOut});
  rotationTL.to(properties.current, {xRotation: Math.PI * 0.7, duration: 1, ease: Power0.easeInOut});
  rotationTL.pause();

  const [rotation, updateRotation] = useState({x: 0, y: 0, z: 0})

  useFrame((state, delta) => {
  
    const r1 = scroll.range(0, 4.5 / scroll.pages)
    rotationTL.seek(r1 * rotationTL.duration())
    
    updateRotation({x: rotation.x + rotationSpeed, y: rotation.y + rotationSpeed, z: rotation.z + rotationSpeed})

    ref.current.rotation.x = rotation.x + properties.current.xRotation
    ref.current.rotation.y = rotation.y + (properties.current.xRotation / 2)
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
              rows={rows}
              geo={geo.current}
              key={`shape-${x}-${y}-${z}`}
              x={x}
              y={y}
              z={z}
              lightMode={lightMode}
            />
          )
            
        }
      }
    }
  }

  return (
    <Rig>
      <group ref={ref} scale={scale * scaleFactor}>
        {_shapes}
        <lineSegments geometry={outerEdges} renderOrder={100}>
          <lineBasicMaterial color={lightMode ? 'black' : 'white'} fog={false} transparent={true} opacity={lightMode ? 0.8 : 0.4} />
        </lineSegments>
      </group>
    </Rig>
  )
}

export default Grid