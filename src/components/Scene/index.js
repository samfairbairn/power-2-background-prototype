import React, { useEffect, useRef, Suspense, useMemo, useState } from 'react';
import styles from './style.module.scss';
import { Canvas, useLoader, useFrame, extend, useThree } from '@react-three/fiber'
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BoxGeometry, Color, MathUtils, EdgesGeometry } from 'three';
import { Instances, Instance, Environment, ContactShadows } from '@react-three/drei'
import { EffectComposer, SSAO } from '@react-three/postprocessing'
import { useControls } from 'leva'

import { softShadows } from "@react-three/drei"
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
    numberOfShapes,
    lightMode
  } = useControls({
    cameraControls: false,
    showMaterial: false,
    animateMaterial: false,
    frontLightShadows: true,
    movingLightShadows: true,
    numberOfShapes: {
      value: 8,
      min: 1,
      max: 125,
      step: 1,
    },
    lightMode: false
  })

  useEffect(() => {
    window.toggleLightMode()
  }, [lightMode])

  const numberOfRows = Math.ceil(Math.pow(numberOfShapes, 1/3));

  function RhinoModel({geo, x, y, z}) {

    const [showMat, setShowMat] = useState(false);
    const [lastChange, setLastChange] = useState(false);

    geo = geo.clone();
    geo.center();

    let padding = 0.5;
    let width = 5;
    let totalPadding = (padding * (numberOfRows - 1)) / numberOfRows;
    let shapeWidth = (width - totalPadding) / numberOfRows;
    let offset = width / 2 * (numberOfRows - 1);

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

  function ModelGrid () {

    const object = useLoader(Rhino3dmLoader, '/assets/3d/POWER2-1_cube_Mesh.3dm', (loader) => {
      // loader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/')
      loader.setLibraryPath('/assets/rhino3dm/')
    })
    const geo = object.children[16].geometry;

    const ref = useRef()

    useFrame((state, delta) => {
      const time = state.clock.getElapsedTime() * 0.15 + 15;
      const mouseTimeY = time + (state.mouse.x * 0.1);
      const mouseTimeX = time + (state.mouse.y * 0.1);

      ref.current.rotation.y = Math.sin(mouseTimeY) * Math.PI
      ref.current.rotation.x = Math.sin(mouseTimeX) * Math.PI
      ref.current.rotation.z = Math.sin(time) * Math.PI
    })

    const outerEdges = useMemo(() => {
      const width = 7.5;
      const boundingBox = new BoxGeometry( width, width, width );
      return new EdgesGeometry(boundingBox)
    }, [])

    const shapes = []

    for (let x = 0; x < numberOfRows; x++) {
      for (let y = 0; y < numberOfRows; y++) {
        for (let z = 0; z < numberOfRows; z++) {
          if (shapes.length < numberOfShapes) {
            shapes.push(<RhinoModel key={`shape-${x}-${y}-${z}`} geo={geo} x={x} y={y} z={z} />)
          }
        }
      }
    }

    return (
      <group ref={ref}>

        {shapes}
        
        {/* <mesh>
          <boxBufferGeometry attach="geometry" args={[7, 7, 7]} />
          <meshBasicMaterial attach="material" wireframe={true} />
        </mesh> */}
        {/* new Color( 0x15084d ) */}
        <lineSegments geometry={outerEdges} renderOrder={100}>
          {/* <lineBasicMaterial color={new Color( 0x333333 )} opacity={0.2} /> */}
          {/* <lineBasicMaterial color="white" opacity={0.2} /> */}
          <lineBasicMaterial color="grey" fog={false} opacity={0.1} />
        </lineSegments>
      </group>
    )
  }

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
      return (<fog attach="fog" args={[new Color( 0x15084d ), 5, 14]} />)
    } else if (showMaterial || animateMaterial) {
      return (<fog attach="fog" args={[new Color( 0xF9678D ), 15, 22]} />) // 0xED9FB2
    } else {
      // return (<fog attach="fog" args={[new Color( 0x15084d ), 15, 22]} />)
      return (<fog attach="fog" args={[new Color( 0xF9678D ), 15, 24]} />) // 0xED9FB2
    }
  }

  return (
    <div className={styles.scene}>
      <Canvas shadows dpr={[1, 2]} gl={{ alpha: true, antialias: false }} camera={{ fov: 50, position: [0, 0, 20], near: 1, far: 150 }}>
        { cameraControls && <CameraControls /> }
        {/* <fog attach="fog" args={[new Color( 0x15084d ), 5, 11]} /> */}
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
        {/* <pointLight position={[-100, -100, -100]} intensity={10} /> */}
        <Suspense fallback={null}>
          {/* <RhinoModel index={1} /> */}
          <ModelGrid />
        </Suspense>
        {/* <ContactShadows rotation={[Math.PI / 2, 0, 0]} position={[0, -30, 0]} opacity={0.6} width={130} height={130} blur={1} far={40} /> */}
        <EffectComposer multisampling={0}>
          <SSAO samples={50} radius={20} intensity={50} luminanceInfluence={0.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default Scene;

