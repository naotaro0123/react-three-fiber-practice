import './SubApp.css';
import { Canvas, GroupProps, PrimitiveProps, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Color, MathUtils, Mesh, Object3D } from 'three';
import niceColors from 'nice-color-palettes';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Model } from './components/Model';

// const Box = (props: MeshProps) => {
//   const mesh = useRef<Object3D>();
//   const [hovered, setHover] = useState(false);
//   const [active, setActive] = useState(false);

//   useFrame(() => {
//     if (mesh.current !== undefined) {
//       mesh.current.rotation.x += 0.01;
//       mesh.current.rotation.y += 0.01;
//     }
//   });
//   return (
//     <mesh
//       {...props}
//       ref={mesh}
//       scale={active ? 1.5 : 1}
//       onClick={() => setActive(!active)}
//       onPointerOver={() => setHover(true)}
//       onPointerOut={() => setHover(false)}
//     >
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
//     </mesh>
//   );
// }

// const Model = (props: PrimitiveProps) => {
//   return <primitive {...props} />
// }

// const Rotate = (props: GroupProps) => {
//   const ref = useRef<Object3D>();
//   useFrame(({ clock }) => {
//     if (ref.current !== undefined) {
//       ref.current.rotation.y = clock.elapsedTime;
//     }
//   })
//   return <group ref={ref} {...props} />
// }

const Rig = () => {
  return useFrame((state) => {
    state.camera.position.x = MathUtils.lerp(
      state.camera.position.x,
      1.5 + state.mouse.x / 4, 0.075,
    );
    state.camera.position.y = MathUtils.lerp(
      state.camera.position.y,
      1.5 + state.mouse.y / 4, 0.075,
    );
  })
}

export default function SubApp() {
  // const { scene } = useGLTF('./monkey.gltf');
  return (
    <div className="App">
      <Canvas>
        <color attach="background" args={['white']} />
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        {/* <Rotate position={[0.0, -0.5, 0.0]} scale={[2, 2, 2]}>
          <Suspense fallback={null}>
            <Model object={scene} />
          </Suspense>
        </Rotate> */}
        <group position={[0, -1, 0]}>
          <Suspense fallback={null}>
            <Model pose={0} position={[0, 0, 0]} />
          </Suspense>
        </group>
      </Canvas>
    </div>
  )
}