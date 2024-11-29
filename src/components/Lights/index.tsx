import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Lights() {
  const light = useRef<THREE.DirectionalLight>(null);
  useFrame((state) => {
    if (!light.current) return;
    light.current.position.z = state.camera.position.z + 1;
    light.current.target.position.z = state.camera.position.z;

    light.current.target.updateMatrixWorld();
  });
  return (
    <>
      <directionalLight
        ref={light}
        castShadow
        position={[4, 4, 0]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={1} />
    </>
  );
}
