import { boxGeometry } from "@/libs/geometries";
import { wallMaterial } from "@/libs/materials";
import { RigidBody } from "@react-three/rapier";

type Props = { length: number };
export default function Walls({ length }: Props) {
  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <mesh
          position={[2.15, 1.4, -(length * 2) + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[0.3, 3, 4 * length]}
        />

        <mesh
          position={[-2.15, 1.4, -(length * 2) + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[0.3, 3, 4 * length]}
        />
        <mesh
          position={[0, 1.4, -length * 4 + 2 - 0.15]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[4.6, 3, 0.3]}
        />

        <mesh
          position={[0, 0, -(length * 2) + 2]}
          geometry={boxGeometry}
          scale={[4, 0.2, 4 * length]}
        >
          <material transparent />
        </mesh>
      </RigidBody>
    </>
  );
}
