import { boxGeometry } from "@/libs/geometries";
import { floor2Material, obstacleMaterial } from "@/libs/materials";
import { BlockProps } from "@/types/Block";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";

export default function LimboBlock({ position }: BlockProps) {
  const obstacle = useRef<RapierRigidBody>(null);
  const [timeOffset] = useState(() => -Math.random() * Math.PI * 2);
  const [x, y, z] = position;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    obstacle.current?.setNextKinematicTranslation({
      x,
      y: y + Math.sin(time - timeOffset) * 0.5 + 1.2,
      z,
    });
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
        restitution={0.2}
        friction={0}
        colliders="hull"
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}
