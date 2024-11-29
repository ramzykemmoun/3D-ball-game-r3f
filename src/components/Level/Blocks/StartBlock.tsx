import { boxGeometry } from "@/libs/geometries.ts";
import { floor1Material } from "@/libs/materials.ts";
import { BlockProps } from "@/types/Block";
export default function StartBlock({ position }: BlockProps) {
  return (
    <group position={position}>
      <mesh
        receiveShadow
        scale={[4, 0.2, 4]}
        material={floor1Material}
        geometry={boxGeometry}
      ></mesh>
    </group>
  );
}
