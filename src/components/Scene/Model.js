import React, { useMemo } from 'react';
import { EdgesGeometry } from 'three';

function Model({lightMode, rows, geo, x, y, z}) {

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

  if (lightMode) {
    return (
      <mesh position={[0, 0, 0]} geometry={geo} castShadow receiveShadow>
        <meshStandardMaterial roughness={0.5} color='#bdbbbb' />
      </mesh>
    )
  } else {
    return (
      <lineSegments geometry={edges} renderOrder={100}>
        <lineBasicMaterial color={'white'} />
      </lineSegments>
    )
  }
}

export default Model