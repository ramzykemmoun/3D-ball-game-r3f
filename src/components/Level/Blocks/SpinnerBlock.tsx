import { boxGeometry } from "@/libs/geometries";
import { floor2Material, obstacleMaterial } from "@/libs/materials";
import { BlockProps } from "@/types/Block";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function SpinnerBlock({ position }: BlockProps) {
  const obstacle = useRef<RapierRigidBody>(null);
  const rotation = new THREE.Quaternion();
  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  );
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacle.current?.setNextKinematicRotation(rotation);
  });
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        scale={[4, 0.2, 4]}
        receiveShadow
      />

      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
        colliders="hull"
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}
